<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { BulkCreateMaterialPossessionFormData } from '@/@types/interfaces/BulkCreateMaterialPossessionFormData';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import { useBranchStore } from '@/stores/branch';
import { usePlaceStore } from '@/stores/place';
import { useSessionStore } from '@/stores/session';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import FileInputGroup from '@/components/inputs/FileInputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const step = ref(1);
const branch = ref(0);
const place = ref(0);
const images = ref<Array<File | string>>([]);
const router = useRouter();
const { t } = useI18n();
const { handleSubmit, validate } =
  useForm<BulkCreateMaterialPossessionFormData>();
const materialPossessionStore = useMaterialPossessionStore();

const branchStore = useBranchStore();
const { branchesOptions } = storeToRefs(branchStore);

const placeStore = usePlaceStore();
const { placesOptions } = storeToRefs(placeStore);

const sessionStore = useSessionStore();
const { hasApplicationConfigurations, currentPlace } =
  storeToRefs(sessionStore);

const nextStep = async () => {
  const result = await validate();

  if (result.valid) step.value++;
};

const onSubmit = handleSubmit((values) => {
  materialPossessionStore
    .bulkCreateMaterialPossession(
      values.description,
      values.number_prefix,
      values.to,
      values.from,
      getPlaceId(),
      images.value
    )
    .then(() => {
      router.push({ name: 'materialPossessions' });
    });
});

const handleImageSelected = (
  fileList: FileList | string | null | undefined
) => {
  if (fileList && typeof fileList != 'string') {
    for (const file of fileList) {
      images.value.push(file);
    }
  }

  if (typeof fileList == 'string') images.value.push(fileList);
};

const getImageSrc = (file: File | string) => {
  if (typeof file == 'string') return file;

  return URL.createObjectURL(file);
};

const hasNoBranchSelected = computed(() => branch.value == 0);

const getPlaceId = (): number => {
  return hasApplicationConfigurations.value
    ? Number(currentPlace.value?.id)
    : place.value;
};

onMounted(() => {
  if (!hasApplicationConfigurations.value) return branchStore.fetchBranches();

  step.value++;
});

watch(branch, (branch_id) => {
  placeStore.fetchPlaces({ branch_id });
});
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.bulkCreateMaterialPossessionsView.form.title')"
      @submit="onSubmit"
    >
      <div v-show="step == 1">
        <div class="flex flex-col" v-if="hasNoBranchSelected">
          <label class="font-baloo2-bold text-dark mb-6">
            {{
              t('views.bulkCreateMaterialPossessionsView.form.labels.branch')
            }}
          </label>
          <SelectableList :options="branchesOptions" v-model="branch" />
        </div>

        <div class="flex flex-col">
          <label class="font-baloo2-bold text-dark mb-6">
            {{ t('views.bulkCreateMaterialPossessionsView.form.labels.place') }}
          </label>
          <SelectableList :options="placesOptions" v-model="place" />
        </div>
      </div>

      <div v-show="step == 2">
        <div class="flex justify-between flex-wrap gap-6">
          <InputGroup
            type="number"
            :label="
              t('views.bulkCreateMaterialPossessionsView.form.labels.from')
            "
            name="from"
            rules="required"
            class="w-full xl:w-fit"
          />
          <InputGroup
            type="number"
            :label="t('views.bulkCreateMaterialPossessionsView.form.labels.to')"
            name="to"
            rules="required"
            class="w-full xl:w-fit"
          />
          <InputGroup
            class="grow"
            type="text"
            :label="
              t(
                'views.bulkCreateMaterialPossessionsView.form.labels.numberPrefix'
              )
            "
            name="number_prefix"
            rules="required"
          />
        </div>
        <InputGroup
          type="text"
          :label="
            t('views.bulkCreateMaterialPossessionsView.form.labels.description')
          "
          name="description"
          rules="required"
        />
      </div>

      <div v-show="step == 3">
        <FileInputGroup
          @selected-filed="handleImageSelected"
          :multiple="true"
          :label="
            t('views.bulkCreateMaterialPossessionsView.form.labels.images')
          "
          accept="image/*"
          capture="user"
          name="images"
          rules="required"
          class="mb-6"
          size="large"
        />
        <div>
          <h1 class="font-baloo2-bold text-dark">
            {{
              t(
                'views.bulkCreateMaterialPossessionsView.form.stepTwo.labelImages'
              )
            }}
          </h1>
          <p class="text-gray-darken">
            {{
              t(
                'views.bulkCreateMaterialPossessionsView.form.stepTwo.countImages',
                {
                  count: images.length,
                }
              )
            }}
          </p>
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="getImageSrc(image)"
            alt=""
          />
        </div>
      </div>

      <BaseButton
        v-if="step != 3"
        type="button"
        class="md:w-56 md:self-end"
        @click="nextStep"
      >
        {{ t('views.bulkCreateMaterialPossessionsView.form.nextStep') }}
      </BaseButton>

      <BaseButton v-else type="submit" class="md:w-56 md:self-end">
        {{ t('views.bulkCreateMaterialPossessionsView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

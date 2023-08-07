<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useBranchStore } from '@/stores/branch';
import { usePlaceStore } from '@/stores/place';
import { useSessionStore } from '@/stores/session';
import type { CreateMaterialPossessionFormData } from '@/@types/interfaces/CreateMaterialPossessionFormData';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import FileInputGroup from '@/components/inputs/FileInputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import SelectableList from '@/components/inputs/SelectableList.vue';

const step = ref(1);
const branch = ref(0);
const place = ref(0);
const images = ref<Array<File>>([]);
const router = useRouter();
const { t } = useI18n();
const { handleSubmit, validate } = useForm<CreateMaterialPossessionFormData>();
const materialPossessionStore = useMaterialPossessionStore();

const branchStore = useBranchStore();
const { branchesOptions } = storeToRefs(branchStore);

const placeStore = usePlaceStore();
const { placesOptions } = storeToRefs(placeStore);

const sessionStore = useSessionStore();
const { hasApplicationConfigurations, currentPlace } = storeToRefs(sessionStore);

const nextStep = async () => {
  const result = await validate();

  if (result.valid) step.value++;
};

const onSubmit = handleSubmit((values) => {
  materialPossessionStore
    .createMaterialPossession(values.number, values.description, getPlaceId(), images.value)
    .then(() => {
      router.push({ name: 'materialPossessions' });
    });
});

const handleImageSelected = (fileList: FileList | null | undefined) => {
  if (fileList) {
    for (const file of fileList) {
      images.value.push(file);
    }
  }
};

const getImageSrc = (file: File) => {
  return URL.createObjectURL(file);
};

const hasNoBranchSelected = computed(() => branch.value == 0);

const getPlaceId = (): number =>
  hasApplicationConfigurations.value ? Number(currentPlace.value?.id) : place.value;

onMounted(() => {
  if (!hasApplicationConfigurations.value) return branchStore.fetchBranches();

  step.value++;
});

watch(branch, (branch_id) => {
  placeStore.fetchPlaces({ branch_id });
});

watch(place, () => step.value++);
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.createMaterialPossessionsView.form.title')"
      @submit="onSubmit"
    >
      <div v-show="step == 1">
        <div class="flex flex-col" v-if="hasNoBranchSelected">
          <label class="font-baloo2-bold text-dark mb-6">
            Escolha uma filial
          </label>
          <SelectableList :options="branchesOptions" v-model="branch" />
        </div>

        <div class="flex flex-col">
          <label class="font-baloo2-bold text-dark mb-6">
            Escolha um local
          </label>
          <SelectableList :options="placesOptions" v-model="place" />
        </div>
      </div>

      <div v-show="step == 2">
        <InputGroup
          type="text"
          :label="t('views.createMaterialPossessionsView.form.labels.number')"
          name="number"
          rules="required"
        />
        <InputGroup
          type="text"
          :label="
            t('views.createMaterialPossessionsView.form.labels.description')
          "
          name="description"
          rules="required"
        />
      </div>

      <div v-show="step == 3">
        <FileInputGroup
          @selected-filed="handleImageSelected"
          :multiple="true"
          accept="image/*"
          capture="user"
          :label="t('views.createMaterialPossessionsView.form.labels.images')"
          name="images"
          rules="required"
          class="mb-6"
        />
        <div>
          <h1 class="font-baloo2-bold text-dark">
            {{
              t('views.createMaterialPossessionsView.form.stepTwo.labelImages')
            }}
          </h1>
          <p class="text-gray-darken">
            {{
              t(
                'views.createMaterialPossessionsView.form.stepTwo.countImages',
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
        {{ t('views.createMaterialPossessionsView.form.nextStep') }}
      </BaseButton>

      <BaseButton v-else type="submit" class="md:w-56 md:self-end">
        {{ t('views.createMaterialPossessionsView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

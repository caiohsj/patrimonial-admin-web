<script lang="ts" setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { BulkCreateMaterialPossessionFormData } from '@/@types/interfaces/BulkCreateMaterialPossessionFormData';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import FileInputGroup from '@/components/inputs/FileInputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const step = ref(1);
const images = ref<Array<File>>([]);
const router = useRouter();
const { t } = useI18n();
const { handleSubmit, validate } = useForm<BulkCreateMaterialPossessionFormData>();
const materialPossessionStore = useMaterialPossessionStore();

const nextStep = async () => {
  const result = await validate();

  if (result.valid) step.value++;
};

const onSubmit = handleSubmit((values) => {
  materialPossessionStore
    .bulkCreateMaterialPossession(values, images.value)
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
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.bulkCreateMaterialPossessionsView.form.title')"
      @submit="onSubmit"
    >
      <div v-show="step == 1">
        <div class="flex justify-between gap-6">
          <InputGroup
            type="number"
            :label="t('views.bulkCreateMaterialPossessionsView.form.labels.from')"
            name="from"
            rules="required"
          />
          <InputGroup
            type="number"
            :label="t('views.bulkCreateMaterialPossessionsView.form.labels.to')"
            name="to"
            rules="required"
          />
          <InputGroup
            class="grow"
            type="text"
            :label="t('views.bulkCreateMaterialPossessionsView.form.labels.numberPrefix')"
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

      <div v-show="step == 2">
        <FileInputGroup
          @selected-filed="handleImageSelected"
          :multiple="true"
          accept="image/*"
          capture="user"
          :label="t('views.bulkCreateMaterialPossessionsView.form.labels.images')"
          name="images"
          rules="required"
          class="mb-6"
        />
        <div>
          <h1 class="font-baloo2-bold text-dark">
            {{
              t('views.bulkCreateMaterialPossessionsView.form.stepTwo.labelImages')
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
        v-if="step != 2"
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

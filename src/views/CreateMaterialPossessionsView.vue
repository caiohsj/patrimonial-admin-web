<script lang="ts" setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
// import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { CreateMaterialPossessionFormData } from '@/@types/interfaces/CreateMaterialPossessionFormData';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import FileInputGroup from '@/components/inputs/FileInputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const step = ref(1);
const images = ref<Array<File>>([]);
// const router = useRouter();
const { t } = useI18n();
const { handleSubmit, validate } = useForm<CreateMaterialPossessionFormData>();
const materialPossessionStore = useMaterialPossessionStore();

const nextStep = async () => {
  const result = await validate();

  if (result.valid) step.value++;
};

const onSubmit = handleSubmit((values) => {
  materialPossessionStore.createMaterialPossession(values, images.value);
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
      :title="t('views.createMaterialPossessionsView.form.title')"
      @submit="onSubmit"
    >
      <div v-show="step == 1">
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

      <div v-show="step == 2">
        <FileInputGroup
          @selected-filed="handleImageSelected"
          :multiple="true"
          accept="image/*"
          capture="user"
          label="Adicionar imagem"
          name="images"
          rules="required"
          class="mb-6"
        />
        <div>
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
        {{ t('views.createMaterialPossessionsView.form.nextStep') }}
      </BaseButton>

      <BaseButton v-else type="submit" class="md:w-56 md:self-end">
        {{ t('views.createMaterialPossessionsView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { CreatePlaceFormData } from '@/@types/interfaces/CreatePlaceFormData';
import { usePlaceStore } from '@/stores/place';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const router = useRouter();
const { t } = useI18n();
const { handleSubmit } = useForm<CreatePlaceFormData>();
const placeStore = usePlaceStore();

const onSubmit = handleSubmit((values) => {
  placeStore.createPlace(values).then(() => {
    router.push({ name: 'places' });
  });
});
</script>

<template>
  <div class="w-full">
    <FormCard :title="t('views.createPlacesView.form.title')">
      <form class="flex flex-col gap-6" @submit="onSubmit">
        <InputGroup
          type="text"
          :label="t('views.createPlacesView.form.labels.description')"
          name="description"
          rules="required"
        />
        <BaseButton type="submit" class="md:w-56 md:self-end">
          {{ t('views.createPlacesView.form.submit') }}
        </BaseButton>
      </form>
    </FormCard>
  </div>
</template>

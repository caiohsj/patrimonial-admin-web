<script lang="ts" setup>
import { computed, onBeforeMount, watch } from 'vue';
import { useForm } from 'vee-validate';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import type { CreatePlaceFormData } from '@/@types/interfaces/CreatePlaceFormData';
import { usePlaceStore } from '@/stores/place';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const placeStore = usePlaceStore();
const { place } = storeToRefs(placeStore);

const placeId = computed(() => Number(route.params.id));

onBeforeMount(() => placeStore.fetchPlace(placeId.value));

const { handleSubmit, setValues } = useForm<CreatePlaceFormData>();

const onSubmit = handleSubmit((values) => {
  placeStore.updatePlace(values, placeId.value).then(() => {
    router.push({ name: 'places' });
  });
});

watch(place, (place) => {
  setValues({ description: place?.description });
});
</script>

<template>
  <div class="w-full">
    <FormCard :title="t('views.editPlacesView.form.title', { id: placeId })">
      <form class="flex flex-col gap-6" @submit="onSubmit">
        <InputGroup
          :label="t('views.editPlacesView.form.labels.description')"
          type="text"
          name="description"
          rules="required"
        />
        <BaseButton type="submit" class="md:w-56 md:self-end">
          {{ t('views.editPlacesView.form.submit') }}
        </BaseButton>
      </form>
    </FormCard>
  </div>
</template>

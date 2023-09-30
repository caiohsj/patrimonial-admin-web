<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import type { CreatePlaceFormData } from '@/@types/interfaces/CreatePlaceFormData';
import { usePlaceStore } from '@/stores/place';
import { useBranchStore } from '@/stores/branch';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import SelectGroup from '@/components/inputs/SelectGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import { onMounted } from 'vue';

const router = useRouter();
const { t } = useI18n();
const { handleSubmit } = useForm<CreatePlaceFormData>();
const placeStore = usePlaceStore();

const branchStore = useBranchStore();
const { branchesOptions } = storeToRefs(branchStore);

onMounted(() => branchStore.fetchBranches());

const onSubmit = handleSubmit((values) => {
  placeStore.createPlace(values).then(() => {
    router.push({ name: 'places' });
  });
});
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.createPlacesView.form.title')"
      @submit="onSubmit"
    >
      <InputGroup
        type="text"
        :label="t('views.createPlacesView.form.labels.description')"
        name="description"
        rules="required"
      />
      <SelectGroup
        :label="t('views.createPlacesView.form.labels.branch')"
        name="branch_id"
        rules="required"
        :options="branchesOptions"
      />
      <BaseButton type="submit" class="md:w-56 md:self-end">
        {{ t('views.createPlacesView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

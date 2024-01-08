<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/i18n';
import type { CreateCostCenterFormData } from '@/@types/interfaces/CreateCostCenterFormData';
import { useCostCenterStore } from '@/stores/CostCenter';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const router = useRouter();
const { t } = useI18n();
const { handleSubmit } = useForm<CreateCostCenterFormData>();
const costCenterStore = useCostCenterStore();

const onSubmit = handleSubmit((values) => {
  costCenterStore.createCostCenter(values).then(() => {
    router.push({ name: 'costCenters' });
  });
});
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.createCostCentersView.form.title')"
      @submit="onSubmit"
    >
      <InputGroup
        type="text"
        :label="t('views.createCostCentersView.form.labels.description')"
        name="description"
        rules="required"
      />
      <BaseButton type="submit" class="md:w-56 md:self-end">
        {{ t('views.createCostCentersView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

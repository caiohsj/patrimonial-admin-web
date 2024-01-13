<script lang="ts" setup>
import { computed, onBeforeMount, watch } from 'vue';
import { useForm } from 'vee-validate';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from '@/composables/i18n';
import { storeToRefs } from 'pinia';
import type { CreateCostCenterFormData } from '@/@types/interfaces/CreateCostCenterFormData';
import { useCostCenterStore } from '@/stores/CostCenter';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const costCenterStore = useCostCenterStore();
const { costCenter } = storeToRefs(costCenterStore);

const costCenterId = computed(() => Number(route.params.id));

onBeforeMount(() => costCenterStore.fetchCostCenter(costCenterId.value));

const { handleSubmit, setValues } = useForm<CreateCostCenterFormData>();

const onSubmit = handleSubmit((values) => {
  costCenterStore.updateCostCenter(values, costCenterId.value).then(() => {
    router.push({ name: 'costCenters' });
  });
});

watch(costCenter, (costCenter) => {
  setValues({ description: costCenter?.description });
});
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.editCostCentersView.form.title', { id: costCenterId })"
      @submit="onSubmit"
    >
      <InputGroup
        :label="t('views.editCostCentersView.form.labels.description')"
        type="text"
        name="description"
        rules="required"
      />
      <BaseButton type="submit" class="md:w-56 md:self-end">
        {{ t('views.editCostCentersView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from '@/composables/i18n';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useCostCenterStore } from '@/stores/CostCenter';
import { usePermissions } from '@/composables/permissions';
import BaseTable from '@/components/tables/BaseTable.vue';
import type { CostCenter } from '@/@types/interfaces/models/CostCenter';

const { t } = useI18n();
const { userHasPermission } = usePermissions();
const router = useRouter();

const costCenterStore = useCostCenterStore();
const { costCenters } = storeToRefs(costCenterStore);

const headers = computed(() => [
  t('views.costCentersView.table.headers.id'),
  t('views.costCentersView.table.headers.description'),
]);

onMounted(() => costCenterStore.fetchCostCenters());

const deleteCostCenter = (item: CostCenter) => {
  costCenterStore.deleteCostCenter(item);
};

const navigateToEditCostCenter = (costCenter: CostCenter) => {
  router.push({ name: 'editCostCenters', params: { id: costCenter.id } });
};
</script>

<template>
  <BaseTable
    :title="t('views.costCentersView.table.title')"
    :can-create="userHasPermission('create-cost-centers')"
    :can-edit="userHasPermission('update-cost-centers')"
    :can-delete="userHasPermission('delete-cost-centers')"
    :headers="headers"
    :items="costCenters"
    :total="costCenters.length"
    @create="router.push({ name: 'createCostCenters' })"
    @edit="navigateToEditCostCenter"
    @delete="deleteCostCenter"
  />
</template>

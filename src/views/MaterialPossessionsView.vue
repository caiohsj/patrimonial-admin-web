<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import { usePermissions } from '@/composables/permissions';
import type { MaterialPossession } from '@/@types/interfaces/models/MaterialPossession';
import BaseTable from '@/components/tables/BaseTable.vue';
import TabsNav from '@/components/navs/TabsNav.vue';

const { t } = useI18n();
const { userHasPermission } = usePermissions();
const router = useRouter();

const materialPossessionStore = useMaterialPossessionStore();
const { materialPossessions, filters } = storeToRefs(materialPossessionStore);

const headers = computed(() => [
  t('views.materialPossessionsView.table.headers.id'),
  t('views.materialPossessionsView.table.headers.number'),
  t('views.materialPossessionsView.table.headers.description'),
]);

onMounted(() => materialPossessionStore.fetchMaterialPossessions());

const deleteMaterialPossession = (item: MaterialPossession) => {
  materialPossessionStore.deleteMaterialPossession(item);
};
</script>

<template>
  <div class="material-possessions-view">
    <TabsNav
      :items="[
        {
          text: t('views.materialPossessionsView.tabs.approveds'),
          click: () =>
            materialPossessionStore.fetchDisapprovedMaterialPossessions(),
          active: filters.approved === 0,
        },
        {
          text: t('views.materialPossessionsView.tabs.disapproveds'),
          click: () =>
            materialPossessionStore.fetchApprovedMaterialPossessions(),
          active: filters.approved === 1,
        },
      ]"
      :show="true"
    />

    <BaseTable
      :title="t('views.materialPossessionsView.table.title')"
      :can-create="userHasPermission('create-material-possessions')"
      :can-bulk-create="userHasPermission('bulk-create-material-possessions')"
      :can-edit="false"
      :can-delete="userHasPermission('delete-material-possessions')"
      :headers="headers"
      :items="materialPossessions"
      :total="materialPossessions.length"
      @create="router.push({ name: 'createMaterialPossessions' })"
      @bulk-create="router.push({ name: 'bulkCreateMaterialPossessions' })"
      @delete="deleteMaterialPossession"
    />
  </div>
</template>

<style lang="scss">
.material-possessions-view {
  .base-table {
    .header {
      border-top-left-radius: 0;
    }
  }
}
</style>

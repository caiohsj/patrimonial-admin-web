<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import { usePermissions } from '@/composables/permissions';
import type { MaterialPossession } from '@/@types/interfaces/models/MaterialPossession';
import BaseTable from '@/components/tables/BaseTable.vue';

const { t } = useI18n();
const { userHasPermission } = usePermissions();
const router = useRouter();

const materialPossessionStore = useMaterialPossessionStore();
const { materialPossessions } = storeToRefs(materialPossessionStore);

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
  <BaseTable
    :title="t('views.materialPossessionsView.table.title')"
    :can-create="userHasPermission('create-material-possessions')"
    :can-edit="false"
    :can-delete="userHasPermission('delete-material-possessions')"
    :headers="headers"
    :items="materialPossessions"
    :total="materialPossessions.length"
    @create="router.push({ name: 'createMaterialPossessions' })"
    @delete="deleteMaterialPossession"
  />
</template>

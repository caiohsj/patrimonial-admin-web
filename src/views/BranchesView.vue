<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from '@/composables/i18n';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useBranchStore } from '@/stores/branch';
import { usePermissions } from '@/composables/permissions';
import BaseTable from '@/components/tables/BaseTable.vue';
import type { Branch } from '@/@types/interfaces/models/branch';

const { t } = useI18n();
const { userHasPermission } = usePermissions();
const router = useRouter();

const branchStore = useBranchStore();
const { branches } = storeToRefs(branchStore);

const headers = computed(() => [
  t('views.branchesView.table.headers.id'),
  t('views.branchesView.table.headers.description'),
]);

onMounted(() => branchStore.fetchBranches());

const deleteBranch = (item: Branch) => {
  branchStore.deleteBranch(item);
};

const navigateToEditBranch = (branch: Branch) => {
  router.push({ name: 'editBranches', params: { id: branch.id } });
};
</script>

<template>
  <BaseTable
    :title="t('views.branchesView.table.title')"
    :can-create="userHasPermission('create-branches')"
    :can-edit="userHasPermission('update-branches')"
    :can-delete="userHasPermission('delete-branches')"
    :headers="headers"
    :items="branches"
    :total="branches.length"
    @create="router.push({ name: 'createBranches' })"
    @edit="navigateToEditBranch"
    @delete="deleteBranch"
  />
</template>

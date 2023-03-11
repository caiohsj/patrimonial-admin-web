<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useBranchStore } from '@/stores/branch';
import BaseTable from '@/components/tables/BaseTable.vue';

const { t } = useI18n();

const branchStore = useBranchStore();
const { branches } = storeToRefs(branchStore);

const headers = computed(() => [
  t('views.branchesView.table.headers.id'),
  t('views.branchesView.table.headers.description'),
]);

onMounted(() => branchStore.fetchBranches());
</script>

<template>
  <BaseTable
    :title="t('views.branchesView.table.title')"
    :can-edit="true"
    :can-delete="true"
    :headers="headers"
    :items="branches"
    :total="branches.length"
  />
</template>

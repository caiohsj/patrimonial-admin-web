<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useRoleStore } from '@/stores/role';
import BaseTable from '@/components/tables/BaseTable.vue';

const { t } = useI18n();

const roleStore = useRoleStore();
const { roles } = storeToRefs(roleStore);

const headers = computed(() => [
  t('views.rolesView.table.headers.id'),
  t('views.rolesView.table.headers.name'),
]);

onMounted(() => roleStore.fetchRoles());
</script>

<template>
  <BaseTable
    :title="t('views.rolesView.table.title')"
    :can-create="false"
    :can-edit="false"
    :can-delete="false"
    :headers="headers"
    :items="roles"
    :total="roles.length"
  />
</template>

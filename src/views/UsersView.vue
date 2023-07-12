<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import BaseTable from '@/components/tables/BaseTable.vue';

const { t } = useI18n();

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

const headers = computed(() => [
  t('views.usersView.table.headers.id'),
  t('views.usersView.table.headers.name'),
  t('views.usersView.table.headers.email'),
  t('views.usersView.table.headers.role_name'),
]);

onMounted(() => userStore.fetchUsers());
</script>

<template>
  <BaseTable
    :title="t('views.usersView.table.title')"
    :can-create="false"
    :can-edit="false"
    :can-delete="false"
    :headers="headers"
    :items="users"
    :total="users.length"
  />
</template>

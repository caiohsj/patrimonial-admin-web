<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/stores/account';
import { usePermissions } from '@/composables/permissions';
import BaseTable from '@/components/tables/BaseTable.vue';
import type { Account } from '@/@types/interfaces/models/account';

const { t } = useI18n();
const { userHasPermission } = usePermissions();
const router = useRouter();

const accountStore = useAccountStore();
const { accounts } = storeToRefs(accountStore);

const headers = computed(() => [
  t('views.accountsView.table.headers.id'),
  t('views.accountsView.table.headers.description'),
  t('views.accountsView.table.headers.tax_rate'),
]);

onMounted(() => accountStore.fetchAccounts());

const deleteAccount = (item: Account) => {
  accountStore.deleteAccount(item);
};

const navigateToEditAccount = (account: Account) => {
  router.push({ name: 'editAccount', params: { id: account.id } });
};
</script>

<template>
  <BaseTable
    :title="t('views.accountsView.table.title')"
    :can-create="userHasPermission('create-accounts')"
    :can-edit="userHasPermission('update-accounts')"
    :can-delete="userHasPermission('delete-accounts')"
    :headers="headers"
    :items="accounts"
    :total="accounts.length"
    @create="router.push({ name: 'createAccount' })"
    @edit="navigateToEditAccount"
    @delete="deleteAccount"
  />
</template>

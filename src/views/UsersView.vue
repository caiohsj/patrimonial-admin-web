<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { usePermissions } from '@/composables/permissions';
import BaseTable from '@/components/tables/BaseTable.vue';
import TabsNav from '@/components/navs/TabsNav.vue';
import ConfirmationScreen from '@/components/feedbacks/ConfirmationScreen.vue';

const { t } = useI18n();

const userStore = useUserStore();
const { users, filters } = storeToRefs(userStore);
const { userHasPermission } = usePermissions();
const openConfirmationApproveScreen = ref<boolean>(false);
const userToApprove = ref(0);

const headers = computed(() => [
  t('views.usersView.table.headers.id'),
  t('views.usersView.table.headers.name'),
  t('views.usersView.table.headers.email'),
  t('views.usersView.table.headers.role_name'),
  t('views.usersView.table.headers.branch_name'),
]);

const handleApprove = (id: number) => {
  openConfirmationApproveScreen.value = true;
  userToApprove.value = id;
};

const approveUser = async () => {
  await userStore.approveUser(userToApprove.value);
  openConfirmationApproveScreen.value = false;
  userToApprove.value = 0;
};

onMounted(() => userStore.fetchUsers());
</script>

<template>
  <div class="users-view">
    <TabsNav
      :items="[
        {
          text: t('views.usersView.tabs.approveds'),
          click: () => userStore.fetchApprovedUsers(),
          active: filters.approved === 1,
          show: true,
        },
        {
          text: t('views.usersView.tabs.disapproveds'),
          click: () => userStore.fetchDisapprovedUsers(),
          active: filters.approved === 0,
          show: userHasPermission('approve-users'),
        },
      ]"
      :show="true"
    />
    <BaseTable
      :title="t('views.usersView.table.title')"
      :can-create="userHasPermission('create-users')"
      :can-edit="false"
      :can-delete="false"
      :has-custom-actions="filters.approved === 0"
      :headers="headers"
      :items="users"
      :except-items-keys="['approved']"
      :total="users.length"
      @create="$router.push({ name: 'createUsers' })"
    >
      <template #customActions="customActionProps">
        <button
          class="bg-primary text-light px-2 rounded-md"
          @click="handleApprove(customActionProps.item.id)"
          v-if="
            userHasPermission('approve-users') &&
            customActionProps.item.approved === 0
          "
        >
          {{ t('views.materialPossessionsView.table.approve') }}
        </button>
        <ConfirmationScreen
          :title="t('components.tables.tableRow.confirmationTitle')"
          @confirm="approveUser"
          v-model="openConfirmationApproveScreen"
        />
      </template>
    </BaseTable>
  </div>
</template>

<style lang="scss">
.users-view {
  .base-table {
    .header {
      border-top-left-radius: 0;
    }
  }
}
</style>

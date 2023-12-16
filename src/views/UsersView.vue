<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { usePermissions } from '@/composables/permissions';
import BaseTable from '@/components/tables/BaseTable.vue';
import TabsNav from '@/components/navs/TabsNav.vue';
import ConfirmationScreen from '@/components/feedbacks/ConfirmationScreen.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import BlockIcon from '@/components/icons/BlockIcon.vue';

const { t } = useI18n();

const userStore = useUserStore();
const { users, filters } = storeToRefs(userStore);
const { userHasPermission } = usePermissions();
const openConfirmationApproveScreen = ref<boolean>(false);
const openConfirmationDisapproveScreen = ref<boolean>(false);
const userToApprove = ref(0);
const userToDisapprove = ref(0);

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

const handleDisapprove = (id: number) => {
  openConfirmationDisapproveScreen.value = true;
  userToDisapprove.value = id;
};

const approveUser = () => {
  userStore.approveUser(userToApprove.value);
  openConfirmationApproveScreen.value = false;
  userToApprove.value = 0;
};

const disapproveUser = () => {
  userStore.disapproveUser(userToDisapprove.value);
  openConfirmationDisapproveScreen.value = false;
  userToDisapprove.value = 0;
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
      :has-custom-actions="true"
      :headers="headers"
      :items="users"
      :except-items-keys="['approved']"
      :total="users.length"
      @create="$router.push({ name: 'createUsers' })"
    >
      <template #customActions="customActionProps">
        <button
          class="bg-sky-500 text-light p-1 rounded-md"
          @click="handleApprove(customActionProps.item.id)"
          v-if="
            userHasPermission('approve-users') &&
            customActionProps.item.approved === false
          "
        >
          <CheckIcon class="h-5 w-5" />
        </button>
        <button
          class="bg-gray-darken text-light p-1 rounded-md"
          @click="handleDisapprove(customActionProps.item.id)"
          v-if="
            userHasPermission('disapprove-users') &&
            customActionProps.item.approved === true
          "
        >
          <BlockIcon class="h-5 w-5" />
        </button>
        <ConfirmationScreen
          :title="t('views.usersView.confirmationTitleApproveUser')"
          @confirm="approveUser"
          v-model="openConfirmationApproveScreen"
        />
        <ConfirmationScreen
          :title="t('views.usersView.confirmationTitleDisapproveUser')"
          @confirm="disapproveUser"
          v-model="openConfirmationDisapproveScreen"
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

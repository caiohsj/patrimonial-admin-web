<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from '@/composables/i18n';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useRoleStore } from '@/stores/role';
import { usePermissions } from '@/composables/permissions';
import BaseTable from '@/components/tables/BaseTable.vue';

const { t } = useI18n();
const { userHasPermission } = usePermissions();
const router = useRouter();

const roleStore = useRoleStore();
const { roles } = storeToRefs(roleStore);

const headers = computed(() => [
  t('views.rolesView.table.headers.id'),
  t('views.rolesView.table.headers.name'),
  t('views.rolesView.table.headers.admin'),
]);

onMounted(() => roleStore.fetchRoles());
</script>

<template>
  <BaseTable
    class="list-roles"
    :title="t('views.rolesView.table.title')"
    :can-create="userHasPermission('create-roles')"
    :headers="headers"
    :items="roles"
    :total="roles.length"
    :has-custom-content="true"
    @create="router.push({ name: 'createRoles' })"
  >
    <tr v-for="role in roles" :key="role.id">
      <td class="px-4 whitespace-nowrap">
        {{ role.id }}
      </td>
      <td class="px-4 whitespace-nowrap">
        {{ role.name }}
      </td>
      <td class="px-4 whitespace-nowrap">
        {{ t(`${role.admin}`) }}
      </td>
    </tr>
  </BaseTable>
</template>

<style lang="scss">
.base-table {
  &.list-roles {
    .table {
      tbody {
        .table-row {
          height: 36px;
        }
      }
    }
  }
}
</style>

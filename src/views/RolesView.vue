<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
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
]);

onMounted(() => roleStore.fetchRoles());
</script>

<template>
  <BaseTable
    class="list-roles"
    :title="t('views.rolesView.table.title')"
    :can-create="userHasPermission('create-roles')"
    :can-edit="false"
    :can-delete="false"
    :headers="headers"
    :items="roles"
    :total="roles.length"
    @create="router.push({ name: 'createRoles' })"
  />
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

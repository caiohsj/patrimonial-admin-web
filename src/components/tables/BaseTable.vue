<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import BaseButton from '@/components/buttons/BaseButton.vue';
import TableRow from './TableRow.vue';

const { t } = useI18n();

type TableProps = {
  title: string;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  headers: Array<string>;
  items: Array<any>;
  total: number;
};

type BaseTableEmits = {
  (event: 'create'): void;
  (event: 'edit', value: any): void;
  (event: 'delete', value: any): void;
};

const props = defineProps<TableProps>();
const emit = defineEmits<BaseTableEmits>();

const deleteItem = (item: any) => {
  emit('delete', item);
};

const editItem = (item: any) => {
  emit('edit', item);
};
</script>

<template>
  <div class="base-table">
    <div
      class="header flex flex-col justify-between items-center px-2 py-2 gap-4 bg-light md:flex-row md:h-20"
    >
      <div class="content-title flex items-center gap-2">
        <h1 class="font-baloo2-semibold text-xl">
          {{ props.title }}
        </h1>
        <BaseButton
          type="button"
          class="add-button w-6 h-6 flex items-center justify-center"
          v-if="props.canCreate"
          @click="emit('create')"
        >
          +
        </BaseButton>
      </div>
      <form class="flex">
        <input
          type="search"
          class="h-8 rounded-sm border-2 border-primary outline-none px-2"
        />
        <BaseButton
          type="submit"
          class="h-8 text-sm px-4 rounded-tl-none rounded-bl-none shadow-none"
        >
          {{ t('components.tables.baseTable.search') }}
        </BaseButton>
      </form>
      <span class="text-gray-darken">
        {{ t('components.tables.baseTable.results', { count: props.total }) }}
      </span>
    </div>
    <div class="overflow-x-auto">
      <table class="table text-left bg-light w-full">
        <thead class="bg-gray-darken text-light">
          <tr class="h-12 font-baloo2-bold">
            <th
              v-for="(item, index) in props.headers"
              :key="index"
              class="px-4"
            >
              {{ item }}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody class="font-baloo2-regular">
          <TableRow
            v-for="(item, index) in props.items"
            :key="index"
            :item="item"
            :can-create="props.canCreate"
            :can-edit="props.canEdit"
            :can-delete="props.canDelete"
            @delete="deleteItem"
            @edit="editItem"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="css" scoped>
.base-table .header {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.base-table .table {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.base-table .table thead tr th:first-child,
.base-table .table tbody tr td:first-child {
  padding-left: 32px;
}

.base-table .table thead tr th:last-child {
  padding-right: 12px;
}

.base-table .header .content-title .add-button {
  border-radius: 50%;
}
</style>

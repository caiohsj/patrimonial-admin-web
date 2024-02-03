<script lang="ts" setup>
import { useI18n } from '@/composables/i18n';
import BaseButton from '@/components/buttons/BaseButton.vue';
import TableRow from './TableRow.vue';
import AddMultipleIcon from '@/components/icons/AddMultipleIcon.vue';

const { t } = useI18n();

type Header = {
  text: string;
  cssClasses: Array<string>;
};

type TableProps = {
  title: string;
  canCreate?: boolean;
  canBulkCreate?: boolean;
  canEdit?: boolean;
  canShow?: boolean;
  canDelete?: boolean;
  hasCustomActions?: boolean;
  hasCustomContent?: boolean;
  headers: Array<string | Header>;
  items: Array<any>;
  exceptItemsKeys?: Array<string>;
  total: number;
};

type BaseTableEmits = {
  (event: 'create'): void;
  (event: 'bulkCreate'): void;
  (event: 'edit', value: any): void;
  (event: 'delete', value: any): void;
  (event: 'show', value: any): void;
};

const props = defineProps<TableProps>();
const emit = defineEmits<BaseTableEmits>();

const deleteItem = (item: any) => {
  emit('delete', item);
};

const editItem = (item: any) => {
  emit('edit', item);
};

const showItem = (item: any) => {
  emit('show', item);
};
</script>

<template>
  <div class="base-table">
    <div
      class="header items-center justify-items-center px-2 py-2 gap-4 grid grid-rows-3 bg-light md:flex md:justify-between md:flex-row md:h-20"
    >
      <div class="content-title flex items-center gap-2">
        <h1 class="font-baloo2-semibold text-xl mr-2 lg:mr-0">
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
        <button
          type="button"
          class="w-6 h-6 flex items-center justify-center bg-light text-primary hover:text-primary-darken active:opacity-30"
          v-if="props.canBulkCreate"
          @click="emit('bulkCreate')"
        >
          <AddMultipleIcon />
        </button>
      </div>
      <!-- TODO: search bar -->
      <form class="flex" v-if="false">
        <input
          type="search"
          class="w-full h-8 rounded-sm border-2 border-primary outline-none px-2"
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
    <div class="overflow-x-auto pb-4">
      <table class="table text-left bg-light w-full">
        <thead>
          <tr class="h-12 font-baloo2-bold">
            <th
              v-for="(item, index) in props.headers"
              :key="index"
              :class="[
                'px-4 whitespace-nowrap',
                typeof item === 'string'
                  ? 'bg-gray-darken text-light'
                  : item.cssClasses,
              ]"
            >
              <span v-if="typeof item === 'string'">{{ item }}</span>
              <span v-else>{{ item.text }}</span>
            </th>
            <th class="bg-gray-darken"></th>
          </tr>
        </thead>
        <tbody class="font-baloo2-regular" v-if="!props.hasCustomContent">
          <TableRow
            v-for="(item, index) in props.items"
            :key="index"
            :item="item"
            :except-item-keys="props.exceptItemsKeys"
            :can-create="props.canCreate"
            :can-edit="props.canEdit"
            :can-show="props.canShow"
            :can-delete="props.canDelete"
            :has-custom-actions="props.hasCustomActions"
            @delete="deleteItem"
            @edit="editItem"
            @show="showItem"
          >
            <h1>teste</h1>
            <template #customActions="customActionProps">
              <slot name="customActions" :item="customActionProps.item"></slot>
            </template>
          </TableRow>
        </tbody>
        <tbody class="font-baloo2-regular" v-else>
          <slot></slot>
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

.base-table .table thead tr th:last-child {
  padding-right: 12px;
}

.base-table .header .content-title .add-button {
  border-radius: 50%;
}
</style>

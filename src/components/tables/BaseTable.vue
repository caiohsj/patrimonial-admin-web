<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTransform } from '@/composables/transform';
import OptionsIcon from '@/components/icons/OptionsIcon.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const { objectToArray } = useTransform();
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

const props = defineProps<TableProps>();
const emit = defineEmits(['create']);

const showActions = computed(() => props.canEdit || props.canDelete);
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
          <tr
            class="h-20 border-b-2 border-gray-light"
            v-for="(item, index) in props.items"
            :key="index"
          >
            <td
              v-for="(value, index) in objectToArray(item)"
              :key="index"
              class="px-4"
            >
              {{ value }}
            </td>
            <td class="flex justify-end" v-if="showActions">
              <button class="hover:opacity-50 transition-opacity">
                <OptionsIcon class="w-6" />
              </button>
            </td>
          </tr>
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

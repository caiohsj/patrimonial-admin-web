<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTransform } from '@/composables/transform';
import OptionsIcon from '@/components/icons/OptionsIcon.vue';
import ConfirmationScreen from '@/components/feedbacks/ConfirmationScreen.vue';

const { objectToArray } = useTransform();
const { t } = useI18n();
const itemsOptions = ref<HTMLDivElement>();

const openConfirmationDeleteScreen = ref<boolean>(false);

type TableRowProps = {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  hasCustomActions: boolean;
  item: any;
  exceptItemKeys?: Array<string>;
};

type TableRowEmits = {
  (event: 'edit', value: any): void;
  (event: 'delete', value: any): void;
};

const props = defineProps<TableRowProps>();
const emit = defineEmits<TableRowEmits>();

const showActions = computed(
  () => props.canEdit || props.canDelete || props.hasCustomActions
);

const toggleItemsOptions = () => {
  itemsOptions.value?.classList.toggle('opacity-0');
  itemsOptions.value?.classList.toggle('-z-50');
};

const confirmDelete = () => {
  emit('delete', props.item);
  openConfirmationDeleteScreen.value = false;
  toggleItemsOptions();
};
</script>

<template>
  <tr class="table-row border-b-2 border-gray-light">
    <td
      v-for="(value, index) in objectToArray(props.item, props.exceptItemKeys)"
      :key="index"
      class="px-4"
    >
      {{ value }}
    </td>
    <td class="flex justify-end items-center relative h-14" v-if="showActions">
      <button
        class="hover:opacity-50 transition-opacity"
        @click="toggleItemsOptions"
      >
        <OptionsIcon class="w-6 h-full" />
      </button>
      <div
        ref="itemsOptions"
        class="absolute right-8 rounded-lg p-2 grid grid-flow-col gap-2 bg-light shadow-sm border-2 border-gray-light -z-50 opacity-0 transition-all duration-700 md:flex"
      >
        <button
          class="bg-success text-light px-2 rounded-md"
          @click="emit('edit', props.item)"
          v-if="props.canEdit"
        >
          {{ t('components.tables.tableRow.buttons.edit') }}
        </button>
        <button
          class="bg-danger text-light px-2 rounded-md"
          @click="openConfirmationDeleteScreen = true"
          v-if="props.canDelete"
        >
          {{ t('components.tables.tableRow.buttons.delete') }}
        </button>
        <slot name="customActions" :item="props.item"></slot>
      </div>
    </td>
    <ConfirmationScreen
      :title="t('components.tables.tableRow.confirmationTitle')"
      v-model="openConfirmationDeleteScreen"
      @confirm="confirmDelete"
    />
  </tr>
</template>

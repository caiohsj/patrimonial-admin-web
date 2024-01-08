<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from '@/composables/i18n';
import { useTransform } from '@/composables/transform';
import ConfirmationScreen from '@/components/feedbacks/ConfirmationScreen.vue';
import EyeIcon from '@/components/icons/EyeIcon.vue';
import PencilIcon from '@/components/icons/PencilIcon.vue';
import TrashIcon from '@/components/icons/TrashIcon.vue';

const { objectToArray } = useTransform();
const { t } = useI18n();

const openConfirmationDeleteScreen = ref<boolean>(false);

type TableRowProps = {
  canEdit?: boolean;
  canShow?: boolean;
  canDelete?: boolean;
  hasCustomActions: boolean;
  item: any;
  exceptItemKeys?: Array<string>;
};

type TableRowEmits = {
  (event: 'edit', value: any): void;
  (event: 'delete', value: any): void;
  (event: 'show', value: any): void;
};

const props = defineProps<TableRowProps>();
const emit = defineEmits<TableRowEmits>();

const showActions = computed(
  () => props.canEdit || props.canDelete || props.hasCustomActions
);

const confirmDelete = () => {
  emit('delete', props.item);
  openConfirmationDeleteScreen.value = false;
};
</script>

<template>
  <tr class="table-row border-b-2 border-gray-light">
    <td
      v-for="(value, index) in objectToArray(props.item, props.exceptItemKeys)"
      :key="index"
      class="px-4 whitespace-nowrap"
    >
      {{ value }}
    </td>
    <td
      class="flex justify-end items-center gap-1 relative h-14 pr-1"
      v-if="showActions"
    >
      <slot name="customActions" :item="props.item"></slot>
      <button
        class="bg-success text-light p-1 rounded-md"
        @click="emit('show', props.item)"
        v-if="props.canShow"
      >
        <EyeIcon class="h-5 w-5" />
      </button>
      <button
        class="bg-primary text-light p-1 rounded-md"
        @click="emit('edit', props.item)"
        v-if="props.canEdit"
      >
        <PencilIcon class="h-5 w-5" />
      </button>
      <button
        class="bg-danger text-light p-1 rounded-md"
        @click="openConfirmationDeleteScreen = true"
        v-if="props.canDelete"
      >
        <TrashIcon class="h-5 w-5" />
      </button>
    </td>
    <ConfirmationScreen
      :title="t('components.tables.tableRow.confirmationTitle')"
      v-model="openConfirmationDeleteScreen"
      @confirm="confirmDelete"
    />
  </tr>
</template>

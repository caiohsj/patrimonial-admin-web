<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useTemplateStore } from '@/stores/template';
import { useI18n } from '@/composables/i18n';
import BaseTable from '@/components/tables/BaseTable.vue';

const { t } = useI18n();
const templateStore = useTemplateStore();
const { templates } = storeToRefs(templateStore);

const headers = computed(() => [
  t('views.templatesView.table.headers.id'),
  t('views.templatesView.table.headers.name'),
]);

onBeforeMount(() => templateStore.fetchTemplates());
</script>

<template>
  <BaseTable
    :title="t('views.templatesView.table.title')"
    :headers="headers"
    :items="templates"
    :total="templates.length"
  />
</template>

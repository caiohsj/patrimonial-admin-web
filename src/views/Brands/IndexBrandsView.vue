<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useBrandStore } from '@/stores/brand';
import { useI18n } from '@/composables/i18n';
import BaseTable from '@/components/tables/BaseTable.vue';

const { t } = useI18n();
const brandStore = useBrandStore();
const { brands } = storeToRefs(brandStore);

const headers = computed(() => [
  t('views.brandsView.table.headers.id'),
  t('views.brandsView.table.headers.name'),
]);

onBeforeMount(() => brandStore.fetchBrands());
</script>

<template>
  <BaseTable
    :title="t('views.brandsView.table.title')"
    :headers="headers"
    :items="brands"
    :total="brands.length"
  />
</template>

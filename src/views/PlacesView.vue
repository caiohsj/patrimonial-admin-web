<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { usePlaceStore } from '@/stores/place';
import BaseTable from '@/components/tables/BaseTable.vue';

const { t } = useI18n();

const placeStore = usePlaceStore();
const { places } = storeToRefs(placeStore);

const headers = computed(() => [
  t('views.placesView.table.headers.id'),
  t('views.placesView.table.headers.description'),
]);

onMounted(() => placeStore.fetchPlaces());
</script>

<template>
  <BaseTable
    :title="t('views.placesView.table.title')"
    :can-edit="true"
    :can-delete="true"
    :headers="headers"
    :items="places"
    :total="places.length"
  />
</template>

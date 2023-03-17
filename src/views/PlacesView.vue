<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePermissions } from '@/composables/permissions';
import { usePlaceStore } from '@/stores/place';
import BaseTable from '@/components/tables/BaseTable.vue';

const { t } = useI18n();
const { userHasPermission } = usePermissions();
const router = useRouter();

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
    :can-create="userHasPermission('create-places')"
    :can-edit="userHasPermission('update-places')"
    :can-delete="userHasPermission('delete-places')"
    :headers="headers"
    :items="places"
    :total="places.length"
    @create="router.push({ name: 'createPlaces' })"
  />
</template>

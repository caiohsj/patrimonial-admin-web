<script lang="ts" setup>
import { onMounted, watch, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/i18n';
import { useBranchStore } from '@/stores/branch';
import { usePlaceStore } from '@/stores/place';
import { useSessionStore } from '@/stores/session';
import SelectableList from '@/components/inputs/SelectableList.vue';

const router = useRouter();
const { t } = useI18n();
const branch = ref(0);
const place = ref(0);

const branchStore = useBranchStore();
const { branchesOptions } = storeToRefs(branchStore);

const placeStore = usePlaceStore();
const { placesOptions } = storeToRefs(placeStore);

const sessionStore = useSessionStore();
const { hasApplicationConfigurations } = storeToRefs(sessionStore);

onMounted(() => {
  if (hasApplicationConfigurations) router.push({ name: 'home' });

  branchStore.fetchBranches();
});

watch(hasApplicationConfigurations, (value) => {
  if (value === true) router.push({ name: 'home' });
});

watch(branch, (branch_id) => {
  placeStore.fetchPlaces({ branch_id });
  sessionStore.setCurrentBranch(branch_id);
});

watch(place, (place_id) => {
  sessionStore.setCurrentPlace(place_id);
});

const hasNoBranchSelected = computed(() => branch.value == 0);

const title = computed(() =>
  hasNoBranchSelected.value
    ? t('views.applicationConfigurationsView.selectBranch')
    : t('views.applicationConfigurationsView.selectPlace')
);
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <div
      :class="[
        'selection-option-view',
        'bg-light',
        'flex',
        'flex-col',
        'items-center',
        'rounded-lg',
        'shadow-lg',
        'py-6',
        'w-full',
        'gap-8',
        'lg:h-fit',
        'lg:w-3/4',
        'lg:py-10',
        'lg:gap-16',
        'xl:w-3/6',
        '2xl:pb-28',
        '2xl:gap-28',
        '2xl:w-3/6',
      ]"
    >
      <h1 class="font-baloo2-bold text-2xl text-center mb-6 lg:mb-0">
        {{ title }}
      </h1>

      <SelectableList
        :options="branchesOptions"
        v-model="branch"
        v-if="hasNoBranchSelected"
      />

      <SelectableList :options="placesOptions" v-model="place" v-else />
    </div>
  </div>
</template>

<style scoped></style>

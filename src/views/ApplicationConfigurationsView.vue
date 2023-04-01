<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useForm } from 'vee-validate';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import BaseButton from '@/components/buttons/BaseButton.vue';
import SelectGroup from '@/components/inputs/SelectGroup.vue';
import { useBranchStore } from '@/stores/branch';
import { usePlaceStore } from '@/stores/place';
import { useSessionStore } from '@/stores/session';

const router = useRouter();
const { t } = useI18n();

const branchStore = useBranchStore();
const { branchesOptions } = storeToRefs(branchStore);

const placeStore = usePlaceStore();
const { placesOptions } = storeToRefs(placeStore);

const sessionStore = useSessionStore();
const { hasApplicationConfigurations } = storeToRefs(sessionStore);

onMounted(() => {
  if (hasApplicationConfigurations) router.push({ name: 'home' });

  branchStore.fetchBranches();
  placeStore.fetchPlaces();
});

watch(hasApplicationConfigurations, (value) => {
  if (value === true) router.push({ name: 'home' });
});

const { handleSubmit } = useForm<{
  branch: number;
  place: number;
}>();

const onSubmit = handleSubmit(({ branch, place }) => {
  sessionStore.setCurrentBranch(branch);
  sessionStore.setCurrentPlace(place);
});
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
        {{ t('views.applicationConfigurationsView.title') }}
      </h1>

      <form class="w-full px-6 lg:px-0 lg:w-2/4 grid gap-4" @submit="onSubmit">
        <SelectGroup
          :label="t('views.applicationConfigurationsView.form.labels.branch')"
          name="branch"
          rules="required"
          :options="branchesOptions"
        />
        <SelectGroup
          :label="t('views.applicationConfigurationsView.form.labels.place')"
          name="place"
          rules="required"
          :options="placesOptions"
        />
        <BaseButton type="submit">
          {{ t('views.applicationConfigurationsView.form.submit') }}
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

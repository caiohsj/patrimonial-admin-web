<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useForm } from 'vee-validate';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/buttons/BaseButton.vue';
import SelectGroup from '@/components/inputs/SelectGroup.vue';
import { useBranchStore } from '@/stores/branch';
import { usePlaceStore } from '@/stores/place';
import { useSessionStore } from '@/stores/session';

const router = useRouter();

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
  <div class="h-full flex justify-center items-center">
    <div
      class="selection-option-view bg-light flex flex-col items-center rounded-lg shadow-lg"
    >
      <h1 class="font-baloo2-bold text-2xl text-center mt-10 mb-24">
        Configure a aplicação
      </h1>

      <form class="w-2/4 grid gap-4" @submit="onSubmit">
        <SelectGroup
          label="Filial"
          name="branch"
          rules="required"
          :options="branchesOptions"
        />
        <SelectGroup
          label="Local"
          name="place"
          rules="required"
          :options="placesOptions"
        />
        <BaseButton type="submit">Aplicar</BaseButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.selection-option-view {
  width: 600px;
  height: 600px;
}
</style>

<script lang="ts" setup>
type DepreciationCardProps = {
  title: string;
  items: Array<[string, string]>;
  color: string;
};

const props = defineProps<DepreciationCardProps>();
</script>

<template>
  <div
    class="flex mt-12 mb-3 p-2 rounded-md font-baloo2-bold text-xl text-light"
    :class="`bg-${props.color}`"
  >
    {{ props.title }}
  </div>

  <div class="flex flex-wrap gap-4 px-2 whitespace-nowrap">
    <div v-for="([title, value], index) in props.items" :key="index">
      <span class="mr-1 font-baloo2-bold">{{ title }}:</span>
      <span class="text-gray-darken">{{ value }}</span>
    </div>
  </div>
</template>

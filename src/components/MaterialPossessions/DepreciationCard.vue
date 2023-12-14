<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

type DepreciationCardProps = {
  title: string;
  items: Array<[string, string]>;
  color: string;
  complete: boolean;
};

const props = defineProps<DepreciationCardProps>();

const { t } = useI18n();
</script>

<template>
  <div
    class="flex mt-12 mb-3 p-2 rounded-md font-baloo2-bold text-xl text-light"
    :class="`bg-${props.color}`"
  >
    {{ props.title }}
  </div>

  <div
    class="flex flex-wrap gap-4 px-2 whitespace-nowrap"
    v-if="props.complete"
  >
    <div v-for="([title, value], index) in props.items" :key="index">
      <span class="mr-1 font-baloo2-bold">{{ title }}:</span>
      <span class="text-gray-darken">{{ value }}</span>
    </div>
  </div>

  <div class="text-lg" v-else>
    {{ t('components.materialPossessions.depreciationCard.incompleteData') }}
  </div>
</template>

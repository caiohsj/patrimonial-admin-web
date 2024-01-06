<script lang="ts" setup>
type SafeImageProps = {
  src?: string | null;
  placeholder: string;
  alt: string;
};

const props = defineProps<SafeImageProps>();
</script>

<template>
  <img v-if="props.src" :src="props.src" :alt="props.alt" class="safe-image" />
  <img v-else :src="props.placeholder" :alt="props.alt" class="safe-image" />
</template>

import { computed } from 'vue';

export function useWindow() {
  const bodyWidth = computed(() => document.body.clientWidth);
  const bodyHeight = computed(() => document.body.clientHeight);

  return { bodyWidth, bodyHeight };
}

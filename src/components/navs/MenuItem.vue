<script lang="ts" setup>
import { computed } from 'vue';

type MenuItemProps = {
  show: boolean;
  active: boolean;
};

const props = defineProps<MenuItemProps>();
const emit = defineEmits(['navigate']);

const navItemActiveClasses = computed(() => {
  const activeClasses = [
    'bg-primary',
    'text-white',
    'hover:bg-transparent',
    'hover:text-primary',
    'hover:border-primary',
  ];
  return props.active
    ? activeClasses
    : ['hover:bg-primary', 'hover:text-white'];
});
</script>

<template>
  <li>
    <a
      v-if="props.show"
      :class="[
        ...navItemActiveClasses,
        'flex',
        'justify-center',
        'font-baloo2-bold',
        'rounded-sm',
        'py-2',
        'border-2',
        'border-transparent',
        'cursor-pointer',
        'transition',
      ]"
      @click="emit('navigate')"
    >
      <slot></slot>
    </a>
  </li>
</template>

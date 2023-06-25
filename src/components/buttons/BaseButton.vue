<script lang="ts" setup>
type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
};

const props = defineProps<ButtonProps>();
</script>

<template>
  <button
    :type="props.type"
    class="bg-primary text-light text-lg font-baloo2-bold h-12 rounded-md shadow-lg outline-none transition-all duration-300 hover:bg-primary-darken active:opacity-30"
  >
    <slot></slot>
  </button>
</template>

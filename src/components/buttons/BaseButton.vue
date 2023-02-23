<script lang="ts" setup>
type ButtonProps = {
  text: string;
  type: 'button' | 'submit' | 'reset';
};

const props = defineProps<ButtonProps>();
</script>

<template>
  <div class="flex flex-col">
    <button
      :type="props.type"
      class="bg-primary text-light text-lg font-baloo2-bold h-16 rounded-md shadow-lg outline-none transition-all duration-300 hover:bg-primary-darken active:opacity-30"
    >
      {{ props.text }}
    </button>
  </div>
</template>

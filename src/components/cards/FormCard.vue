<script lang="ts" setup>
const props = defineProps<{ title: string }>();
const emit = defineEmits(['submit']);

const onSubmit = (e: Event) => {
  e.preventDefault();
  emit('submit');
};
</script>

<template>
  <div class="form-card bg-light rounded-lg pb-8 shadow-md">
    <div class="header border-gray-light px-8 h-20 flex items-center">
      <h1 class="font-baloo2-semibold text-gray-darken text-xl">
        {{ props.title }}
      </h1>
    </div>
    <div class="content-form px-8 pt-8 h-fit">
      <form class="grid gap-6" @submit="onSubmit">
        <slot></slot>
      </form>
    </div>
  </div>
</template>

<style lang="css" scoped>
.form-card .header {
  border-bottom-width: 1px;
}
</style>

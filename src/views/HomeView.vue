<script lang="ts" setup>
const onClick = () => {
  localStorage.clear();
  window.location.reload();
};
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full">
    <h1>Inicio</h1>
    <button
      class="mt-8 w-24 py-3 rounded-lg bg-danger text-light"
      @click="onClick"
    >
      Sair
    </button>
  </div>
</template>

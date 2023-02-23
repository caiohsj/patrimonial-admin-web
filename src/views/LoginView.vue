<script lang="ts" setup>
import BaseButton from '@/components/buttons/BaseButton.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleSubmit = () => console.log('submit');
</script>

<template>
  <main class="bg-slate-50 h-screen flex flex-col justify-center items-center">
    <img
      src="@/assets/images/logo.png"
      alt="SMX Inventários"
      class="w-48 h-40"
    />
    <h1 class="font-baloo2-bold text-gray-400 mb-8 text-xl">Autenticação</h1>
    <form class="grid gap-4 w-80" @submit.prevent="handleSubmit()">
      <InputGroup label="Email" type="email" v-model="email" />
      <InputGroup label="Senha" type="password" v-model="password" />

      <BaseButton type="submit" class="mt-8">Acessar</BaseButton>
    </form>
  </main>
</template>

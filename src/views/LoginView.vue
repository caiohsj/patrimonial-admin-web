<script lang="ts" setup>
import BaseButton from '@/components/buttons/BaseButton.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const email = ref('');
const password = ref('');

const handleSubmit = () => console.log('submit');
</script>

<template>
  <main class="bg-slate-50 h-screen flex flex-col justify-center items-center">
    <img src="@/assets/images/logo.png" :alt="t('altLogo')" class="w-48 h-40" />
    <h1 class="font-baloo2-bold text-gray-400 mb-8 text-xl">
      {{ t('views.loginView.title') }}
    </h1>

    <form class="grid gap-4 w-80" @submit.prevent="handleSubmit()">
      <InputGroup
        :label="t('views.loginView.form.labels.email')"
        type="email"
        v-model="email"
        autocomplete="on"
      />
      <InputGroup
        :label="t('views.loginView.form.labels.password')"
        type="password"
        v-model="password"
        autocomplete="on"
      />

      <BaseButton type="submit" class="mt-8">
        {{ t('views.loginView.form.submit') }}
      </BaseButton>
    </form>
  </main>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import BaseButton from '@/components/buttons/BaseButton.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';

const { t } = useI18n();

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(values => {
  console.log(values);
});
</script>

<template>
  <main class="bg-slate-50 h-screen flex flex-col justify-center items-center">
    <img src="@/assets/images/logo.png" :alt="t('altLogo')" class="w-48 h-40" />
    <h1 class="font-baloo2-bold text-gray-400 mb-8 text-xl">
      {{ t('views.loginView.title') }}
    </h1>

    <form class="grid gap-4 w-80" @submit="onSubmit">
      <InputGroup
        :label="t('views.loginView.form.labels.email')"
        name="email"
        type="text"
        autocomplete="on"
        rules="required"
      />
      <InputGroup
        :label="t('views.loginView.form.labels.password')"
        name="password"
        type="password"
        autocomplete="on"
        rules="required"
      />

      <BaseButton type="submit" class="mt-8">
        {{ t('views.loginView.form.submit') }}
      </BaseButton>
    </form>
  </main>
</template>

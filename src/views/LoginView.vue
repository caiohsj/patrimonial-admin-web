<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import { storeToRefs } from 'pinia';
import { onBeforeMount, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { SignInFormData } from '@/@types/interfaces/SignInFormData';
import BaseButton from '@/components/buttons/BaseButton.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import { useSessionStore } from '@/stores/session';

const { t } = useI18n();

const router = useRouter();

const { handleSubmit } = useForm<SignInFormData>();

const sessionStore = useSessionStore();
const { hasSession } = storeToRefs(sessionStore);

const onSubmit = handleSubmit((values) => {
  sessionStore.signIn(values);
});

onBeforeMount(() => {
  if (hasSession.value === true) router.push({ name: 'home' });
});

watch(hasSession, (value) => {
  if (value === true) router.push({ name: 'home' });
});
</script>

<template>
  <main class="bg-light h-screen flex flex-col justify-center items-center">
    <img src="@/assets/images/logo.png" :alt="t('altLogo')" class="w-48 h-40" />
    <h1 class="font-baloo2-bold text-gray mb-8 text-xl">
      {{ t('views.loginView.title') }}
    </h1>

    <form class="grid gap-4 w-80" @submit="onSubmit">
      <InputGroup
        :label="t('views.loginView.form.labels.email')"
        name="email"
        type="email"
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

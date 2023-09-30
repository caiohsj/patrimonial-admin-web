<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSessionStore } from '@/stores/session';
import { useUserStore } from '@/stores/user';
import type { CreatePasswordFormData } from '@/@types/interfaces/CreatePasswordFormData';
import BaseButton from '@/components/buttons/BaseButton.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const { handleSubmit } = useForm<CreatePasswordFormData>();
const sessionStore = useSessionStore();
const { hasSession } = storeToRefs(sessionStore);
const userStore = useUserStore();

onBeforeMount(() => {
  if (hasSession.value === true) router.push({ name: 'home' });
});

const onSubmit = handleSubmit((values) => {
  userStore
    .createPassword(
      values.password,
      values.password_confirmation,
      String(route.query.token)
    )
    .then(() => router.push({ name: 'login' }));
});
</script>

<template>
  <div
    class="bg-light h-screen w-full flex flex-col justify-center items-center"
  >
    <img src="@/assets/images/logo.png" :alt="t('altLogo')" class="w-48 h-40" />
    <h1 class="font-baloo2-bold text-gray-darken mb-8 text-xl">
      {{ t('views.createPasswordView.title') }}
    </h1>

    <form class="grid gap-4 w-full md:w-96" @submit="onSubmit">
      <InputGroup
        :label="t('views.createPasswordView.form.labels.password')"
        name="password"
        type="password"
        autocomplete="off"
        rules="required"
      />
      <InputGroup
        :label="t('views.createPasswordView.form.labels.password_confirmation')"
        name="password_confirmation"
        type="password"
        autocomplete="off"
        rules="required"
      />

      <BaseButton type="submit" class="mt-8">
        {{ t('views.createPasswordView.form.submit') }}
      </BaseButton>
    </form>
  </div>
</template>

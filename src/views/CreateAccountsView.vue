<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/i18n';
import type { CreateAccountFormData } from '@/@types/interfaces/CreateAccountFormData';
import { useAccountStore } from '@/stores/account';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const router = useRouter();
const { t } = useI18n();
const { handleSubmit } = useForm<CreateAccountFormData>();
const accountStore = useAccountStore();

const onSubmit = handleSubmit((values) => {
  accountStore.createAccount(values).then(() => {
    router.push({ name: 'accounts' });
  });
});
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.createAccountsView.form.title')"
      @submit="onSubmit"
    >
      <InputGroup
        type="text"
        :label="t('views.createAccountsView.form.labels.description')"
        name="description"
        rules="required"
      />
      <InputGroup
        type="number"
        :label="t('views.createAccountsView.form.labels.tax_rate')"
        name="tax_rate"
        rules="required"
      />
      <BaseButton type="submit" class="md:w-56 md:self-end">
        {{ t('views.createAccountsView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, watch } from 'vue';
import { useForm } from 'vee-validate';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from '@/composables/i18n';
import { storeToRefs } from 'pinia';
import type { CreateAccountFormData } from '@/@types/interfaces/CreateAccountFormData';
import { useAccountStore } from '@/stores/account';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const accountStore = useAccountStore();
const { account } = storeToRefs(accountStore);

const accountId = computed(() => Number(route.params.id));

onBeforeMount(() => accountStore.fetchAccount(accountId.value));

const { handleSubmit, setValues } = useForm<CreateAccountFormData>();

const onSubmit = handleSubmit((values) => {
  accountStore.updateAccount(values, accountId.value).then(() => {
    router.push({ name: 'accounts' });
  });
});

watch(account, (account) => {
  setValues({ description: account?.description, tax_rate: account?.tax_rate });
});
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.editAccountsView.form.title', { id: accountId })"
      @submit="onSubmit"
    >
      <InputGroup
        :label="t('views.editAccountsView.form.labels.description')"
        type="text"
        name="description"
        rules="required"
      />
      <InputGroup
        type="number"
        :label="t('views.editAccountsView.form.labels.tax_rate')"
        name="tax_rate"
        rules="required"
      />
      <BaseButton type="submit" class="md:w-56 md:self-end">
        {{ t('views.editAccountsView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

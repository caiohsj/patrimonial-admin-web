<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { CreateBranchFormData } from '@/@types/interfaces/CreateBranchFormData';
import { useBranchStore } from '@/stores/branch';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const router = useRouter();
const { t } = useI18n();
const { handleSubmit } = useForm<CreateBranchFormData>();
const branchStore = useBranchStore();

const onSubmit = handleSubmit((values) => {
  branchStore.createBranch(values).then(() => {
    router.push({ name: 'branches' });
  });
});
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.createBranchesView.form.title')"
      @submit="onSubmit"
    >
      <InputGroup
        type="text"
        :label="t('views.createBranchesView.form.labels.description')"
        name="description"
        rules="required"
      />
      <BaseButton type="submit" class="md:w-56 md:self-end">
        {{ t('views.createBranchesView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

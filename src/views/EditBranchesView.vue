<script lang="ts" setup>
import { computed, onBeforeMount, watch } from 'vue';
import { useForm } from 'vee-validate';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import type { CreateBranchFormData } from '@/@types/interfaces/CreateBranchFormData';
import { useBranchStore } from '@/stores/branch';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const branchStore = useBranchStore();
const { branch } = storeToRefs(branchStore);

const branchId = computed(() => Number(route.params.id));

onBeforeMount(() => branchStore.fetchBranch(branchId.value));

const { handleSubmit, setValues } = useForm<CreateBranchFormData>();

const onSubmit = handleSubmit((values) => {
  branchStore.updateBranch(values, branchId.value).then(() => {
    router.push({ name: 'branches' });
  });
});

watch(branch, (branch) => {
  setValues({ description: branch?.description });
});
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.updateBranchesView.form.title', { id: branchId })"
    >
      <form class="flex flex-col gap-6" @submit="onSubmit">
        <InputGroup
          :label="t('views.updateBranchesView.form.labels.description')"
          type="text"
          name="description"
          rules="required"
        />
        <BaseButton type="submit" class="md:w-56 md:self-end">
          {{ t('views.updateBranchesView.form.submit') }}
        </BaseButton>
      </form>
    </FormCard>
  </div>
</template>

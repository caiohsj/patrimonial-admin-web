<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/i18n';
import { storeToRefs } from 'pinia';
import type { CreateUserFormData } from '@/@types/interfaces/CreateUserFormData';
import { useUserStore } from '@/stores/user';
import { useRoleStore } from '@/stores/role';
import { useBranchStore } from '@/stores/branch';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import SelectGroup from '@/components/inputs/SelectGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import { onMounted } from 'vue';

const router = useRouter();
const { t } = useI18n();
const { handleSubmit } = useForm<CreateUserFormData>();
const userStore = useUserStore();

const roleStore = useRoleStore();
const { rolesOptions } = storeToRefs(roleStore);

const branchStore = useBranchStore();
const { branchesOptions } = storeToRefs(branchStore);

onMounted(() => {
  roleStore.fetchRoles();
  branchStore.fetchBranches();
});

const onSubmit = handleSubmit((values) => {
  userStore.createUser(values).then(() => {
    router.push({ name: 'users' });
  });
});
</script>

<template>
  <div class="w-full">
    <FormCard :title="t('views.createUsersView.form.title')" @submit="onSubmit">
      <InputGroup
        type="text"
        :label="t('views.createUsersView.form.labels.name')"
        name="name"
        rules="required"
      />
      <InputGroup
        type="email"
        :label="t('views.createUsersView.form.labels.email')"
        name="email"
        rules="required"
      />
      <SelectGroup
        :label="t('views.createUsersView.form.labels.role')"
        name="role_id"
        rules="required"
        :options="rolesOptions"
      />
      <SelectGroup
        :label="t('views.createUsersView.form.labels.branch')"
        name="branch_id"
        :options="branchesOptions"
      />
      <BaseButton type="submit" class="md:w-56 md:self-end">
        {{ t('views.createUsersView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

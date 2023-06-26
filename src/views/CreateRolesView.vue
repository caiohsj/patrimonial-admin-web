<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import type { CreateRoleFormData } from '@/@types/interfaces/CreateRoleFormData';
import { useRoleStore } from '@/stores/role';
import { usePermissionStore } from '@/stores/permission';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import MultiSelectableList from '@/components/inputs/MultiSelectableList.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const step = ref(1);
const router = useRouter();
const { t } = useI18n();
const { handleSubmit, validate } = useForm<CreateRoleFormData>();
const roleStore = useRoleStore();
const permissionStore = usePermissionStore();
const { permissionsOptions } = storeToRefs(permissionStore);

const nextStep = async () => {
  const result = await validate();

  if (result.valid) step.value++;
};

const onSubmit = handleSubmit((values) => {
  roleStore.createRole(values).then(() => router.push({ name: 'roles' }));
});

onMounted(() => permissionStore.fetchPermissions());
</script>

<template>
  <div class="w-full">
    <FormCard :title="t('views.createRolesView.form.title')" @submit="onSubmit">
      <div v-show="step == 1">
        <InputGroup
          type="text"
          :label="t('views.createRolesView.form.labels.name')"
          name="name"
          rules="required"
        />
      </div>

      <div v-show="step == 2">
        <MultiSelectableList
          name="permissions_ids"
          :options="permissionsOptions"
        />
      </div>

      <BaseButton
        v-if="step != 2"
        type="button"
        class="md:w-40 md:justify-self-end"
        @click="nextStep"
      >
        {{ t('views.createRolesView.form.nextStep') }}
      </BaseButton>

      <BaseButton v-else type="submit" class="md:w-40 md:self-end">
        {{ t('views.createRolesView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

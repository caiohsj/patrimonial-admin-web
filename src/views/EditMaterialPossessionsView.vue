<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useForm } from 'vee-validate';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useCostCenterStore } from '@/stores/CostCenter';
import { useAccountStore } from '@/stores/account';
import { useTransform } from '@/composables/transform';
import type { UpdateMaterialPossessionFormData } from '@/@types/interfaces/UpdateMaterialPossessionFormData';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import SelectGroup from '@/components/inputs/SelectGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import CurrencyInputGroup from '@/components/inputs/CurrencyInputGroup.vue';

const step = ref(1);

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const { handleSubmit, validate, values, setValues } =
  useForm<UpdateMaterialPossessionFormData>();
const { currencyBRLToNumber, numberToCurrencyBRL, parseDate } = useTransform();

const materialPossessionStore = useMaterialPossessionStore();

const materialPossessionId = computed(() => Number(route.params.id));

const costCenterStore = useCostCenterStore();
const { costCentersOptions } = storeToRefs(costCenterStore);

const accountStore = useAccountStore();
const { accountsOptions } = storeToRefs(accountStore);

const nextStep = async () => {
  const result = await validate();

  if (result.valid) step.value++;
};

const onSubmit = handleSubmit((values) => {
  materialPossessionStore
    .updateMaterialPossession(
      materialPossessionId.value,
      values.description,
      values.brand_name,
      values.template_name,
      values.date_of_aquisition,
      currencyBRLToNumber(values.aquisition_value),
      values.cost_center_id,
      values.account_id
    )
    .then(() => {
      router.push({ name: 'materialPossessions' });
    });
});

watch(step, (value) => {
  if (value == 2) {
    costCenterStore.fetchCostCenters();
    accountStore.fetchAccounts();
  }
});

onMounted(async () => {
  await materialPossessionStore.fetchMaterialPossession(
    materialPossessionId.value
  );

  setValues({
    description: materialPossessionStore.materialPossession?.description,
    date_of_aquisition: parseDate(
      materialPossessionStore.materialPossession?.date_of_aquisition
    ),
    aquisition_value: numberToCurrencyBRL(
      materialPossessionStore.materialPossession?.aquisition_value
    ),
    brand_name: materialPossessionStore.materialPossession?.brand_name,
    template_name: materialPossessionStore.materialPossession?.template_name,
    cost_center_id: materialPossessionStore.materialPossession?.cost_center_id
      ? materialPossessionStore.materialPossession?.cost_center_id
      : undefined,
    account_id: materialPossessionStore.materialPossession?.account_id
      ? materialPossessionStore.materialPossession?.account_id
      : undefined,
  });
});

const templateRules = computed(() => {
  return values.brand_name != '' && values.brand_name != undefined
    ? 'required'
    : '';
});
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="
        t('views.editMaterialPossessionsView.form.title', {
          number: materialPossessionStore.materialPossession?.number,
        })
      "
      @submit="onSubmit"
    >
      <div v-show="step == 1">
        <InputGroup
          type="text"
          :label="
            t('views.editMaterialPossessionsView.form.labels.description')
          "
          name="description"
          rules="required"
        />
        <InputGroup
          type="text"
          :label="t('views.editMaterialPossessionsView.form.labels.brandName')"
          name="brand_name"
        />
        <InputGroup
          type="text"
          :label="
            t('views.editMaterialPossessionsView.form.labels.templateName')
          "
          name="template_name"
          :rules="templateRules"
        />
        <InputGroup
          type="text"
          :label="
            t('views.editMaterialPossessionsView.form.labels.dateOfAquisition')
          "
          name="date_of_aquisition"
          mask="##/##/####"
        />
        <CurrencyInputGroup
          :label="
            t('views.editMaterialPossessionsView.form.labels.aquisitionValue')
          "
          name="aquisition_value"
          currency="BRL"
        />
      </div>

      <div v-show="step == 2">
        <SelectGroup
          :options="costCentersOptions"
          name="cost_center_id"
          :label="t('views.editMaterialPossessionsView.form.labels.costCenter')"
        />
        <SelectGroup
          :options="accountsOptions"
          name="account_id"
          :label="t('views.editMaterialPossessionsView.form.labels.account')"
        />
      </div>

      <BaseButton
        v-if="step != 2"
        type="button"
        class="md:w-56 md:self-end"
        @click="nextStep"
      >
        {{ t('views.editMaterialPossessionsView.form.nextStep') }}
      </BaseButton>

      <BaseButton v-else type="submit" class="md:w-56 md:self-end">
        {{ t('views.editMaterialPossessionsView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

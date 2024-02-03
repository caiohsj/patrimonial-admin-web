<script lang="ts" setup>
import { ref, onBeforeMount, computed, watch } from 'vue';
import { useForm } from 'vee-validate';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from '@/composables/i18n';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core';
import { useCostCenterStore } from '@/stores/CostCenter';
import { useAccountStore } from '@/stores/account';
import { usePlaceStore } from '@/stores/place';
import { useBrandStore } from '@/stores/brand';
import { useTemplateStore } from '@/stores/template';
import { useTransform } from '@/composables/transform';
import type { UpdateMaterialPossessionFormData } from '@/@types/interfaces/UpdateMaterialPossessionFormData';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import SelectGroup from '@/components/inputs/SelectGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import CurrencyInputGroup from '@/components/inputs/CurrencyInputGroup.vue';
import InputWithSelect from '@/components/inputs/InputWithSelect.vue';

const step = ref(1);

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const { handleSubmit, validate, values, setValues } =
  useForm<UpdateMaterialPossessionFormData>();
const { currencyBRLToNumber, numberToCurrencyBRL, parseDate } = useTransform();

const materialPossessionStore = useMaterialPossessionStore();
const { materialPossession } = storeToRefs(materialPossessionStore);

const materialPossessionId = computed(() => Number(route.params.id));

const costCenterStore = useCostCenterStore();
const { costCentersOptions } = storeToRefs(costCenterStore);

const accountStore = useAccountStore();
const { accountsOptions } = storeToRefs(accountStore);

const brandStore = useBrandStore();
const { brands } = storeToRefs(brandStore);

const templateStore = useTemplateStore();
const { templates } = storeToRefs(templateStore);

const placeStore = usePlaceStore();
const { placesOptions } = storeToRefs(placeStore);

const nextStep = async () => {
  const result = await validate();

  if (result.valid) step.value++;
};

const onSubmit = handleSubmit((values) => {
  materialPossessionStore
    .updateMaterialPossession(
      materialPossessionId.value,
      values.description,
      values.place_id,
      values.brand_name,
      values.template_name,
      values.date_of_aquisition,
      currencyBRLToNumber(values.aquisition_value),
      values.cost_center_id,
      values.account_id,
      currencyBRLToNumber(values.residual_value_of_discard),
      values.lifespan
    )
    .then(() => {
      router.push({ name: 'materialPossessions' });
    });
});

const handleInputBrand = useDebounceFn(() => {
  brandStore.filters.name = values.brand_name;
  brandStore.fetchBrands();
}, 1000);

const handleInputTemplate = useDebounceFn(() => {
  templateStore.filters.name = values.template_name;
  templateStore.fetchTemplates();
}, 1000);

watch(step, (value) => {
  if (value == 2) {
    costCenterStore.fetchCostCenters();
    accountStore.fetchAccounts();
  }
});

onBeforeMount(async () => {
  await materialPossessionStore.fetchMaterialPossession(
    materialPossessionId.value
  );
  await placeStore.fetchPlaces({
    branch_id: materialPossession.value?.branch_id,
  });

  setValues({
    description: materialPossession.value?.description,
    date_of_aquisition: parseDate(materialPossession.value?.date_of_aquisition),
    aquisition_value: numberToCurrencyBRL(
      materialPossession.value?.aquisition_value
    ),
    brand_name: materialPossession.value?.brand_name,
    template_name: materialPossession.value?.template_name,
    place_id: materialPossession.value?.place_id
      ? materialPossession.value?.place_id
      : undefined,
    cost_center_id: materialPossession.value?.cost_center_id
      ? materialPossession.value?.cost_center_id
      : undefined,
    account_id: materialPossession.value?.account_id
      ? materialPossession.value?.account_id
      : undefined,
    residual_value_of_discard: numberToCurrencyBRL(
      materialPossession.value?.residual_value_of_discard
    ),
    lifespan: materialPossession.value?.lifespan,
  });
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
        <SelectGroup
          :options="placesOptions"
          name="place_id"
          :label="t('views.editMaterialPossessionsView.form.labels.place')"
        />
        <InputWithSelect
          :label="
            t('views.createMaterialPossessionsView.form.labels.brandName')
          "
          name="brand_name"
          :list-items="brands.map((brand) => brand.name)"
          @input="handleInputBrand"
          @selected="() => brandStore.clearBrands()"
        />
        <InputWithSelect
          :label="
            t('views.createMaterialPossessionsView.form.labels.templateName')
          "
          name="template_name"
          :list-items="templates.map((template) => template.name)"
          @input="handleInputTemplate"
          @selected="() => templateStore.clearTemplates()"
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
        <CurrencyInputGroup
          :label="
            t(
              'views.editMaterialPossessionsView.form.labels.residualValueOfDiscard'
            )
          "
          name="residual_value_of_discard"
          currency="BRL"
        />
        <InputGroup
          type="number"
          :label="t('views.editMaterialPossessionsView.form.labels.lifespan')"
          name="lifespan"
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

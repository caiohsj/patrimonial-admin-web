<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/i18n';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core';
import { useBranchStore } from '@/stores/branch';
import { usePlaceStore } from '@/stores/place';
import { useSessionStore } from '@/stores/session';
import { useCostCenterStore } from '@/stores/CostCenter';
import { useAccountStore } from '@/stores/account';
import { useBrandStore } from '@/stores/brand';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import { useTemplateStore } from '@/stores/template';
import { useTransform } from '@/composables/transform';
import type { CreateMaterialPossessionFormData } from '@/@types/interfaces/CreateMaterialPossessionFormData';
import FormCard from '@/components/cards/FormCard.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import SelectGroup from '@/components/inputs/SelectGroup.vue';
import FileInputGroup from '@/components/inputs/FileInputGroup.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import SelectableList from '@/components/inputs/SelectableList.vue';
import CurrencyInputGroup from '@/components/inputs/CurrencyInputGroup.vue';
import InputWithSelect from '@/components/inputs/InputWithSelect.vue';

const step = ref(1);
const branch = ref(0);
const place = ref(0);
const images = ref<Array<File | string>>([]);

const router = useRouter();
const { t } = useI18n();
const { handleSubmit, validate, setFieldValue, values } =
  useForm<CreateMaterialPossessionFormData>();
const { currencyBRLToNumber } = useTransform();
const materialPossessionStore = useMaterialPossessionStore();

const branchStore = useBranchStore();
const { branchesOptions } = storeToRefs(branchStore);

const placeStore = usePlaceStore();
const { placesOptions } = storeToRefs(placeStore);

const sessionStore = useSessionStore();
const { hasApplicationConfigurations, currentPlace } =
  storeToRefs(sessionStore);

const costCenterStore = useCostCenterStore();
const { costCentersOptions } = storeToRefs(costCenterStore);

const accountStore = useAccountStore();
const { accountsOptions } = storeToRefs(accountStore);

const brandStore = useBrandStore();
const { brands } = storeToRefs(brandStore);

const templateStore = useTemplateStore();
const { templates } = storeToRefs(templateStore);

const nextStep = async () => {
  const result = await validate();

  if (result.valid) step.value++;
};

const onSubmit = handleSubmit((values) => {
  materialPossessionStore
    .createMaterialPossession(
      values.number,
      values.description,
      getPlaceId(),
      images.value,
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
      materialPossessionStore.indexFilters.approved = 0;
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

const handleImageSelected = (
  fileList: FileList | string | null | undefined
) => {
  if (fileList && typeof fileList != 'string') {
    for (const file of fileList) {
      images.value.push(file);
    }
  }

  if (typeof fileList == 'string') images.value.push(fileList);
};

const getImageSrc = (file: File | string) => {
  if (typeof file == 'string') return file;

  return URL.createObjectURL(file);
};

const hasNoBranchSelected = computed(() => branch.value == 0);

const getPlaceId = (): number => {
  return hasApplicationConfigurations.value
    ? Number(currentPlace.value?.id)
    : place.value;
};

onMounted(() => {
  if (!hasApplicationConfigurations.value) return branchStore.fetchBranches();

  step.value++;
  setFieldValue('aquisition_value', 'R$ 0');
  setFieldValue('residual_value_of_discard', 'R$ 0');
});

watch(branch, (branch_id) => {
  placeStore.fetchPlaces({ branch_id });
});

watch(place, () => step.value++);

watch(step, (value) => {
  if (value == 3) {
    setFieldValue('cost_center_id', null);
    setFieldValue('account_id', null);

    costCenterStore.fetchCostCenters();
    accountStore.fetchAccounts();
  }
});
</script>

<template>
  <div class="w-full">
    <FormCard
      :title="t('views.createMaterialPossessionsView.form.title')"
      @submit="onSubmit"
    >
      <div v-show="step == 1">
        <div class="flex flex-col" v-if="hasNoBranchSelected">
          <label class="font-baloo2-bold text-dark mb-6">
            {{ t('views.createMaterialPossessionsView.form.labels.branch') }}
          </label>
          <SelectableList :options="branchesOptions" v-model="branch" />
        </div>

        <div class="flex flex-col">
          <label class="font-baloo2-bold text-dark mb-6">
            {{ t('views.createMaterialPossessionsView.form.labels.place') }}
          </label>
          <SelectableList :options="placesOptions" v-model="place" />
        </div>
      </div>

      <div v-show="step == 2">
        <InputGroup
          type="text"
          :label="t('views.createMaterialPossessionsView.form.labels.number')"
          name="number"
          rules="required"
        />
        <InputGroup
          type="text"
          :label="
            t('views.createMaterialPossessionsView.form.labels.description')
          "
          name="description"
          rules="required"
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
            t(
              'views.createMaterialPossessionsView.form.labels.dateOfAquisition'
            )
          "
          name="date_of_aquisition"
          mask="##/##/####"
        />
        <CurrencyInputGroup
          :label="
            t('views.createMaterialPossessionsView.form.labels.aquisitionValue')
          "
          name="aquisition_value"
          currency="BRL"
        />
      </div>

      <div v-show="step == 3">
        <SelectGroup
          :options="costCentersOptions"
          name="cost_center_id"
          :label="
            t('views.createMaterialPossessionsView.form.labels.costCenter')
          "
        />
        <SelectGroup
          :options="accountsOptions"
          name="account_id"
          :label="t('views.createMaterialPossessionsView.form.labels.account')"
        />
        <CurrencyInputGroup
          :label="
            t(
              'views.createMaterialPossessionsView.form.labels.residualValueOfDiscard'
            )
          "
          name="residual_value_of_discard"
          currency="BRL"
        />
        <InputGroup
          type="number"
          :label="t('views.createMaterialPossessionsView.form.labels.lifespan')"
          name="lifespan"
        />
      </div>

      <div v-show="step == 4">
        <FileInputGroup
          @selected-filed="handleImageSelected"
          :multiple="true"
          :label="t('views.createMaterialPossessionsView.form.labels.images')"
          accept="image/*"
          capture="user"
          name="images"
          rules="required"
          class="mb-6"
          size="large"
        />
        <div>
          <h1 class="font-baloo2-bold text-dark">
            {{
              t('views.createMaterialPossessionsView.form.stepTwo.labelImages')
            }}
          </h1>
          <p class="text-gray-darken">
            {{
              t(
                'views.createMaterialPossessionsView.form.stepTwo.countImages',
                {
                  count: images.length,
                }
              )
            }}
          </p>
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="getImageSrc(image)"
            alt=""
          />
        </div>
      </div>

      <BaseButton
        v-if="step != 4"
        type="button"
        class="md:w-56 md:self-end"
        @click="nextStep"
      >
        {{ t('views.createMaterialPossessionsView.form.nextStep') }}
      </BaseButton>

      <BaseButton v-else type="submit" class="md:w-56 md:self-end">
        {{ t('views.createMaterialPossessionsView.form.submit') }}
      </BaseButton>
    </FormCard>
  </div>
</template>

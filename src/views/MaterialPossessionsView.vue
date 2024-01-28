<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from '@/composables/i18n';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useDateFormat } from '@vueuse/core';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import { usePermissions } from '@/composables/permissions';
import { useTransform } from '@/composables/transform';
import type { Index } from '@/@types/interfaces/api/MaterialPossessions/Index';
import BaseTable from '@/components/tables/BaseTable.vue';
import ConfirmationScreen from '@/components/feedbacks/ConfirmationScreen.vue';
import TabsNav from '@/components/navs/TabsNav.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import EyeIcon from '@/components/icons/EyeIcon.vue';
import PencilIcon from '@/components/icons/PencilIcon.vue';
import TrashIcon from '@/components/icons/TrashIcon.vue';

const { t } = useI18n();
const { userHasPermission } = usePermissions();
const router = useRouter();
const { numberToCurrencyBRL } = useTransform();
const openConfirmationDeleteScreen = ref(false);
const materialIdToWillDelete = ref(0);

const materialPossessionStore = useMaterialPossessionStore();
const { materialPossessions, filters } = storeToRefs(materialPossessionStore);

const headers = computed(() => [
  t('views.materialPossessionsView.table.headers.number'),
  t('views.materialPossessionsView.table.headers.description'),
  t('views.materialPossessionsView.table.headers.placeDescription'),
  t('views.materialPossessionsView.table.headers.branchDescription'),
  t('views.materialPossessionsView.table.headers.brandName'),
  t('views.materialPossessionsView.table.headers.templateName'),
  t('views.materialPossessionsView.table.headers.dateOfAquisition'),
  t('views.materialPossessionsView.table.headers.aquisitionValue'),
  t('views.materialPossessionsView.table.headers.costCenter'),
  t('views.materialPossessionsView.table.headers.account'),
  {
    text: t(
      'views.materialPossessionsView.table.headers.residualValueOfDiscard'
    ),
    cssClasses: ['bg-success', 'text-light'],
  },
  {
    text: t('views.materialPossessionsView.table.headers.depreciableValue'),
    cssClasses: ['bg-success', 'text-light'],
  },
  {
    text: t('views.materialPossessionsView.table.headers.lifespan'),
    cssClasses: ['bg-success', 'text-light'],
  },
  {
    text: t(
      'views.materialPossessionsView.table.headers.monthlyDepreciationQuota'
    ),
    cssClasses: ['bg-success', 'text-light'],
  },
  {
    text: t(
      'views.materialPossessionsView.table.headers.accumulatedDepreciation'
    ),
    cssClasses: ['bg-success', 'text-light'],
  },
  {
    text: t('views.materialPossessionsView.table.headers.bookValue'),
    cssClasses: ['bg-success', 'text-light'],
  },
  {
    text: t('views.materialPossessionsView.table.headers.deprecated'),
    cssClasses: ['bg-success', 'text-light'],
  },
  {
    text: t('views.materialPossessionsView.table.headers.taxRate'),
    cssClasses: ['bg-primary-darken', 'text-light'],
  },
  {
    text: t(
      'views.materialPossessionsView.table.headers.monthlyDepreciationQuota'
    ),
    cssClasses: ['bg-primary-darken', 'text-light'],
  },
  {
    text: t(
      'views.materialPossessionsView.table.headers.accumulatedDepreciation'
    ),
    cssClasses: ['bg-primary-darken', 'text-light'],
  },
  {
    text: t('views.materialPossessionsView.table.headers.bookValue'),
    cssClasses: ['bg-primary-darken', 'text-light'],
  },
  '',
]);

onMounted(() => materialPossessionStore.fetchMaterialPossessions());

const approveMaterialPossession = (id: number) => {
  materialPossessionStore.approveMaterialPossession(id);
};

const navigateToEditMaterialPossession = (materialPossession: Index) => {
  router.push({
    name: 'editMaterialPossessions',
    params: { id: materialPossession.id },
  });
};

const navigateToShowMaterialPossession = (materialPossession: Index) => {
  router.push({
    name: 'showMaterialPossessions',
    params: { id: materialPossession.id },
  });
};

const handleDelete = (materialPossession: Index) => {
  openConfirmationDeleteScreen.value = true;
  materialIdToWillDelete.value = materialPossession.id;
};

const confirmDelete = () => {
  materialPossessionStore.deleteMaterialPossession(
    materialIdToWillDelete.value
  );
};
</script>

<template>
  <div class="material-possessions-view">
    <TabsNav
      :items="[
        {
          text: t('views.materialPossessionsView.tabs.approveds'),
          click: () =>
            materialPossessionStore.fetchApprovedMaterialPossessions(),
          active: filters.approved === 1,
          show: true,
        },
        {
          text: t('views.materialPossessionsView.tabs.disapproveds'),
          click: () =>
            materialPossessionStore.fetchDisapprovedMaterialPossessions(),
          active: filters.approved === 0,
          show: userHasPermission('approve-material-possessions'),
        },
      ]"
      :show="true"
    />

    <BaseTable
      :title="t('views.materialPossessionsView.table.title')"
      :can-create="userHasPermission('create-material-possessions')"
      :can-bulk-create="userHasPermission('bulk-create-material-possessions')"
      :has-custom-actions="false"
      :has-custom-content="true"
      :headers="headers"
      :items="materialPossessions"
      :total="materialPossessions.length"
      @create="router.push({ name: 'createMaterialPossessions' })"
      @bulk-create="router.push({ name: 'bulkCreateMaterialPossessions' })"
    >
      <tr v-for="material in materialPossessions" :key="material.id">
        <td class="px-4 whitespace-nowrap">
          {{ material.number }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ material.description }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ material.place_description }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ material.branch_description }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ material.brand_name }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ material.template_name }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ useDateFormat(material.date_of_aquisition, 'DD/MM/YYYY').value }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ numberToCurrencyBRL(material.aquisition_value) }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ material.cost_center_description }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ material.account_description }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{
            numberToCurrencyBRL(
              material.economic_depreciation?.residual_value_of_discard
            )
          }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{
            numberToCurrencyBRL(
              material.economic_depreciation?.depreciable_value
            )
          }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ material.economic_depreciation?.lifespan }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{
            numberToCurrencyBRL(
              material.economic_depreciation?.monthly_depreciation_quota
            )
          }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{
            numberToCurrencyBRL(
              material.economic_depreciation?.accumulated_depreciation
            )
          }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ numberToCurrencyBRL(material.economic_depreciation?.book_value) }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ t(`${material.deprecated}`) }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ material.tax_depreciation?.tax_rate }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{
            numberToCurrencyBRL(
              material.tax_depreciation?.monthly_depreciation_quota
            )
          }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{
            numberToCurrencyBRL(
              material.tax_depreciation?.accumulated_depreciation
            )
          }}
        </td>
        <td class="px-4 whitespace-nowrap">
          {{ numberToCurrencyBRL(material.tax_depreciation?.book_value) }}
        </td>
        <td class="px-4 flex justify-end items-center gap-1">
          <button
            class="bg-sky-500 text-light p-1 rounded-md"
            @click="approveMaterialPossession(material.id)"
            v-if="
              userHasPermission('approve-material-possessions') &&
              material.approved === false
            "
          >
            <CheckIcon class="h-5 w-5" />
          </button>
          <button
            class="bg-success text-light p-1 rounded-md"
            @click="navigateToShowMaterialPossession(material)"
            v-if="userHasPermission('show-material-possessions')"
          >
            <EyeIcon class="h-5 w-5" />
          </button>
          <button
            class="bg-primary text-light p-1 rounded-md"
            @click="navigateToEditMaterialPossession(material)"
            v-if="userHasPermission('update-material-possessions')"
          >
            <PencilIcon class="h-5 w-5" />
          </button>
          <button
            class="bg-danger text-light p-1 rounded-md"
            @click="handleDelete(material)"
            v-if="userHasPermission('delete-material-possessions')"
          >
            <TrashIcon class="h-5 w-5" />
          </button>
        </td>
      </tr>
    </BaseTable>

    <ConfirmationScreen
      :title="t('components.tables.tableRow.confirmationTitle')"
      v-model="openConfirmationDeleteScreen"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style lang="scss">
.material-possessions-view {
  .base-table {
    .header {
      border-top-left-radius: 0;
    }
  }
}
</style>

<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import { storeToRefs } from 'pinia';
import { useTransform } from '@/composables/transform';
import DepreciationCard from '@/components/MaterialPossessions/DepreciationCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const { numberToCurrencyBRL, parseDate } = useTransform();

const materialPossessionStore = useMaterialPossessionStore();
const { materialPossession } = storeToRefs(materialPossessionStore);

const materialPossessionId = computed(() => Number(route.params.id));

const openImage = (url: string) => window.open(url, '_blank');

onBeforeMount(() => {
  materialPossessionStore.fetchMaterialPossession(materialPossessionId.value);
});
</script>

<template>
  <div
    class="flex flex-col bg-light rounded-lg p-2 shadow-md md:flex-row md:p-8"
  >
    <div class="w-full px-4">
      <div class="flex justify-between">
        <span class="font-baloo2-bold text-gray-darken">
          {{ materialPossession?.number }}
        </span>

        <div
          v-if="materialPossession?.deprecated"
          class="bg-dark text-white p-2 rounded-md font-baloo2-bold text-xl"
        >
          {{ t('views.showMaterialPossessionsView.deprecated') }}
        </div>
      </div>

      <h1 class="font-baloo2-bold text-2xl my-3">
        {{ materialPossession?.description }}
      </h1>

      <p class="font-baloo2-bold text-xl text-gray-darken mb-3">
        {{ numberToCurrencyBRL(materialPossession?.aquisition_value) }}
      </p>

      <ul class="flex gap-2 mb-5">
        <li
          v-for="(image_url, index) in materialPossession?.images_urls"
          :key="index"
          @click="openImage(image_url)"
          class="cursor-pointer hover:scale-110 transition-all duration-15000"
        >
          <img :src="image_url" alt="" class="w-14 h-14" />
        </li>
      </ul>

      <div class="flex gap-4 mb-2">
        <div>
          <span class="mr-1 font-baloo2-bold">
            {{ t('views.showMaterialPossessionsView.labels.place') }}:
          </span>
          <span class="text-gray-darken">
            {{ materialPossession?.place_description }}
          </span>
        </div>

        <div>
          <span class="mr-1 font-baloo2-bold">
            {{ t('views.showMaterialPossessionsView.labels.branch') }}:
          </span>
          <span class="text-gray-darken">
            {{ materialPossession?.branch_description }}
          </span>
        </div>
      </div>

      <div class="flex gap-4 mb-2">
        <div>
          <span class="mr-1 font-baloo2-bold">
            {{ t('views.showMaterialPossessionsView.labels.brand') }}:
          </span>
          <span class="text-gray-darken">
            {{ materialPossession?.brand_name }}
          </span>
        </div>

        <div>
          <span class="mr-1 font-baloo2-bold">
            {{ t('views.showMaterialPossessionsView.labels.template') }}:
          </span>
          <span class="text-gray-darken">
            {{ materialPossession?.template_name }}
          </span>
        </div>
      </div>

      <div>
        <span class="mr-1 font-baloo2-bold">
          {{ t('views.showMaterialPossessionsView.labels.dateOfAquisition') }}:
        </span>
        <span class="text-gray-darken">
          {{ parseDate(materialPossession?.date_of_aquisition) }}
        </span>
      </div>

      <DepreciationCard
        :title="
          t(
            'views.showMaterialPossessionsView.labels.economicDepreciation.title'
          )
        "
        color="primary"
        :items="[
          [
            t(
              'views.showMaterialPossessionsView.labels.economicDepreciation.residualValueOfDiscard'
            ),
            numberToCurrencyBRL(materialPossession?.residual_value_of_discard),
          ],
          [
            t(
              'views.showMaterialPossessionsView.labels.economicDepreciation.depreciableValue'
            ),
            numberToCurrencyBRL(
              materialPossession?.economic_depreciation?.depreciable_value
            ),
          ],
          [
            t(
              'views.showMaterialPossessionsView.labels.economicDepreciation.lifespan'
            ),
            t('views.showMaterialPossessionsView.lifespan', {
              value: materialPossession?.lifespan,
            }),
          ],
          [
            t(
              'views.showMaterialPossessionsView.labels.monthlyDepreciationQuota'
            ),
            numberToCurrencyBRL(
              materialPossession?.economic_depreciation
                ?.monthly_depreciation_quota
            ),
          ],
          [
            t(
              'views.showMaterialPossessionsView.labels.accumulatedDepreciation'
            ),
            numberToCurrencyBRL(
              materialPossession?.economic_depreciation
                ?.accumulated_depreciation
            ),
          ],
          [
            t('views.showMaterialPossessionsView.labels.bookValue'),
            numberToCurrencyBRL(
              materialPossession?.economic_depreciation?.book_value
            ),
          ],
        ]"
      />

      <DepreciationCard
        :title="
          t('views.showMaterialPossessionsView.labels.taxDepreciation.title')
        "
        color="success"
        :items="[
          [
            t(
              'views.showMaterialPossessionsView.labels.taxDepreciation.taxRate'
            ),
            `${materialPossession?.tax_depreciation?.tax_rate} %`,
          ],
          [
            t(
              'views.showMaterialPossessionsView.labels.monthlyDepreciationQuota'
            ),
            numberToCurrencyBRL(
              materialPossession?.tax_depreciation?.monthly_depreciation_quota
            ),
          ],
          [
            t(
              'views.showMaterialPossessionsView.labels.accumulatedDepreciation'
            ),
            numberToCurrencyBRL(
              materialPossession?.tax_depreciation?.accumulated_depreciation
            ),
          ],
          [
            t('views.showMaterialPossessionsView.labels.bookValue'),
            numberToCurrencyBRL(
              materialPossession?.tax_depreciation?.book_value
            ),
          ],
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useMaterialPossessionStore } from '@/stores/MaterialPossession';
import AuditRow from '@/components/MaterialPossessions/AuditRow.vue';
import { useI18n } from '@/composables/i18n';

const materialPossessionStore = useMaterialPossessionStore();
const { logs } = storeToRefs(materialPossessionStore);
const { t } = useI18n();

onBeforeMount(() => materialPossessionStore.fetchMaterialPossessionsLogs());
</script>

<template>
  <div class="px-8">
    <div class="flex flex-col bg-light rounded-lg p-6">
      <h1 class="text-2xl font-baloo2-bold text-center mb-10">
        {{ t('views.auditOfMaterialPossessionsView.title') }}
      </h1>

      <div class="flex flex-col gap-4">
        <AuditRow v-for="(log, index) in logs" :key="index" :log="log" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useDateFormat } from '@vueuse/core';
import { useTransform } from '@/composables/transform';
import { useI18n } from '@/composables/i18n';
import { useDate } from '@/composables/date';
import type { Log } from '@/@types/interfaces/api/MaterialPossessions/log';
import ClockIcon from '@/components/icons/ClockIcon.vue';

const props = defineProps<{ log: Log }>();

const { t } = useI18n();
const { fromNowUnixSeconds } = useDate();
const { objectToArray, numberToCurrencyBRL } = useTransform();
const div = ref<HTMLDivElement>();
const changesElement = ref<HTMLDivElement>();

function handleClick() {
  div.value?.classList.toggle('dropdown');
}

const moneyColumns = ['residual_value_of_discard', 'aquisition_value'];
const dateColumns = ['updated_at', 'date_of_aquisition'];

function formatValue(key: string, value: string | number | null): string {
  if (value === null) return '-';

  if (key == 'approved') return t(`${Boolean(value)}`);

  if (key == 'lifespan')
    return t('formats.materialPossessions.lifespan', { number: value });

  if (dateColumns.includes(key))
    return useDateFormat(value, 'DD/MM/YYYY').value;

  if (moneyColumns.includes(key)) return numberToCurrencyBRL(Number(value));

  return `${value}`;
}

const height = computed(() => `${changesElement.value?.clientHeight}px`);

const keys = computed(() => Object.keys(JSON.parse(props.log.new_data)));
const oldValues = computed(() => objectToArray(JSON.parse(props.log.old_data)));
const newValues = computed(() => objectToArray(JSON.parse(props.log.new_data)));
</script>

<template>
  <div
    @click="handleClick"
    class="flex flex-col text-lg border-2 rounded-md p-2 cursor-pointer hover:border-success"
  >
    <div class="flex items-center justify-between gap-4">
      <div class="bg-sky-400 text-light rounded-sm px-2">
        {{
          t(
            `components.materialPossessions.auditRow.log_type.${props.log.log_type}`
          )
        }}
      </div>
      <div>
        {{
          t('components.materialPossessions.auditRow.loggable_id', {
            id: props.log.loggable_id,
          })
        }}
      </div>
      <div>
        {{
          t('components.materialPossessions.auditRow.user_name', {
            user_name: props.log.user_name,
          })
        }}
      </div>
      <div class="flex items-center w-fit">
        <ClockIcon class="h-5 w-5 mr-2" />
        <span>{{ fromNowUnixSeconds($props.log.log_date) }}</span>
      </div>
      <!-- <span class="w-4 h-4 bg-dark justify-self-end" style="clip-path: polygon(0% 20%, 50% 80%, 100% 20%);"></span> -->
    </div>

    <div class="values" ref="div">
      <div
        class="h-fit w-full overflow-x-auto flex justify-between gap-4 pt-8"
        ref="changesElement"
      >
        <div class="flex flex-col">
          <div
            v-for="(key, index) in keys"
            :key="index"
            class="h-8 whitespace-nowrap"
          >
            {{ t(`keys.materialPossessions.${key}`) }}
          </div>
        </div>
        <div class="flex flex-col">
          <div
            v-for="(item, index) in oldValues"
            :key="index"
            :class="['h-8 whitespace-nowrap', { 'text-center': item == null }]"
          >
            {{ formatValue(keys[index], item) }}
          </div>
        </div>
        <div class="flex flex-col text-success">
          <div
            v-for="(item, index) in newValues"
            :key="index"
            :class="['h-8 whitespace-nowrap', { 'text-center': item == null }]"
          >
            {{ formatValue(keys[index], item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.values {
  overflow: hidden;
  transition: 0.5s ease-in-out;
  height: 0;
  opacity: 0;
  display: flex;

  &.dropdown {
    height: v-bind(height);
    opacity: 1;
  }
}
</style>

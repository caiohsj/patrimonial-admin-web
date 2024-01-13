<script setup lang="ts">
import { ref } from 'vue';
import WhatsappIcon from '@/components/icons/WhatsappIcon.vue';
import { useI18n } from '@/composables/i18n';

const { t } = useI18n();

const whatsapp = ref('5521981432473');
const cpf = ref('457.745.760-19');
const cnpj = ref('52.029.606/0001-53');
const email = ref('email@smxinventarios.com.br');
</script>

<template>
  <div class="h-full">
    <h1 class="text-center text-danger font-baloo2-extrabold text-2xl">
      {{ t('views.pendingPaymentView.title') }}
    </h1>
    <div class="flex h-full justify-center items-center">
      <div
        class="flex flex-col justify-between p-2 bg-light h-80 w-80 rounded-2xl"
      >
        <div>
          <h2 class="mb-6 font-baloo2-bold text-center text-lg">
            {{ t('views.pendingPaymentView.pixKeys.title') }}
          </h2>

          <table class="border-separate border-spacing-2">
            <tr>
              <td class="rounded-lg px-2 bg-success text-white">
                {{ t('views.pendingPaymentView.pixKeys.cpf') }}
              </td>
              <td>{{ cpf }}</td>
            </tr>
            <tr>
              <td class="rounded-lg px-2 bg-primary text-white">
                {{ t('views.pendingPaymentView.pixKeys.cnpj') }}
              </td>
              <td>{{ cnpj }}</td>
            </tr>
            <tr>
              <td class="rounded-lg px-2 bg-cyan-600 text-white">
                {{ t('views.pendingPaymentView.pixKeys.email') }}
              </td>
              <td>{{ email }}</td>
            </tr>
          </table>
        </div>

        <a
          class="px-4 bg-green-300 text-white flex h-12 justify-center items-center rounded-lg"
          :href="`http://wa.me/${whatsapp}`"
          target="_blank"
        >
          <WhatsappIcon class="w-6 h-6 mr-2" />
          <span class="font-baloo2-bold text-lg">
            {{ t('views.pendingPaymentView.contact') }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

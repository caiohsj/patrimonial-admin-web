<script setup lang="ts">
import WhatsappIcon from '@/components/icons/WhatsappIcon.vue';
</script>

<template>
  <div class="h-full">
    <h1 class="text-center text-danger font-baloo2-extrabold text-2xl">
      A sua conta não está aprovada. É necessário fazer um pagamento para aprovar sua conta!
    </h1>
    <div class="flex h-full justify-center items-center">
      <div
        class="flex flex-col justify-between p-2 bg-light h-80 w-80 rounded-2xl"
      >
        <div>
          <h2 class="mb-6 font-baloo2-bold text-center text-lg">Chaves Pix</h2>

          <table class="border-separate border-spacing-2">
            <tr>
              <td class="rounded-lg px-2 bg-success text-white">CPF</td>
              <td>457.745.760-19</td>
            </tr>
            <tr>
              <td class="rounded-lg px-2 bg-primary text-white">CNPJ</td>
              <td>52.029.606/0001-53</td>
            </tr>
            <tr>
              <td class="rounded-lg px-2 bg-cyan-600 text-white">EMAIL</td>
              <td>email@smxinventarios.com.br</td>
            </tr>
          </table>
        </div>

        <a
          class="px-4 bg-green-300 text-white flex h-12 justify-center items-center rounded-lg"
          href="http://wa.me/5521981432473"
          target="_blank"
        >
          <WhatsappIcon class="w-6 h-6 mr-2" />
          <span class="font-baloo2-bold text-lg">Entre em contato</span>
        </a>
      </div>
    </div>
  </div>
</template>

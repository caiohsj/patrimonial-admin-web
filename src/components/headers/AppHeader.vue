<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useSessionStore } from '@/stores/session';
import MapPinIcon from '@/components/icons/MapPinIcon.vue';
import HomeIcon from '@/components/icons/HomeIcon.vue';

const router = useRouter();
const { t } = useI18n();

const settingsContainer = ref<HTMLDivElement | null>(null);

const sessionStore = useSessionStore();
const {
  hasSession,
  currentUser,
  hasApplicationConfigurations,
  currentPlace,
  currentBranch,
} = storeToRefs(sessionStore);

const logout = () => {
  sessionStore.signOut();
  router.push({ name: 'login' });
};

const toggleSettings = () => {
  if (settingsContainer.value != null) {
    const opacity = settingsContainer.value.style.opacity;
    settingsContainer.value.style.opacity =
      opacity == '0' || opacity == '' ? '1' : '0';
  }
};
</script>

<template>
  <div v-if="hasSession" class="h-24 flex justify-between items-center px-4">
    <div>
      <div v-if="hasApplicationConfigurations" class="flex gap-4">
        <span class="flex items-center">
          <MapPinIcon class="w-8 h-6 mr-1" />
          {{ currentBranch?.description }}
        </span>
        <span class="flex items-center">
          <HomeIcon class="w-8 h-8 mr-1" />
          {{ currentPlace?.description }}
        </span>
      </div>
    </div>
    <div
      @click="toggleSettings"
      class="profile flex items-center gap-2 hover:cursor-pointer relative"
    >
      <img
        src="@/assets/images/Avatar.png"
        :alt="currentUser?.name"
        class="hover:opacity-60"
      />
      <div class="font-baloo2-bold flex flex-col">
        <span class="text-lg">{{ currentUser?.name }}</span>
        <!-- TODO -->
        <span class="text-xs text-gray-darken">Cargo</span>
      </div>
      <div
        ref="settingsContainer"
        class="settings cursor-default absolute top-24 right-2 bg-white px-6 py-4 w-56 rounded-md shadow-lg"
      >
        <a @click="logout" class="hover:text-success cursor-pointer">
          {{ t('components.headers.appHeader.logout') }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.profile .settings {
  opacity: 0;
  z-index: 2;
  transition: all 0.7s;
}
</style>

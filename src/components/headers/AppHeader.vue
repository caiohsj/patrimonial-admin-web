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

const changeApplicationConfigurations = () => {
  sessionStore.clearApplicationConfigurations();
  router.push({ name: 'applicationConfigurations' });
};
</script>

<template>
  <div v-if="hasSession" class="h-24 flex justify-between items-center">
    <div>
      <div
        v-if="hasApplicationConfigurations"
        @click="changeApplicationConfigurations"
        class="flex bg-white py-2 rounded-md hover:opacity-60 cursor-pointer"
      >
        <span
          class="flex flex-col items-start px-8 justify-center border-gray-light border-r-2"
        >
          <div class="flex items-center font-baloo2-bold">
            <span>{{ t('components.headers.appHeader.branch') }}</span>
            <MapPinIcon class="h-3 w-3 ml-2 text-success" />
          </div>
          <span class="text-gray-darken">
            {{ currentBranch?.description }}
          </span>
        </span>
        <span class="flex flex-col items-start px-8 justify-center">
          <div class="flex items-center font-baloo2-bold">
            <span>{{ t('components.headers.appHeader.place') }}</span>
            <HomeIcon class="h-4 w-4 ml-2 text-success" />
          </div>
          <span class="text-gray-darken">
            {{ currentPlace?.description }}
          </span>
        </span>
      </div>
    </div>
    <div class="profile flex items-center gap-2 hover:cursor-pointer relative">
      <div>
        <img
          src="@/assets/images/Avatar.png"
          :alt="currentUser?.name"
          class="hover:opacity-60 h-12"
          @click="toggleSettings"
        />
      </div>
      <div class="font-baloo2-bold flex flex-col">
        <span class="text-lg">{{ currentUser?.name }}</span>
        <!-- TODO -->
        <span class="text-xs text-gray-darken">Cargo</span>
      </div>
      <div
        ref="settingsContainer"
        class="settings cursor-default absolute top-16 right-2 bg-white px-6 py-4 w-56 rounded-md shadow-lg font-baloo2-bold"
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

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useSessionStore } from '@/stores/session';
import { useWindow } from '@/composables/window';
import MapPinIcon from '@/components/icons/MapPinIcon.vue';
import HomeIcon from '@/components/icons/HomeIcon.vue';

const { bodyWidth } = useWindow();
const isMobile = computed(() => bodyWidth.value < 768);

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

watch(hasSession, (value) => {
  if (!value) router.push({ name: 'login' });
});
</script>

<template>
  <div
    v-if="hasSession"
    class="h-24 flex justify-end md:justify-between items-center px-2"
  >
    <div>
      <div
        v-if="hasApplicationConfigurations"
        @click="changeApplicationConfigurations"
        class="flex bg-white py-2 rounded-md hover:opacity-60 cursor-pointer text-sm md:text-base shadow-lg"
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
    <div
      class="profile flex items-center gap-2 hover:cursor-pointer relative"
      v-if="!isMobile"
    >
      <a
        class="rounded-full bg-light p-2 hover:opacity-60"
        @click="toggleSettings"
      >
        <img
          src="@/assets/images/Avatar.jpg"
          :alt="currentUser?.name"
          class="h-8 rounded-full"
        />
      </a>
      <div class="font-baloo2-bold flex flex-col">
        <span class="text-lg">{{ currentUser?.name }}</span>
        <span class="text-xs text-gray-darken text-center">
          {{ currentUser?.role.name }}
        </span>
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

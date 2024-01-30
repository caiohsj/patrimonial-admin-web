<script lang="ts" setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/i18n';
import { useSessionStore } from '@/stores/session';
import MapPinIcon from '@/components/icons/MapPinIcon.vue';
import HomeIcon from '@/components/icons/HomeIcon.vue';
import SafeImage from '@/components/common/SafeImage.vue';

const router = useRouter();
const { t } = useI18n();

const settingsContainer = ref<HTMLDivElement>();

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
  settingsContainer.value?.classList.toggle('hidden');
  settingsContainer.value?.classList.toggle('flex');
};

const navigate = (routeName: string) => {
  toggleSettings();
  router.push({ name: routeName });
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
  <div v-if="hasSession" class="h-24 flex justify-between items-center px-8">
    <div class="w-full md:w-fit">
      <div
        v-if="hasApplicationConfigurations"
        @click="changeApplicationConfigurations"
        class="flex bg-white py-2 rounded-md hover:opacity-60 cursor-pointer text-sm md:text-base shadow-lg"
      >
        <span
          class="w-full flex flex-col items-start px-8 justify-center border-gray-light border-r-2"
        >
          <div class="flex items-center font-baloo2-bold">
            <span>{{ t('components.headers.appHeader.branch') }}</span>
            <MapPinIcon class="h-3 w-3 ml-2 text-success" />
          </div>
          <span class="text-gray-darken">
            {{ currentBranch?.description }}
          </span>
        </span>
        <span class="w-full flex flex-col items-start px-8 justify-center">
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
      class="profile hidden items-center gap-2 hover:cursor-pointer relative md:flex"
    >
      <a
        class="avatar-link bg-light p-1 hover:opacity-60"
        @click="toggleSettings"
      >
        <SafeImage
          :src="currentUser?.avatar"
          :alt="t('components.headers.appHeader.avatarAlt')"
          class="h-12"
          placeholder="/images/Avatar.jpg"
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
        class="settings hidden flex-col cursor-default absolute top-16 right-2 bg-white px-6 py-4 w-56 rounded-md shadow-lg font-baloo2-bold"
      >
        <a
          @click="navigate('userProfile')"
          class="hover:text-success cursor-pointer"
        >
          {{ t('components.headers.appHeader.profile') }}
        </a>
        <a @click="logout" class="hover:text-success cursor-pointer">
          {{ t('components.headers.appHeader.logout') }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  .settings {
    z-index: 2;
    transition: all 0.7s;
  }

  .avatar-link {
    clip-path: circle();

    .safe-image {
      clip-path: circle();
      object-fit: cover;
    }
  }
}
</style>

import { defineStore } from 'pinia';
import type { Ref } from 'vue';

type AsideNavStoreState = {
  navMobileRef?: Ref<HTMLDivElement>;
};

export const useAsideNavStore = defineStore('aside_nav', {
  state: (): AsideNavStoreState => ({}),
  actions: {
    setNavMobileRef(div?: HTMLDivElement) {
      this.navMobileRef = div;
    },

    toggleNavMobile() {
      this.navMobileRef?.classList.toggle('w-0');
      this.navMobileRef?.classList.toggle('opacity-0');
      this.navMobileRef?.classList.toggle('w-full');
    },
  },
});

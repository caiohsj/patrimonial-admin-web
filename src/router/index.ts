import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes';
import { useSessionStore } from '@/stores/session';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const sessionStore = useSessionStore();

  if (to.meta.requiresAuth && !sessionStore.hasSession) {
    router.push({ name: 'login' });
  }

  if (
    to.meta.requiresApplicationConfigurations &&
    !sessionStore.hasApplicationConfigurations
  ) {
    router.push({ name: 'applicationConfigurations' });
  }
});

export default router;

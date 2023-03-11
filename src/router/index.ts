import { usePermissions } from '@/composables/permissions';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes';
import { useSessionStore } from '@/stores/session';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const sessionStore = useSessionStore();
  const { userCanAccessRoute } = usePermissions();

  if (to.meta.requiresAuth && !sessionStore.hasSession) {
    await router.push({ name: 'login' });
  }

  if (sessionStore.hasSession && !userCanAccessRoute(String(to.name))) {
    await router.push({ name: 'home' });
  }

  if (
    sessionStore.hasSession &&
    to.name != 'applicationConfigurations' &&
    !sessionStore.hasApplicationConfigurations &&
    userCanAccessRoute('applicationConfigurations')
  ) {
    await router.push({ name: 'applicationConfigurations' });
  }
});

export default router;

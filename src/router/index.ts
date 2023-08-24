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
  const { userHasPermission } = usePermissions();

  if (to.meta.requiresAuth && !sessionStore.hasSession) {
    await router.push({ name: 'login' });
  }

  if (
    sessionStore.hasSession &&
    !sessionStore.currentUser?.approved &&
    to.name != 'pendingPayment'
  ) {
    await router.push({ name: 'pendingPayment' });
  }

  if (
    sessionStore.hasSession &&
    sessionStore.currentUser?.approved &&
    !userHasPermission(String(to.meta?.permission)) &&
    to.name != 'home' &&
    to.name === 'pendingPayment'
  ) {
    await router.push({ name: 'home' });
  }

  if (
    sessionStore.hasSession &&
    to.name != 'applicationConfigurations' &&
    !sessionStore.hasApplicationConfigurations &&
    userHasPermission('application-configurations')
  ) {
    await router.push({ name: 'applicationConfigurations' });
  }
});

export default router;

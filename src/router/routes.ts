import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ApplicationConfigurationsView from '@/views/ApplicationConfigurationsView.vue';
import BranchesView from '@/views/BranchesView.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
      requiresApplicationConfigurations: true,
    },
  },
  {
    path: '/entrar',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/configuracoes-da-aplicacao',
    name: 'applicationConfigurations',
    component: ApplicationConfigurationsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/filiais',
    name: 'branches',
    component: BranchesView,
    meta: {
      requiresAuth: true,
    },
  },
];

export default routes;

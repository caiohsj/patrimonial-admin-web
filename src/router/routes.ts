import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ApplicationConfigurationsView from '@/views/ApplicationConfigurationsView.vue';
import BranchesView from '@/views/BranchesView.vue';
import CreateBranchesView from '@/views/CreateBranchesView.vue';
import EditBranchesView from '@/views/EditBranchesView.vue';
import PlacesView from '@/views/PlacesView.vue';
import CreatePlacesView from '@/views/CreatePlacesView.vue';
import EditPlacesView from '@/views/EditPlacesView.vue';
import AccountsView from '@/views/AccountsView.vue';
import CreateAccountsView from '@/views/CreateAccountsView.vue';
import EditAccountsView from '@/views/EditAccountsView.vue';
import CostCentersView from '@/views/CostCentersView.vue';
import CreateCostCentersView from '@/views/CreateCostCentersView.vue';
import EditCostCentersView from '@/views/EditCostCentersView.vue';
import CreateMaterialPossessionsView from '@/views/CreateMaterialPossessionsView.vue';
import BulkCreateMaterialPossessionsView from '@/views/BulkCreateMaterialPossessionsView.vue';
import MaterialPossessionsView from '@/views/MaterialPossessionsView.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
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
  {
    path: '/filiais/:id',
    name: 'editBranches',
    component: EditBranchesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/filiais/cadastro',
    name: 'createBranches',
    component: CreateBranchesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/locais',
    name: 'places',
    component: PlacesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/locais/:id',
    name: 'editPlaces',
    component: EditPlacesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/locais/cadastro',
    name: 'createPlaces',
    component: CreatePlacesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/contas',
    name: 'accounts',
    component: AccountsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/contas/:id',
    name: 'editAccounts',
    component: EditAccountsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/contas/cadastro',
    name: 'createAccount',
    component: CreateAccountsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/centros_de_custos',
    name: 'costCenters',
    component: CostCentersView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/centros_de_custos/cadastro',
    name: 'createCostCenters',
    component: CreateCostCentersView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/centros_de_custos/:id',
    name: 'editCostCenters',
    component: EditCostCentersView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/bens',
    name: 'materialPossessions',
    component: MaterialPossessionsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/bens/cadastro',
    name: 'createMaterialPossessions',
    component: CreateMaterialPossessionsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/bens/multiplo_cadastro',
    name: 'bulkCreateMaterialPossessions',
    component: BulkCreateMaterialPossessionsView,
    meta: {
      requiresAuth: true,
    },
  },
];

export default routes;

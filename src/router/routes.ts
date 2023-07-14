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
import RolesView from '@/views/RolesView.vue';
import CreateRolesView from '@/views/CreateRolesView.vue';
import UsersView from '@/views/UsersView.vue';
import CreateUsersView from '@/views/CreateUsersView.vue';
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
      permission: 'application-configurations',
    },
  },
  {
    path: '/filiais',
    name: 'branches',
    component: BranchesView,
    meta: {
      requiresAuth: true,
      permission: 'list-branches',
    },
  },
  {
    path: '/filiais/:id',
    name: 'editBranches',
    component: EditBranchesView,
    meta: {
      requiresAuth: true,
      permission: 'update-branches',
    },
  },
  {
    path: '/filiais/cadastro',
    name: 'createBranches',
    component: CreateBranchesView,
    meta: {
      requiresAuth: true,
      permission: 'create-branches',
    },
  },
  {
    path: '/locais',
    name: 'places',
    component: PlacesView,
    meta: {
      requiresAuth: true,
      permission: 'list-places',
    },
  },
  {
    path: '/locais/:id',
    name: 'editPlaces',
    component: EditPlacesView,
    meta: {
      requiresAuth: true,
      permission: 'update-places',
    },
  },
  {
    path: '/locais/cadastro',
    name: 'createPlaces',
    component: CreatePlacesView,
    meta: {
      requiresAuth: true,
      permission: 'create-places',
    },
  },
  {
    path: '/contas',
    name: 'accounts',
    component: AccountsView,
    meta: {
      requiresAuth: true,
      permission: 'list-accounts',
    },
  },
  {
    path: '/contas/:id',
    name: 'editAccounts',
    component: EditAccountsView,
    meta: {
      requiresAuth: true,
      permission: 'update-accounts',
    },
  },
  {
    path: '/contas/cadastro',
    name: 'createAccount',
    component: CreateAccountsView,
    meta: {
      requiresAuth: true,
      permission: 'create-accounts',
    },
  },
  {
    path: '/centros_de_custos',
    name: 'costCenters',
    component: CostCentersView,
    meta: {
      requiresAuth: true,
      permission: 'list-cost-centers',
    },
  },
  {
    path: '/centros_de_custos/cadastro',
    name: 'createCostCenters',
    component: CreateCostCentersView,
    meta: {
      requiresAuth: true,
      permission: 'create-cost-centers',
    },
  },
  {
    path: '/centros_de_custos/:id',
    name: 'editCostCenters',
    component: EditCostCentersView,
    meta: {
      requiresAuth: true,
      permission: 'update-cost-centers',
    },
  },
  {
    path: '/bens',
    name: 'materialPossessions',
    component: MaterialPossessionsView,
    meta: {
      requiresAuth: true,
      permission: 'list-material-possessions',
    },
  },
  {
    path: '/bens/cadastro',
    name: 'createMaterialPossessions',
    component: CreateMaterialPossessionsView,
    meta: {
      requiresAuth: true,
      permission: 'create-material-possessions',
    },
  },
  {
    path: '/bens/multiplo_cadastro',
    name: 'bulkCreateMaterialPossessions',
    component: BulkCreateMaterialPossessionsView,
    meta: {
      requiresAuth: true,
      permission: 'bulk-create-material-possessions',
    },
  },
  {
    path: '/cargos',
    name: 'roles',
    component: RolesView,
    meta: {
      requiresAuth: true,
      permission: 'list-roles',
    },
  },
  {
    path: '/cargos/cadastro',
    name: 'createRoles',
    component: CreateRolesView,
    meta: {
      requiresAuth: true,
      permission: 'create-roles',
    },
  },
  {
    path: '/usuarios',
    name: 'users',
    component: UsersView,
    meta: {
      requiresAuth: true,
      permission: 'create-roles',
    },
  },
  {
    path: '/usuarios/cadastro',
    name: 'createUsers',
    component: CreateUsersView,
    meta: {
      requiresAuth: true,
      permission: 'create-users',
    },
  },
];

export default routes;

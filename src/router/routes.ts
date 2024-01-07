import type { RouteRecordRaw } from 'vue-router';
import PendingPaymentView from '@/views/PendingPaymentView.vue';
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
import EditMaterialPossessionsView from '@/views/EditMaterialPossessionsView.vue';
import RolesView from '@/views/RolesView.vue';
import CreateRolesView from '@/views/CreateRolesView.vue';
import UsersView from '@/views/UsersView.vue';
import CreateUsersView from '@/views/CreateUsersView.vue';
import CreatePasswordView from '@/views/CreatePasswordView.vue';
import ShowMaterialPossessionsView from '@/views/ShowMaterialPossessionsView.vue';
import UserProfileView from '@/views/UserProfileView.vue';
import SettingsView from '@/views/SettingsView.vue';

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: () => ({ name: 'materialPossessions' }),
  },
  {
    path: '/pagamento_pendente',
    name: 'pendingPayment',
    component: PendingPaymentView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
    },
  },
  {
    path: '/entrar',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false,
      needsAppBar: true,
    },
  },
  {
    path: '/perfil',
    name: 'userProfile',
    component: UserProfileView,
    meta: {
      requiresAuth: true,
      needsAppBar: false,
    },
  },
  {
    path: '/configurações',
    name: 'settings',
    component: SettingsView,
    meta: {
      requiresAuth: true,
      needsAppBar: false,
    },
  },
  {
    path: '/configuracoes-da-aplicacao',
    name: 'applicationConfigurations',
    component: ApplicationConfigurationsView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'application-configurations',
    },
  },
  {
    path: '/filiais',
    name: 'branches',
    component: BranchesView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'list-branches',
    },
  },
  {
    path: '/filiais/:id',
    name: 'editBranches',
    component: EditBranchesView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'update-branches',
    },
  },
  {
    path: '/filiais/cadastro',
    name: 'createBranches',
    component: CreateBranchesView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'create-branches',
    },
  },
  {
    path: '/locais',
    name: 'places',
    component: PlacesView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'list-places',
    },
  },
  {
    path: '/locais/:id',
    name: 'editPlaces',
    component: EditPlacesView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'update-places',
    },
  },
  {
    path: '/locais/cadastro',
    name: 'createPlaces',
    component: CreatePlacesView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'create-places',
    },
  },
  {
    path: '/contas',
    name: 'accounts',
    component: AccountsView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'list-accounts',
    },
  },
  {
    path: '/contas/:id',
    name: 'editAccounts',
    component: EditAccountsView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'update-accounts',
    },
  },
  {
    path: '/contas/cadastro',
    name: 'createAccount',
    component: CreateAccountsView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'create-accounts',
    },
  },
  {
    path: '/centros_de_custos',
    name: 'costCenters',
    component: CostCentersView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'list-cost-centers',
    },
  },
  {
    path: '/centros_de_custos/cadastro',
    name: 'createCostCenters',
    component: CreateCostCentersView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'create-cost-centers',
    },
  },
  {
    path: '/centros_de_custos/:id',
    name: 'editCostCenters',
    component: EditCostCentersView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'update-cost-centers',
    },
  },
  {
    path: '/bens',
    name: 'materialPossessions',
    component: MaterialPossessionsView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'list-material-possessions',
    },
  },
  {
    path: '/bens/:id/edit',
    name: 'editMaterialPossessions',
    component: EditMaterialPossessionsView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'update-material-possessions',
    },
  },
  {
    path: '/bens/:id',
    name: 'showMaterialPossessions',
    component: ShowMaterialPossessionsView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'update-material-possessions',
    },
  },
  {
    path: '/bens/cadastro',
    name: 'createMaterialPossessions',
    component: CreateMaterialPossessionsView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'create-material-possessions',
    },
  },
  {
    path: '/bens/multiplo_cadastro',
    name: 'bulkCreateMaterialPossessions',
    component: BulkCreateMaterialPossessionsView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'bulk-create-material-possessions',
    },
  },
  {
    path: '/cargos',
    name: 'roles',
    component: RolesView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'list-roles',
    },
  },
  {
    path: '/cargos/cadastro',
    name: 'createRoles',
    component: CreateRolesView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'create-roles',
    },
  },
  {
    path: '/usuarios',
    name: 'users',
    component: UsersView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'create-roles',
    },
  },
  {
    path: '/usuarios/cadastro',
    name: 'createUsers',
    component: CreateUsersView,
    meta: {
      requiresAuth: true,
      needsAppBar: true,
      permission: 'create-users',
    },
  },
  {
    path: '/nova_senha',
    name: 'createPassword',
    component: CreatePasswordView,
  },
];

export default routes;

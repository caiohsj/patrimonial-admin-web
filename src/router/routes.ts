import LoginView from '@/views/LoginView.vue';
import SelectionOptionView from '@/views/SelectionOptionView.vue';

const routes = [
  { path: '/', redirect: '/entrar' },
  {
    path: '/entrar',
    name: 'login',
    component: LoginView,
  },
  { path: '/inicio', name: 'home', redirect: '/selecao' },
  {
    path: '/selecao',
    name: 'selectionOptions',
    component: SelectionOptionView,
  },
];

export default routes;

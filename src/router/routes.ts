import LoginView from '@/views/LoginView.vue';

const routes = [
  { path: '/', redirect: '/entrar' },
  {
    path: '/entrar',
    name: 'login',
    component: LoginView,
  },
];

export default routes;

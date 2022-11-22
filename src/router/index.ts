import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/Index.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/pages/Product.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
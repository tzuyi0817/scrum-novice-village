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
  {
    path: '/plan',
    name: 'plan',
    component: () => import('@/pages/Plan.vue')
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: () => import('@/pages/Inventory.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
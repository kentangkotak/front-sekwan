import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('layouts/v1/utama/IndexLayout.vue'),
    children: [
      { path: '',  redirect: '/dasboard' },
      {
        path: '/dasboard',
        name: 'dasboard',
        component: () =>
        import('pages/v1/DasboardPage.vue')
      },
      {
        path: '/anggotadewan',
        name: 'masteranggota',
        component: () =>
        import('pages/v1/master/anggotadewan/IndexLayout.vue')
      },
    ]
  },

  // {
  //   path: '/anggotadewan',
  //   name: 'masteranggota',
  //   component: () =>
  //   import('../pages/v1/master/anggotadewan/IndexLayout.vue')
  // },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/v1/FormLogin.vue'),
    // children: [
    //   { path: '', component: () => import('pages/IndexPage.vue') }
    // ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

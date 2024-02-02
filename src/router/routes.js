
const routes = [
  {
    path: '/',
    component: () => import('layouts/v1/utama/IndexLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  {
    path: '/Login',
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

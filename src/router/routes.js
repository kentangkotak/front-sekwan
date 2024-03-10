const routes = [
  {
    path: "/login",
    meta: { requireAuth: false },
    component: () => import("../layouts/v1/utama/FormLogin.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/",
    meta: { requireAuth: true },
    component: () => import("layouts/v1/utama/IndexLayout.vue"),
    children: [
      { path: "", redirect: "/dasboard" },
      {
        path: "/dasboard",
        meta: { requireAuth: true },
        name: "dasboard",
        component: () => import("pages/v1/DasboardPage.vue"),
      },
      {
        path: "/master/anggotadewan",
        meta: { requireAuth: true },
        name: "masteranggota",
        component: () => import("pages/v1/master/anggotadewan/IndexLayout.vue"),
      },
      {
        path: "/master/pendampingdewan",
        meta: { requireAuth: true },
        name: "masterpendamping",
        component: () => import("pages/v1/master/pendamping/IndexLayout.vue"),
      },
      {
        path: "/transaksi/perjalanandinas",
        meta: { requireAuth: true },
        name: "transperdin",
        component: () => import("pages/v1/transaksi/perdin/IndexLayout.vue"),
      },
    ],
  },

  // {
  //   path: '/anggotadewan',
  //   name: 'masteranggota',
  //   component: () =>
  //   import('../pages/v1/master/anggotadewan/IndexLayout.vue')
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

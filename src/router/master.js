const master = {
  path: "/master",
  component: () => import("pages/v1/utama"),
  children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
};

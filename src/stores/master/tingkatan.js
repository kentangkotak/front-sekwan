import { api } from "src/boot/axios";
import { defineStore } from "pinia";

export const useTingkatanStore = defineStore("master_tingkatan", {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    params: {
      q: "",
      page: 1,
      per_page: 10,
    },
    form: {},
  }),
  actions: {
    init() {
      this.getData();
    },
    async getData() {
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/indextingkat")
        .then((resp) => {
          this.loading = false;
          if (resp.status) {
            this.meta = resp.data;
            this.items = resp.data;
            this.meta.total = resp?.data.total;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});

import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePejabatstore = defineStore("master_pejabat", {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    params: {},
  }),
  actions: {
    init() {
      this.getData();
    },
    async getData() {
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/pejabat", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            //this.meta = resp.data;
            this.items = resp.data;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});

import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePesawatstore = defineStore("master_pesawat", {
  state: () => ({
    items: [],
    loading: false,
    params: {
      q: "",
      page: 1,
      per_page: 10,
      tujuan: null,
    },
  }),
  actions: {
    init() {
      this.getData();
    },
    async getData() {
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/pesawat", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp?.data;
            this.items = resp?.data?.data;
            this.meta.total = resp?.data?.total;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});

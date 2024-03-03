import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useJabatanStore = defineStore("master_jabatan", {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    params: {
      q: "",
      page: 1,
      per_page: 10,
      status: "all",
    },
    form: {},
    jabatan: {},
  }),
  actions: {
    async getData() {
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/indexjabatan", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp.data;
            this.items = resp.data.data;
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

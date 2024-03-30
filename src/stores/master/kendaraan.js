import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useJenisKendaraan = defineStore("master_kendaraan", {
  state: () => ({
    items: [],
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
      await api.get("/kendaraan", params).then((resp) => {
        this.loading = false;
        if (resp.status === 200) {
          this.items = resp.data;
        }
      });
    },
  },
});

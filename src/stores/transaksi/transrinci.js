import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useTranskRinci = defineStore("transaksi_rinci", {
  state: () => ({
    items: [],
    item: {},
    loading: false,
    params: {
      id: "",
      per_page: 1,
    },
  }),
  actions: {
    inittransrinci() {
      this.getDataTransRinci();
    },
    async getDataTransRinci() {
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/rinci", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            //this.meta = resp.data;
            console.log("asd", resp);
            this.items = resp?.data;
            console.log("asdfff", this.items);
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});

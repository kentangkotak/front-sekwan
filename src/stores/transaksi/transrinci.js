import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useTranskRinci = defineStore("transaksi_rinci", {
  state: () => ({
    items: [],
    item: {},
    loading: false,
    subtotal: 0,
    total_biaya: 0,
    params: {
      id: {},
      per_page: 1,
    },
  }),
  actions: {
    inittransrinci(val) {
      console.log("sa", val);
      this.params.id = val;
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
            console.log("asdfff", this.subtotal);
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    // computed: {
    //   total() {
    //     this.items.reduce((acc, item) => acc + item.total_biaya, 0);
    //     console.log("tot", item.total_biaya);
    //   },
    // },
  },
});

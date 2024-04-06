import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useTranskRinci = defineStore("transaksi_rinci", {
  state: () => ({
    items: [],
    item: {},
    totalall: [],
    loading: false,
    subtotal: 0,
    total_biaya: 0,
    params: {
      id: "",
      jb: "",
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
      console.log("jb", this.params.jb);
      console.log("id", this.params.id);
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
    async getDataTransRinciall() {
      console.log("jb", this.params.jb);
      console.log("id", this.params.id);
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/rinciall", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            //this.meta = resp.data;
            console.log("asd", resp);
            this.totalall = resp?.data;
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

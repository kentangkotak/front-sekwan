import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifSuccess } from "src/boot/notify-defaults";

export const usePropinsi = defineStore("master_propinsi", {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    // params: {
    //   q: "",
    //   page: 1,
    //   per_page: 10,
    //   status: "all",
    // },
    form: {
      id_propinsi: null,
    },
    propinsi: {},
    payloadx: {
      id: null,
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
        .get("/indexprov", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            //this.meta = resp.data;
            this.items = resp.data;
            console.log("testx", this.items);
            // this.items.unshift({
            //   komisi: "SEMUA",
            //   id: "",
            // });
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});

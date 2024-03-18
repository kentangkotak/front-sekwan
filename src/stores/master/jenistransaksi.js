import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifSuccess } from "src/boot/notify-defaults";

export const useJenisTransaksi = defineStore("master_jenistransaksi", {
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
        .get("/jenisbiaya", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            //this.meta = resp.data;
            this.items = resp.data;
            console.log("test", this.items);
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

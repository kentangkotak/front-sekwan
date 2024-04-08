import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifSuccess } from "src/boot/notify-defaults";
import { usePerdinStore } from "../transaksi/perdin";

export const useKotaKab = defineStore("master_kotakab", {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    params: {
      q: "",
      page: 1,
      per_page: 10,
      status: "all",
      id_propinsi: null,
    },
    form: {
      id_kota: null,
    },
    propinsi: {},
    namakota: null,
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
        .get("/indexkab", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            //this.meta = resp.data;
            this.items = resp.data;
            this.form.id_kota = resp?.data?.id;
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
    kirimpropinsix(val) {
      console.log("sa", val);
      if (val !== null) {
        this.params.id_propinsi = val;
        //store.form.id_kota = storekotakab.items[0];
      } else {
        // store.namakota = "-";
        // store.form.id_kota = "";
        this.params.id_propinsi = "";
        // store.form.nik = "";
        // store.form.biaya = 0;
      }
      this.init();
    },
  },
});

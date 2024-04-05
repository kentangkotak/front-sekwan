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
      const hiden = Object.keys(this.params);
      hiden.forEach((yangdihiden) => {
        if (
          this.params[yangdihiden] === null ||
          this.params[yangdihiden] === ""
        ) {
          delete this.params[yangdihiden];
          // console.log("wew", sasa);
          // console.log("isi nya", this.form[sasa]);
        }
      });
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/jenisbiaya", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            //this.meta = resp.data;
            this.items = resp?.data;
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

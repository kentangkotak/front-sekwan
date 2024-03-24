import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePerdinStore = defineStore("transaksi_perdin", {
  state: () => ({
    items: [],
    itemspermen: {},
    metapermen: {},
    meta: {},
    loading: false,
    params: {
      q: "",
      page: 1,
      per_page: 10,
      permen: "",
      id_propinsi: null,
    },
    paramspermen: {
      options: "",
      page: 1,
      per_page: 10,
    },
    form: {
      id_kota: null,
      id_jenistransaksi: null,
      dewan: null,
      permen: null,
    },
    jabatan: {},
  }),
  actions: {
    async getData() {
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/indexkab", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp.data;
            this.items = resp.data;
            this.meta.total = resp?.data.total;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    kirimpropinsi(val) {
      console.log("isi", val);
      this.params.id_propinsi = val.id;
      this.form.id_kota = null;
      console.log("sasasa", this.params.id_propinsi);
      this.getData();
    },
  },
});

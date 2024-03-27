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
    paramsbiaya: {
      tingkatan: "",
      golongan: "",
      id_propinsi: null,
      jenisbiaya: null,
    },
    form: {
      id_kota: null,
      id_jenistransaksi: null,
      dewan: null,
      permen: null,
      tingkatan: null,
      golongan: null,
      biaya: 0,
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
      //console.log("isi", val);
      this.params.id_propinsi = val?.id;
      this.form.id_kota = null;
      this.paramsbiaya.id_propinsi = val?.id;
      // console.log("sasasa", this.params.id_propinsi);
      this.getData();
      this.carijenisbiaya();
    },
    caritingkatdangol(val) {
      this.paramsbiaya.tingkatan = val?.tingkatan_id;
      this.paramsbiaya.golongan = val?.golongan_id;
      const jenisbiaya = this.paramsbiaya.jenisbiaya;
      this.carijenisbiaya(jenisbiaya);
    },
    carijenisbiaya(val) {
      this.paramsbiaya.jenisbiaya = val;
      if (val === 1) {
        this.getuangSaku();
      } else if (val === 2) {
        this.getPenginapan();
      }
    },
    async getuangSaku() {
      this.loading = true;
      const params = { params: this.paramsbiaya };
      // console.log("asdasdasdda", this.payloadbiaya);
      await api
        .get("/uangharian", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp.data;
            this.items = resp.data;
            this.meta.total = resp?.data.total;
            this.form.biaya = resp.data[0]?.biaya;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    async getPenginapan() {
      this.loading = true;
      const params = { params: this.paramsbiaya };
      // console.log("asdasdasdda", this.payloadbiaya);
      await api
        .get("/penginapan", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp.data;
            this.items = resp.data;
            this.meta.total = resp?.data.total;
            this.form.biaya = resp.data[0]?.biaya;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    async getTransport() {
      this.loading = true;
      const params = { params: this.paramsbiaya };
      // console.log("asdasdasdda", this.payloadbiaya);
      await api
        .get("/transport", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp.data;
            this.items = resp.data;
            this.meta.total = resp?.data.total;
            this.form.biaya = resp.data[0]?.biaya;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});

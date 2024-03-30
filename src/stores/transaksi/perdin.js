import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifErr, notifErrmodip } from "src/boot/notify-defaults";

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
      kota: null,
      provinsi: null,
      kendaraan: null,
    },
    paramspesawat: {
      tujuan: null,
      kelas: "",
    },
    form: {
      id_kota: null,
      id_jenistransaksi: null,
      dewan: null,
      permen: null,
      tingkatan: null,
      golongan: null,
      biaya: 0,
      id_jeniskendaraan: null,
      id_tujuanpesawat: null,
      kelas: null,
    },
    jabatan: {},
  }),
  actions: {
    initpropinsi() {
      this.form.id_kota = "-";
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
      this.initpropinsi();
      this.carijenisbiaya();
    },
    kirimkota(val) {
      this.paramsbiaya.kota = val?.id;
      //this.getTransport();
      this.carijenisbiaya();
    },
    kirimkendaraan(val) {
      this.paramsbiaya.kendaraan = val;
      // this.carijenisbiaya();
      this.getTransport();
    },
    caritingkatdangol(val) {
      this.paramsbiaya.tingkatan = val?.tingkatan_id;
      this.paramsbiaya.golongan = val?.golongan_id;
      const jenisbiaya = this.paramsbiaya.jenisbiaya;
      this.carijenisbiaya(jenisbiaya);
    },
    carijenisbiaya(val) {
      this.getData();
      this.paramsbiaya.jenisbiaya = val;
      if (val === 1) {
        this.getuangSaku();
      } else if (val === 2) {
        this.getPenginapan();
      } else if (val === 3) {
        if (this.form.id_kota === "-") {
          notifErrmodip("Kota Harus Dipilih...!!!");
          this.form.id_jenistransaksi = "";
        } else {
          this.getTransport();
        }
      } else if (val === 4) {
        this.initcaribiayapesawat();
      } else {
        this.caribiayataksi();
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
            // this.items = resp.data;
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
      // console.log("aaa", params);
      await api
        .get("/transport", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp.data;
            this.items = resp.data.data;
            this.meta.total = resp?.data.total;
            this.form.biaya = resp.data.data[0]?.biaya;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    initcaribiayapesawat() {
      this.paramspesawat.tujuan = this.form.id_tujuanpesawat;
      this.paramspesawat.kelas = this.form.kelas;
      console.log("sasa", this.paramspesawat.tujuan);
      this.caribiayapesawat();
    },
    async caribiayapesawat() {
      this.loading = true;
      const params = { params: this.paramspesawat };
      await api
        .get("/pesawat", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp.data;
            this.items = resp.data.data;
            this.meta.total = resp?.data.total;
            this.form.biaya =
              this.paramspesawat.kelas === null
                ? 0
                : this.paramspesawat.kelas === "Bisnis"
                ? this.items[0]?.bisnis
                : this.items[0]?.ekonomi;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    async caribiayataksi() {
      this.loading = true;
      const params = { params: this.paramsbiaya };
      await api
        .get("/taksi", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp.data;
            this.items = resp.data.data;
            this.meta.total = resp?.data.total;
            this.form.biaya = resp.data.data[0]?.biaya;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});

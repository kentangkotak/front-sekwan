import { defineStore } from "pinia";
import { date } from "quasar";
import { api } from "src/boot/axios";
import {
  notifErr,
  notifErrmodip,
  notifSuccess,
} from "src/boot/notify-defaults";
import { useAnggotaDewanStore } from "../master/anggotadewan";
import { useTranskRinci } from "./transrinci";
import { useGetBiaya } from "./getbiaya";

export const usePerdinStore = defineStore("transaksi_perdin", {
  state: () => ({
    items: [],
    itemspermen: {},
    metapermen: {},
    meta: {},
    metaperdin: {},
    loading: false,
    disabled: false,
    total: 0,
    nik: "",
    biaya: 0,
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
      id: null,
      notrans: null,
      tanggal: Date.now(),
      id_kota: null,
      namakota: null,
      id_jenistransaksi: "",
      tingkatan: null,
      golongan: null,
      biaya: 0,
      id_jeniskendaraan: null,
      id_tujuanpesawat: null,
      kelas: null,
      kuantitas: 1,
      lamaperdin: "",
      judul: "",
      id_propinsi: null,
      koderekekning: null,
      uraian50: null,
      total_biaya: null,
      jabatan: "",
      nik: "",
    },
    itemsrincian: [],
    jabatan: {},
    payloadx: {
      id: null,
    },
  }),
  actions: {
    initpropinsi() {
      this.namakota = "-";
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
            this.meta = resp?.data;
            this.items = resp?.data;
            this.meta.total = resp?.data?.total;
            // this.form.biaya = 0;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    kirimpropinsi(val, x) {
      this.params.id_propinsi = val;
      this.paramsbiaya.id_propinsi = val;
      // console.log("ijin", x);
      if (x === 1) {
        this.initpropinsi();
        this.cleargantiprovinsi();
        this.carijenisbiaya();
      } else {
        this.getData();
      }
    },
    kirimkota(val) {
      this.paramsbiaya.kota = val?.id;
      this.form.id_kota = val?.id;
      //this.getTransport();
      // this.carijenisbiaya();
    },
    kirimkendaraan(val) {
      this.paramsbiaya.kendaraan = val;
      // this.carijenisbiaya();
      this.getTransport();
    },

    carijenisbiaya(val) {
      // this.getData();
      //this.clearpilihjenisbiaya();
      this.paramsbiaya.jenisbiaya = val;
      this.form.biaya = 0;
      const kodepropinsi = this.paramsbiaya.id_propinsi;
      const storedewan = useAnggotaDewanStore();
      const fielddewan = storedewan.form.id_dewan;

      if (val === 1) {
        if (fielddewan === null) {
          notifErrmodip("Propinsi && Anggota Dewan Tidak Boleh Kosong...!!!");
          this.form.id_jenistransaksi = "";
        } else {
          //this.kirimpropinsi(kodepropinsi, 2);
          this.getuangSaku();
        }
      } else if (val === 2) {
        if (fielddewan === null) {
          notifErrmodip("Propinsi Tidak Boleh Kosong...!!!");
          this.form.id_jenistransaksi = "";
        } else {
          //this.kirimpropinsi(kodepropinsi, 2);
          this.getPenginapan();
        }
      } else if (val === 3) {
        if (this.form.id_kota === null) {
          notifErrmodip("Kota Harus Dipilih...!!!");
          this.form.id_jenistransaksi = "";
        }
        // else {
        //   this.getTransport();
        // }
      } else if (val === 4) {
        this.initcaribiayapesawat();
      } else if (val === 5) {
        this.caribiayataksi();
      }
    },
    // async getuangSaku() {
    //   this.loading = true;
    //   const params = { params: this.paramsbiaya };
    //   // console.log("asdasdasdda", this.payloadbiaya);
    //   await api
    //     .get("/uangharian", params)
    //     .then((resp) => {
    //       this.loading = false;
    //       if (resp.status === 200) {
    //         this.meta = resp?.data;
    //         this.items = resp?.data;
    //         this.meta.total = resp?.data?.total;
    //         this.form.biaya = resp?.data[0]?.biaya ?? 0;
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.loading = false;
    //     });
    // },
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
            this.meta.total = resp?.data?.total;
            this.form.biaya = resp?.data[0]?.biaya ?? 0;
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
            this.meta = resp?.data;
            this.items = resp?.data?.data;
            this.meta.total = resp?.data?.total;
            if (
              resp?.data?.data[0]?.biaya === "0.00" ||
              resp?.data?.data[0]?.biaya === null ||
              resp?.data?.data[0]?.biaya === ""
            ) {
              notifErrmodip(
                "Tidak Ada Biaya Untuk Tujuan Deangan Menggunakan Model Kendaraan Ini...!!!"
              );
              this.form.biaya = 0;
            } else {
              this.form.biaya = resp?.data.data[0]?.biaya;
            }
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
            this.items = resp.data?.data;
            this.meta.total = resp?.data?.total;
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
    initgehedertransaksi(val) {
      if (val) {
        this.params.q = val;
      }
      this.gethedertransaksi();
    },
    async gethedertransaksi() {
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
        .get("/index", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.metaperdin = resp?.data;
            this.items = resp.data?.data;
            this.meta.total = resp?.data?.total;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    refreshTable() {
      this.params.page = 1;
      this.gethedertransaksi();
    },
    setPerPage(payload) {
      this.params.per_page = payload;
      this.gethedertransaksi();
    },
    setPage(payload) {
      this.params.page = payload;
      this.gethedertransaksi();
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
            this.items = resp.data?.data;
            this.meta.total = resp?.data.total;
            this.form.biaya = resp?.data?.data[0]?.biaya;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    formattanggal() {
      const sekarang = Date.now();
      this.form.tanggal = date.formatDate(sekarang, "YYYY-MM-DD");
    },
    simpantransaksi() {
      this.form.total_biaya = this.form.biaya * this.form.kuantitas;
      if (this.form.judul === "") {
        notifErrmodip("Judul Harus Di Isi ...!!!");
      } else if (this.form.koderekekning === "") {
        notifErrmodip("Kode Rekening Harus Di Isi ...!!!");
      } else {
        const wew = Object.keys(this.form);
        wew.forEach((sasa) => {
          if (this.form[sasa] === null) {
            delete this.form[sasa];
            // console.log("wew", sasa);
            // console.log("isi nya", this.form[sasa]);
          }
        });
        // console.log("aaaaaaaaaaaaaaaaa", this.form);
        this.loading = true;
        api
          .post("/store", this.form)
          .then((resp) => {
            this.loading = false;
            // this.clear();
            if (resp.status === 200) {
              notifSuccess(resp);
              this.itemsrincian = resp?.data;
              this.form.notrans = resp?.data?.header?.no_transaksi;
              this.form.id = resp?.data?.header?.id;
              const storerinci = useTranskRinci();
              storerinci.params.id = this.form.id;
              storerinci.getDataTransRinci();
              storerinci.getDataTransRinciall();
              this.disabled = true;
              this.cleartransrinci();
              this.gethedertransaksi();
              // this.init();
            }
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
            notifErr(err);
          });
      }
    },
    cleargantiprovinsi() {
      this.form.id_kota = null;
      this.namakota = "-";
      this.form.id_jenistransaksi = null;
      const storedewan = useAnggotaDewanStore();
      storedewan.form.id_dewan = null;
      this.paramsbiaya.golongan = null;
      this.paramsbiaya.tingkatan = null;
    },
    clearpilihjenisbiaya() {
      this.form.dewan = null;
      this.form.biaya = null;
    },
    cleartransrinci() {
      this.form.nik = "";
      this.nik = "";
      this.biaya = 0;
      this.form.biaya = 0;
      this.form.total_biaya = 0;
      this.form.id_jeniskendaraan = "";
      const storebiaya = useGetBiaya();
      storebiaya.form.biaya = 0;
    },
  },
});

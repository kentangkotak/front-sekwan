import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifErr, notifSuccess } from "src/boot/notify-defaults";

export const useAnggotaDewanStore = defineStore("master_anggota_dewan", {
  state: () => ({
    isOpen: false,
    items: [],
    meta: {},
    loading: false,
    params: {
      q: "",
      page: 1,
      per_page: 10,
      id_flag_pegawai: "1",
    },
    form: {
      //nik: null,
      id_flag_pegawai: "1",
      id_jabatan: null,
      id_komisi: null,
      komisi_id: "1",
    },
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
        .get("/indexdewan", params)
        .then((resp) => {
          // console.log('sasasa', resp)
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp.data;
            this.items = resp.data.data;
            this.meta.total = resp?.data.total;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    simpandewan() {
      this.loading = true;
      //console.log("asu", this.form);
      api
        .post("/storedewan", this.form)
        .then((resp) => {
          //console.log('sasasa', resp)
          this.loading = false;
          this.clear();
          if (resp.status === 200) {
            notifSuccess(resp);
            this.init();
            console.log("OK");
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          notifErr(err);
        });
    },
    clear() {
      this.form.nik = "";
      this.form.nama = "";
      this.form.alamat = "";
      this.form.kelamin = "";
    },
    hapusDewan() {
      this.loading = true;
      console.log(this.payloadx);
      api
        .post("/deletedewan", this.payloadx)
        .then((resp) => {
          //console.log('sasasa', resp)
          this.loading = false;
          this.clear();
          if (resp.status === 200) {
            notifSuccess(resp);
            this.getData();
            console.log("OK");
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          notifErr(err);
        });
    },
    setQ(val) {
      this.params.page = 1;
      this.params.q = val;
      this.getData();
    },
    setFilters() {
      this.filters = !this.filters;
    },
    filterData(val) {
      this.params.page = 1;
      const { q } = val; // status
      //  this.params.to = to
      //  this.params.from = from
      this.params.q = q;
      //  this.params.status = status
      //this.setCustom()
      this.getData();
      // console.log(val)
    },
    refreshTable() {
      this.params.page = 1;
      this.getData();
    },
    setPerPage(payload) {
      this.params.per_page = payload;
      this.getData();
    },
    setPage(payload) {
      this.params.page = payload;
      this.getData();
    },
    setJabatan(val) {
      this.params.jabatan = val;
      this.getJabatan();
    },
    lemparDewan(payload) {
      this.payloadx.id = payload;
      this.hapusDewan();
    },
    async getJabatan() {
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/v1/simrs/rajal/poli/kunjunganpoli", params)
        .then((resp) => {
          // console.log('kunjungan poli', resp)
          this.loading = false;
          // if (resp.status === 200) {
          //   this.meta = resp.data
          //   this.items = resp.data.data
          // }
          // ini yang baru
          if (resp.status === 200) {
            this.meta = resp.data.table;
            this.items = resp.data.table.data;
            this.meta.total = resp?.data.total;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    gantikomisi(val) {
      this.params.komisi_id = val;
      this.getData();
    },
  },
});

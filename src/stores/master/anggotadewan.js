import { defineStore } from "pinia";
import { api } from "src/boot/axios";

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
      status: "all",
    },
    form: {},
    id_jabatan: null,
    filters: false,
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
      console.log("asu", this.form);
      api
        .post("/storedewan", this.form)
        .then((resp) => {
          //console.log('sasasa', resp)
          this.loading = false;
          this.clear();
          if (resp.status === 200) {
            this.init();
            console.log("OK");
          }
        })
        .catch((err) => {
          alert("Data Gagal Tersimpan");
          console.log(err);
          this.loading = false;
        });
    },
    clear() {
      this.form.nik = "";
      this.form.nama = "";
      this.form.alamat = "";
      this.form.kelamin = "";
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
  },
});

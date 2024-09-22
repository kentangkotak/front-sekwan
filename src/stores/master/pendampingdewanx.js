import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifErr, notifSuccess } from "src/boot/notify-defaults";

export const usePendampingDewanStorex = defineStore("pendamping_dewanx", {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    dialog: false,
    params: {
      q: "",
      page: 1,
      per_page: 5,
      id_flag_pegawai: "2",
      komisi_id: "",
    },
    form: {
      id_flag_pegawai: "2",
      id_komisi: null,
      id_jabatan: "3",
      komisi_id: "1",
      golongan_id: "",
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
    simpanpedamping() {
      this.loading = true;
      api
        .post("/storedewan", this.form)
        .then((resp) => {
          this.clear;
          this.loading = false;
          if (resp.status === 200) {
            notifSuccess(resp);
            this.init();
          }
        })
        .catch((err) => {
          console.log(err);
          // this.loading = false;
          notifErr(err);
        });
    },
    hapusDewan() {
      this.loading = true;
      api
        .post("/deletedewan", this.payloadx)
        .then((resp) => {
          this.loading = false;
          this.params.page = 1;
          if (resp.status === 200) {
            notifSuccess(resp);
            this.getData();
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          notifErr(err);
        });
    },
    editdewan(val) {
      console.log("aaa", val);
      // this.loading = true;
      api
        .post("/updatedewan", this.form)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            notifSuccess(resp);
            this.init();
          }
        })
        .catch((err) => {
          console.log(err);
          // this.loading = false;
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
    clear() {
      this.form.id = "";
      this.form.nik = "";
      this.form.nama = "";
      this.form.alamat = "";
      this.form.kelamin = "";
      this.form.golongan_id = "";
    },
    filterData(val) {
      this.params.page = 1;
      const { q } = val; // status
      this.params.q = q;
      this.getData();
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
    gantikomisi(val) {
      console.log("komisi", val);
      this.params.komisi_id = val;
      this.getData();
    },
    lemparDewan(payload) {
      this.payloadx.id = payload;
      this.hapusDewan();
    },
  },
});

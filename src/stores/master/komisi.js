import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifSuccess } from "src/boot/notify-defaults";

export const useKomisiStore = defineStore("master_komisi", {
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
        .get("/indexkomisi", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp.data;
            this.items = resp.data.data;
            this.meta.total = resp?.data.total;
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
    simpankomisi() {
      this.loading = true;
      api
        .post("/storekomisi", this.form)
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
    hapuskomisi() {
      this.loading = true;
      api
        .post("/deletekomisi", this.payloadx)
        .then((resp) => {
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
          notifErr(err);
        });
    },
    editkomisi(val) {
      console.log("aaa", val);
      this.loading = true;
      api
        .post("/updatekomisi", this.form)
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
    gantikomisi(val) {
      console.log("val", val);
      store.params.komisi_id = val.id;
      store.init();
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
    lemparkomisi(payload) {
      console.log("sasasa", payload);
      this.payloadx.id = payload;
      this.hapuskomisi();
    },
    clear() {
      this.form.id = "";
      this.form.komisi = "";
    },
  },
});

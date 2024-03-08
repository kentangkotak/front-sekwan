import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { notifErr, notifSuccess } from "src/boot/notify-defaults";

export const usePendampingDewanStore = defineStore("master_pedamping_dewan", {
  state: () => ({
    isOpen: false,
    items: [],
    meta: {},
    loading: false,
    params: {
      q: "",
      page: 1,
      per_page: 10,
      id_flag_pegawai: "2",
    },
    form: {
      id_flag_pegawai: "2",
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
          // console.log("sasasa", resp);
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
      api.post("/storedewan", this.form).then((resp) => {
        console.log("sasasa", resp);
        this.loading = false;
        if (resp.status === 200) {
          notifSuccess(resp);
          this.init();
        }
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
    gantikomisi(val) {
      console.log("as", val);
      this.params.komisi_id = val;
      this.getData();
    },
  },
});

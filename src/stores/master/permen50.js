import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePermenStore = defineStore("master_permen", {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    kode: {},
    koderekening: {},
    params: {
      uraian: "",
      // kode: "",
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
    init(val) {
      //console.log("wew", val);
      this.kode = null;
      this.koderekening = null;
      if (val) {
        this.params.uraian = val;
      }
      this.getData();
    },
    caripermen(val) {
      console.log("a", val);
      this.koderekening = null;
      if (val) {
        this.kode = val?.uraian;
        this.koderekening = val?.kodeall;
        this.getData();
      }
    },
    async getData() {
      this.loading = true;
      const params = { params: this.params };
      await api.get("/indexkepmen", params).then((resp) => {
        this.loading = false;
        if (resp.status === 200) {
          this.meta = resp.data;
          this.items = resp.data.data;
        }
      });
    },
  },
});

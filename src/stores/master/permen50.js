import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { usePerdinStore } from "../transaksi/perdin";

export const usePermenStore = defineStore("master_permen", {
  state: () => ({
    items: [],
    meta: {},
    loading: false,
    kode: {},
    koderekening: {},
    params: {
      uraian: "",
      kode: "",
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
      console.log("a", val);
      this.koderekening = null;
      if (val) {
        this.kode = val?.uraian;
        this.koderekening = val?.kodeall;
        const transperdin = usePerdinStore();
        transperdin.form.koderekekning = val?.kodeall;
        this.getData();
      }
    },
    async getData() {
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
      await api.get("/indexkepmen", params).then((resp) => {
        this.loading = false;
        if (resp.status === 200) {
          this.meta = resp?.data;
          this.items = resp?.data?.data;
        }
      });
    },
  },
});

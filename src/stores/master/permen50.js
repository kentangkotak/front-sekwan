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

      this.koderekening = null;
      console.log("a", val);
      if (val) {
        this.kode = val?.uraian;
        this.koderekening = val?.kodeall;
        const transperdin = usePerdinStore();
        transperdin.form.koderekekning = val?.kodeall;
        transperdin.form.uraian50 = val?.uraian;
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
          // this.kode = this.items.map((el) => el.kodeall == "5.1.02.04.01.0005");
          // console.log("a", this.kode);
          // this.kode = resp?.data?.data[0]?.uraian;
          // const store = usePerdinStore();
          // store.form.koderekekning = resp?.data?.data[0]?.kodeall;
        }
      });
    },
  },
});

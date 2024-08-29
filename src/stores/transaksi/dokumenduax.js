import { defineStore } from "pinia";
import { date } from "quasar";
import { api } from "src/boot/axios";

export const useDokumenduax = defineStore("dokumen-duax", {
  state: () => ({
    items: [],
    loading: false,
    tanggal: "",
    params: {
      nospj: "",
    },
  }),
  actions: {
    init() {
      this.getperdinbynospj();
    },
    async getperdinbynospj() {
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/getperdinbynospj", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            const val = resp.data;
            const xxx = [];
            val?.forEach((x) => {
              this.tanggal = Date(x?.tanggal);
              const koderekx = x?.rekening50;
              const rekex = x?.uraian50;
              const total = x?.rinci.reduce(
                (total, curr) => parseInt(total) + parseInt(curr.total_biaya),
                0
              );
              const hasils = {
                koderek: koderekx,
                uraian: rekex,
                ls: total,
              };
              xxx.push(hasils);
              console.log("sa", this.items);
            });
            this.items = xxx;
            console.log("sa", this.items);
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});

import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { filterDuplicateArrays } from "src/modules/utils";

export const useDokumenEmpat = defineStore("dokumen-empat", {
  state: () => ({
    items: [],
    Loading: false,
    mjenistrans: "",
    params: {
      nospj: "",
    },
  }),
  actions: {
    init() {
      this.getperdinbynospj4();
    },
    async getperdinbynospj4() {
      this.loading = true;
      const params = { params: this.params };
      await api
        .get("/getperdinbynospj", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            const val = resp.data;
            this.penjabaran(val);
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    penjabaran(val) {
      console.log("asli", val);
      const jenistransaksi = [];
      val.forEach((x) => {
        const rinci = x.rinci;
        rinci.forEach((y) => {
          const kdtrans = y.jenisbiaya;
          const biaya = y.biaya;
          const lamahari = y.berapa_kali;

          kdtrans.forEach((c) => {
            const kodetrans = c.id;
            const namatrans = c.name;

            const mjenisbiaya = {
              kodetrans,
              namatrans,
              biaya,
              lamahari,
              jumlah: 1,
            };
            jenistransaksi.push(mjenisbiaya);
            const subtotal = console.log(jenistransaksi);
          });
        });
      });
    },
  },
});

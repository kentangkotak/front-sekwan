import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { usePerdinStore } from "./perdin";

export const useGetBiaya = defineStore("master_getbiaya", {
  state: () => ({
    items: [],
    loading: false,
    params: {
      q: "",
      page: 1,
      per_page: 10,
    },
    paramsbiaya: {
      tingkatan: "",
      golongan: "",
      id_propinsi: null,
      jenisbiaya: null,
      kota: null,
      provinsi: null,
      kendaraan: null,
    },
    form: {
      biaya: 0,
    },
  }),
  actions: {
    async getuangSaku() {
      this.loading = true;
      const params = { params: this.paramsbiaya };
      await api
        .get("/uangharian", params)
        .then((resp) => {
          this.loading = false;
          if (resp.status === 200) {
            this.meta = resp?.data;
            this.items = resp?.data;
            this.meta.total = resp?.data?.total;
            this.form.biaya = resp?.data[0]?.biaya ?? 0;
            const biayasimpan = usePerdinStore();
            biayasimpan.form.biaya = this.form.biaya;
            console.log("get", this.form.biaya);
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});

<template>
  <div>
    <div class="row justify-center" style="font-size: xx-large">
      --<b
        >Total = Rp
        {{
          rupiah(
            storerinci.totalall.reduce(
              (total, curr) => (total = total + parseInt(curr.total_biaya)),
              0
            )
          )
        }}</b
      >--
    </div>
    <div class="row justify-center" style="align-items: center">
      <q-btn
        label="TAMBAH"
        color="orange"
        @click="formrinci(storerinci.params.jb)"
      >
      </q-btn>
    </div>
    <form-rincianpage
      v-model="storebiaya.formrincian"
      :id_propinsi="storeheder.form.id_propinsi"
      :id_jeniskendaraan="storejeniskendaraan.items"
    />
  </div>
</template>
<script setup>
import { notifErrmodip } from "src/boot/notify-defaults";
import { useGetBiaya } from "src/stores/transaksi/getbiaya";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { useTranskRinci } from "src/stores/transaksi/transrinci";
import { onMounted } from "vue";
import FormRincianpage from "./FormRincianpage.vue";
import { useJenisKendaraan } from "src/stores/master/kendaraan";

const storerinci = useTranskRinci();
const storeheder = usePerdinStore();
const storebiaya = useGetBiaya();
const storejeniskendaraan = useJenisKendaraan();

const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function formrinci(val) {
  if (storeheder.form.tanggal === "" || storeheder.form.tanggal === null) {
    notifErrmodip("Tanggal Tidak Boleh Kosong...!!!");
  } else if (
    parseInt(storeheder.form.lamaperdin) < 1 ||
    storebiaya.form.lamaperdin === "" ||
    storebiaya.form.lamaperdin === null
  ) {
    notifErrmodip("Lama Perdin Salah...!!!");
  } else if (
    storeheder.form.koderekekning === null ||
    storeheder.form.koderekekning === ""
  ) {
    notifErrmodip("Kode Rekening Tidak Boleh Kosong...!!!");
  } else if (
    storeheder.form.id_propinsi === null ||
    storeheder.form.id_propinsi === ""
  ) {
    notifErrmodip("Provinsi Tidak Boleh Kosong...!!!");
  } else {
    storebiaya.paramsbiaya.jenisbiaya = val;
    storebiaya.formrincian = true;
    // if (val === 1) {
    //   console.log("asdasdadasdasdas", val);
    //   storebiaya.paramsbiaya.jenisbiaya = val;
    //   storebiaya.formrincian = true;
    //   console.log("wew", storebiaya.formrincian);
    // } else if (val === 2) {
    //   storebiaya.paramsbiaya.jenisbiaya = val;
    //   storebiaya.formrincian = true;
    //   console.log("wew", storebiaya.formrincian);
    // } else if (val === 3) {
    //   storebiaya.paramsbiaya.jenisbiaya = val;
    //   storebiaya.formrincian = true;
    //   console.log("wew", storebiaya.formrincian);
    // } else if (val === 4) {
    //   storebiaya.paramsbiaya.jenisbiaya = val;
    //   storebiaya.formrincian = true;
    //   console.log("wew", storebiaya.formrincian);
    // } else if (val === 5) {
    //   storebiaya.paramsbiaya.jenisbiaya = val;
    //   storebiaya.formrincian = true;
    //   console.log("wew", storebiaya.formrincian);
    // }
  }
}

onMounted(() => {
  storerinci.getDataTransRinciall();
  storejeniskendaraan.getData();
});
</script>

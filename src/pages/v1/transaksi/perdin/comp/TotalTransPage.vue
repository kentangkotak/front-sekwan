<template>
  <div>
    <div class="row justify-center" style="font-size: xx-large">
      --<b
        >Total = Rp.
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
    <div class="row justify-center q-pa-md q-gutter-sm">
      <q-btn
        fab
        icon="add"
        label="TAMBAH"
        color="orange"
        @click="formrinci(storerinci.params.jb)"
      >
      </q-btn>

      <q-fab color="orange" push icon="print" label="Cetak" direction="right">
        <q-fab-action
          color="amber"
          @click="cetak(0)"
          icon="mail"
          label="Cover"
        />
        <q-fab-action
          color="secondary"
          @click="cetak(1)"
          icon="mail"
          label="Page 1"
        />
        <q-fab-action
          color="secondary"
          @click="cetak(2)"
          icon="mail"
          label="Page 2"
        />
        <q-fab-action
          color="primary"
          @click="cetak(3)"
          icon="airplay"
          label="Page 3"
        />
        <q-fab-action
          color="primary"
          @click="cetak(4)"
          icon="airplay"
          label="Page 4"
        />
      </q-fab>
    </div>
    <form-rincianpage
      v-model="storebiaya.formrincian"
      :id_propinsi="storeheder.form.id_propinsi"
      :id_jeniskendaraan="storejeniskendaraan.items"
      :pesawat="storepesawat.items"
    />
    <cetak-page
      v-model="dialogcetak"
      :modelcetak="modelcetak"
      :jenistransaksi="jenistransaksi"
    />
  </div>
</template>
<script setup>
import { notifErrmodip } from "src/boot/notify-defaults";
import { useGetBiaya } from "src/stores/transaksi/getbiaya";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { useTranskRinci } from "src/stores/transaksi/transrinci";
import { onMounted, ref } from "vue";
import FormRincianpage from "./FormRincianpage.vue";
import CetakPage from "../cetak/CetakPage.vue";
import { useJenisKendaraan } from "src/stores/master/kendaraan";
import { usePesawatstore } from "src/stores/master/pesawat";
import { store } from "quasar/wrappers";

const storerinci = useTranskRinci();
const storeheder = usePerdinStore();
const storebiaya = useGetBiaya();
const storejeniskendaraan = useJenisKendaraan();
const storepesawat = usePesawatstore();

const modelcetak = ref();

const props = defineProps({
  jenistransaksi: { type: Object },
});

const dialogcetak = ref(false);
const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function formrinci(val) {
  if (storeheder.form.tanggal === "" || storeheder.form.tanggal === null) {
    notifErrmodip("Tanggal Tidak Boleh Kosong...!!!");
  } else if (
    storeheder.form.tanggalsampai === "" ||
    storeheder.form.tanggalsampai === null
  ) {
    notifErrmodip("Tanggal Sampai Tidak Boleh Kosong...!!!");
  } else if (storeheder.form.tanggalsampai < storeheder.form.tanggal) {
    notifErrmodip(
      "Tanggal Sampai Lebih Kecil Daripada Tanggal Berangkat....!!!"
    );
  } else if (storeheder.form.judul === "" || storeheder.form.judul === null) {
    notifErrmodip("Judul Tidak Boleh Kosong...!!!");
  } else if (
    storeheder.form.instansi_tujuan === "" ||
    storeheder.form.instansi_tujuan === null
  ) {
    notifErrmodip("Instansi Yang Dituju Tidak Boleh Kosong...!!!");
  } else if (storeheder.form.komisi === "" || storeheder.form.komisi === null) {
    notifErrmodip("Komisi Tidak Boleh Kosong...!!!");
  } else if (
    storeheder.form.id_propinsi === null ||
    storeheder.form.id_propinsi === ""
  ) {
    notifErrmodip("Provinsi Tidak Boleh Kosong...!!!");
  } else {
    storebiaya.paramsbiaya.jenisbiaya = val;
    storebiaya.formrincian = true;
    console.log("komisi", storeheder.form.komisi);
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

function cetak(val) {
  modelcetak.value = val;
  dialogcetak.value = true;
}

onMounted(() => {
  storerinci.getDataTransRinciall();
  storejeniskendaraan.getData();
  storepesawat.init();
});
</script>

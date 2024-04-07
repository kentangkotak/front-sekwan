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

const storerinci = useTranskRinci();
const storeheder = usePerdinStore();
const storebiaya = useGetBiaya();

const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function formrinci(val) {
  if (storeheder.form.id_propinsi === null) {
    notifErrmodip("Provinsi Tidak Boleh Kosong...!!!");
  } else {
    if (val === 1) {
      console.log("asdasdadasdasdas", val);
      storebiaya.paramsbiaya.jenisbiaya = val;
      storebiaya.formrincian = true;
      console.log("wew", storebiaya.formrincian);
    } else if (val === 2) {
      storebiaya.paramsbiaya.jenisbiaya = val;
      storebiaya.formrincian = true;
      console.log("wew", storebiaya.formrincian);
    }
  }
}

onMounted(() => {
  storerinci.getDataTransRinciall();
});
</script>

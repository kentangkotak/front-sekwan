<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-btn-toggle
        v-model="wew"
        spread
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="indigo"
        color="white"
        text-color="primary"
        :options="jenistransaksix"
        @update:model-value="formrinci"
      />
    </div>
  </div>
  <form-rincianpage v-model="storebiaya.formrincian" />
</template>
<script setup>
import { ref } from "vue";
import FormRincianpage from "./FormRincianpage.vue";
import { useGetBiaya } from "src/stores/transaksi/getbiaya";
import { notifErrmodip } from "src/boot/notify-defaults";
import { usePerdinStore } from "src/stores/transaksi/perdin";

const storebiaya = useGetBiaya();
const transheder = usePerdinStore();
const wew = ref("");

console.log("wew", wew);

const props = defineProps({
  jenistransaksi: { type: Object },
});
const jenistransaksix = props.jenistransaksi.map((x) => ({
  label: x.name,
  value: x.id,
  ref: null,
}));

function formrinci(val) {
  console.log("wew", val);
  if (transheder.form.id_propinsi === null) {
    notifErrmodip("Provinsi Tidak Boleh Kosong...!!!");
  } else {
    if (val === 1) {
      storebiaya.paramsbiaya.jenisbiaya = val;
      storebiaya.formrincian = true;
    } else if (val === 2) {
      storebiaya.paramsbiaya.jenisbiaya = val;
      storebiaya.formrincian = true;
    }
  }
}
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>

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
        @update:model-value="gridrinci"
      />
    </div>
  </div>

  <grid-trans-comp />
  <!-- <form-rincianpage v-model="storebiaya.formrincian" /> -->
</template>
<script setup>
import { onMounted, ref } from "vue";
import FormRincianpage from "./FormRincianpage.vue";
import GridTransComp from "./GridTransComp.vue";
import { useGetBiaya } from "src/stores/transaksi/getbiaya";
import { notifErrmodip } from "src/boot/notify-defaults";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { useTranskRinci } from "src/stores/transaksi/transrinci";

const storebiaya = useGetBiaya();
const transheder = usePerdinStore();
const storerinci = useTranskRinci();
const wew = ref(1);

const props = defineProps({
  jenistransaksi: { type: Object },
});
const jenistransaksix = props.jenistransaksi.map((x) => ({
  label: x.name,
  value: x.id,
  slot: x.id,
}));

function gridrinci(val) {
  if (val === 1) {
    storerinci.params.jb = val;
    transheder.form.id_jenistransaksi = val;
    storerinci.getDataTransRinci();
  } else if (val === 2) {
    storebiaya.params.jb = val;
    transheder.form.id_jenistransaksi = val;
    storerinci.getDataTransRinci();

    //storebiaya.formrincian = true;
  }
}

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

onMounted(() => {
  storerinci.params.jb = wew;
  storerinci.getDataTransRinci();
  // storerinci.getDataTransRinciall();
});
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>

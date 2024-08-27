<template>
  <q-dialog
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-white">
      <div class="row justify-end">
        <q-space />
        <q-btn
          unelevated
          round
          size="sm"
          icon="print"
          ref="refPrint"
          v-print="printObj"
        >
          <q-tooltip class="primary"> Print </q-tooltip>
        </q-btn>
        <q-btn color="black" dense flat icon="close" v-close-popup>
          <q-tooltip class="primary">Close</q-tooltip>
        </q-btn>
      </div>
      <q-separator />
      <div id="printMe" class="full-width">
        <div v-if="modelcetak === 0"><CoverPage /></div>
        <div v-else-if="modelcetak === 2"><ModelDuaxPage /></div>
        <div v-else>
          <KopSuratPage />
          <div v-if="modelcetak === 1">
            <ModelSatuPage />
          </div>
          <div v-if="modelcetak === 3">
            <ModelDuaPage :jenistransaksi="jenistransaksi" />
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import KopSuratPage from "./comp/KopSuratPage.vue";
import ModelSatuPage from "./ModelSatuPage.vue";
import ModelDuaPage from "./ModelDuaPage.vue";
import CoverPage from "./CoverPage.vue";
import ModelDuaxPage from "./ModelDuaxPage.vue";
import { ref } from "vue";

const maximizedToggle = ref(true);

// const printObj = {
//   id: "printMe",
//   popTitle: "Halaman1",
// };

const props = defineProps({
  modelcetak: { type: Number },
  maximized: { type: Boolean },
  jenistransaksi: { type: Object },
});

const printObj = {
  id: "printMe",
  popTitle: "Sekretariat DPRD Kota Probolinggo",
};
</script>

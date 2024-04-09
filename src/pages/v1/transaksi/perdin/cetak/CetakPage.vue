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
        <q-btn unelevated round size="sm" icon="print">
          <q-tooltip class="primary" :offset="[10, 10]"> Print </q-tooltip>
        </q-btn>
        <q-btn color="black" dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-black">Close</q-tooltip>
        </q-btn>
      </div>
      <q-separator />

      <KopSuratPage />
      <div v-if="modelcetak === 1">
        <ModelSatuPage />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import KopSuratPage from "./comp/KopSuratPage.vue";
import ModelSatuPage from "./ModelSatuPage.vue";
import ModelDuaPage from "./ModelDuaPage.vue";
import { ref } from "vue";

const maximizedToggle = ref(true);

// const printObj = {
//   id: "printMe",
//   popTitle: "Halaman1",
// };

const props = defineProps({
  modelcetak: { type: Number },
  maximized: { type: Boolean },
});
</script>

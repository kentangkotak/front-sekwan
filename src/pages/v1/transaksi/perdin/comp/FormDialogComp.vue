<template>
  <q-dialog
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-white">
      <q-bar class="bg-indigo">
        <q-space />
        <q-btn
          color="orange"
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          color="orange"
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn color="orange" dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <HederDialogComp
        :propinsi="strorepropinsi.items"
        :permen="storepermen.items"
      />

      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" flat bordered style="width: 100%">
          <q-card-section horizontal>
            <q-card-section style="width: 30%">
              <RinciDialogComp
                :jenistransaksi="storejenistrans.items"
                :anggotadewan="storedewan.items"
              />
            </q-card-section>
            <q-separator vertical />

            <GridTransComp />
          </q-card-section>
        </q-card>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useJenisTransaksi } from "src/stores/master/jenistransaksi";
import { usePropinsi } from "src/stores/master/propinsi";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { ref, watchEffect } from "vue";
import HederDialogComp from "./HederDialogComp.vue";
import GridTransComp from "./GridTransComp.vue";
import RinciDialogComp from "./RinciDialog.Comp.vue";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { usePermenStore } from "src/stores/master/permen50";
//import { useQuasar } from "quasar";
//import { store } from "quasar/wrappers";

const maximizedToggle = ref(true);
const storejenistrans = useJenisTransaksi();
const strorepropinsi = usePropinsi();
const storedewan = useAnggotaDewanStore();
const storepermen = usePermenStore();
const store = usePerdinStore();

const date = ref("YYYY");
const slide = ref("style");
// watchEffect(() => {
//   console.log("asasaa", penyimpanan.form.id_komisi);
// });

storejenistrans.init();
strorepropinsi.init();
storedewan.init();
storepermen.init();
</script>

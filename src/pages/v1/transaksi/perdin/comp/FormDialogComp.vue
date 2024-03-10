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

      <q-card-section>
        <div class="text-h6 absolute-center">
          <b><u>FORM PERJALANAN DINAS</u></b>
        </div>
      </q-card-section>
      <div
        style="border: solid; border-color: black; margin-top: -150px"
        class="row absolute-center"
      >
        <q-card-section class="q-pt-none">
          <div>
            <q-input label="No. Transaksi" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>
            <q-input label="Tanggal" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>
            <q-input label="No. SPM" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>
            <q-input label="Kode Kegiatan" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>
            <q-input label="Kegiatan" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>
            <q-input label="Kode Rekening Obyek" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>
            <q-input label="Tujuan" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>
            <q-input label="Lama/Hari" />
          </div>
        </q-card-section>
      </div>
      <q-card-actions>
        <q-btn
          v-if="!store.form.id"
          v-model="store.form.id"
          label="SIMPAN"
          class="bg-orange"
          :loading="store.loading"
          @click="store.editdewan"
        />
        <q-btn
          v-else
          v-model="store.form.id"
          label="UPDATE DATA"
          class="bg-orange"
          :loading="store.loading"
          @click="store.editdewan(store.form.id)"
          v-close-popup
        />
        <!-- <q-btn
          label="coba"
          class="bg-orange"
          :loading="penyimpanan.loading"
          @click="coba()"
        /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
//import { defaults } from "autoprefixer";
import { usePendampingDewanStore } from "src/stores/master/pendampingdewan";
import { ref, watchEffect } from "vue";
//import { useQuasar } from "quasar";
//import { store } from "quasar/wrappers";

const maximizedToggle = ref(true);
const store = usePendampingDewanStore();
const props = defineProps({
  komisi: { type: Array, default: () => [] },
});

// watchEffect(() => {
//   console.log("asasaa", penyimpanan.form.id_komisi);
// });
</script>

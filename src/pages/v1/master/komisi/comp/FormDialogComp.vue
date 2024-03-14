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
        <div class="text-h6 center">
          <b><u>FORM INPUT KOMISI</u></b>
        </div>
      </q-card-section>
      <div style="border-right-style: solid; border-color: black">
        <q-card-section class="q-pt-none">
          <div>
            <q-input
              v-model="store.form.komisi"
              label="Nama Komisi"
              :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
            />
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
          @click="store.simpankomisi()"
        />
        <q-btn
          v-else
          v-model="store.form.id"
          label="SIMPAN EDIT"
          class="bg-orange"
          :loading="store.loading"
          @click="store.editkomisi(store.form.id)"
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
import { useKomisiStore } from "src/stores/master/komisi";
import { ref, watchEffect } from "vue";

const maximizedToggle = ref(true);
const store = useKomisiStore();

// watchEffect(() => {
//   console.log("asasaa", penyimpanan.form.id_komisi);
// });
</script>

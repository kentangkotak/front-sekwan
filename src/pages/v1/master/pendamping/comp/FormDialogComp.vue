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
          <b><u>FORM INPUT ANGGOTA DEWAN</u></b>
        </div>
      </q-card-section>
      <div style="border-right-style: solid; border-color: black">
        <q-card-section class="q-pt-none">
          <div>
            <q-input
              v-model="store.form.nik"
              label="Nik"
              :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
            />
          </div>
          <div>
            <q-input
              v-model="store.form.nama"
              label="Nama"
              :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
            />
          </div>
          <div>
            <q-item-label>Kelamin</q-item-label>
            <q-radio
              v-model="store.form.jns_kelamin"
              name="kelamin"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="L"
              label="Laki_laki"
            />
            <q-radio
              v-model="store.form.jns_kelamin"
              name="kelamin"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="P"
              label="Perempuan"
            />
          </div>
          <div>
            <q-input
              v-model="store.form.alamat"
              label="Alamat"
              :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
            />
          </div>
          <div>
            <q-select
              v-model="store.form.id_komisi"
              :options="komisi"
              option-label="komisi"
              option-value="id"
              label="Komisi"
              emit-value
              map-options
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

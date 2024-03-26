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
              v-model="penyimpanan.form.nik"
              label="Nik"
              :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
            />
          </div>
          <div>
            <q-input
              v-model="penyimpanan.form.nama"
              label="Nama"
              :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
            />
          </div>
          <div>
            <q-item-label>Kelamin</q-item-label>
            <q-radio
              v-model="penyimpanan.form.jns_kelamin"
              name="kelamin"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="L"
              label="Laki_laki"
            />
            <q-radio
              v-model="penyimpanan.form.jns_kelamin"
              name="kelamin"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="P"
              label="Perempuan"
            />
          </div>
          <div>
            <q-input
              v-model="penyimpanan.form.alamat"
              label="Alamat"
              :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
            />
          </div>
          <div>
            <q-select
              v-model="penyimpanan.form.id_jabatan"
              :options="jabatan"
              option-label="jenis"
              option-value="id"
              emit-value
              map-options
              label="Jabatan"
            />
          </div>
          <div>
            <q-select
              v-model="penyimpanan.form.id_komisi"
              :options="komisi"
              option-label="komisi"
              option-value="id"
              label="Komisi"
              emit-value
              map-options
            />
          </div>
          <div>
            <q-select
              v-model="penyimpanan.form.golongan_id"
              :options="golongan"
              label="Golongan"
              option-label="name"
              option-value="id"
              emit-value
              map-options
            />
          </div>
          <div>
            <q-select
              v-model="penyimpanan.form.tingkatan_id"
              :options="tingkatan"
              label="Tingkatan"
              option-label="name"
              option-value="id"
              emit-value
              map-options
            />
          </div>
        </q-card-section>
      </div>
      <q-card-actions>
        <q-btn
          v-if="!penyimpanan.form.id"
          v-model="penyimpanan.form.id"
          label="SIMPAN"
          class="bg-orange"
          :loading="penyimpanan.loading"
          @click="penyimpanan.simpandewan()"
        />
        <q-btn
          v-else
          v-model="penyimpanan.form.id"
          label="SIMPAN EDIT"
          class="bg-orange"
          :loading="penyimpanan.loading"
          @click="penyimpanan.editdewan(penyimpanan.form.id)"
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
import { defaults } from "autoprefixer";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { ref, watchEffect } from "vue";
import { useQuasar } from "quasar";
import { store } from "quasar/wrappers";

const maximizedToggle = ref(true);
const penyimpanan = useAnggotaDewanStore();
// const kelamin = ref("Laki_laki");
// const id_jabatan = ref(2);
// const id_komisi = ref();
// const id_flag_pegawai = ref(1);

// function setjabatan(val) {
//   console.log("isix", val);
//   penyimpanan.form.id_jabatan = val.id;
// }

function setkomisi(val) {
  console.log("isi", val);
  penyimpanan.form.id_komisi = val.id;
}

const props = defineProps({
  jabatan: { type: Array, default: () => [] },
  komisi: { type: Array, default: () => [] },
  golongan: { type: Array, default: () => [] },
  tingkatan: { type: Array, default: () => [] },
  //dewanbyid: { type: Array, default: () => [] },
});
const wew = ref(props.komisi);

// watchEffect(() => {
//   console.log("asasaa", penyimpanan.form.id_komisi);
// });
</script>

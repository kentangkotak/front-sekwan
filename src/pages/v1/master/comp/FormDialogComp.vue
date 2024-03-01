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

          <q-btn color="orange" dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn color="orange" dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn color="orange" dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

          <q-card-section>
            <div class="text-h6"><U>FORM INPUT ANGGOTA DEWAN</U></div>
          </q-card-section>
          <div style="border-right-style: solid;border-color:black;">
            <q-card-section class="q-pt-none">
              <div>
                <q-input
                  v-model="penyimpanan.form.nik"
                  label="Nik"
                />
              </div>
              <div>
                <q-input
                  v-model="penyimpanan.form.nama"
                  label="Nama"
                />
              </div>
              <div>
                <q-item-label>Kelamin</q-item-label>
                <q-radio
                  v-model="penyimpanan.form.kelamin"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="L"
                  label="Laki_laki"
                />
                <q-radio
                  v-model="penyimpanan.form.kelamin"
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
                />
              </div>
              <div>
                <q-input
                  v-model="penyimpanan.form.jabatan"
                  label="Jabatan"
                />
              </div>
              <div>
                <q-input
                  v-model="penyimpanan.form.komisi"
                  label="Komisi"
                />
              </div>
            </q-card-section>
          </div>
        <q-card-actions>
          <q-btn
          label="SIMPAN"
          class="bg-orange"
          :loading="penyimpanan.loading"
          @click="penyimpanan.simpandewan()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
<script setup>
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { ref } from "vue";

const maximizedToggle= ref(true)
const penyimpanan = useAnggotaDewanStore()
const kelamin = ref('L')
console.log('wewewew',kelamin)



function coba() {
  console.log(penyimpanan.form)
}
</script>

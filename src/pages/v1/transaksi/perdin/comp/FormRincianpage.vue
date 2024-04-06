<template>
  <q-dialog v-model="fixed">
    <q-card v-if="storebiaya.paramsbiaya.jenisbiaya === 1" style="width: 100%">
      <q-card-section>
        <div class="text-h6">UANG HARIAN PERJALANAN DINAS</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="width: 100%; height: 50%" class="scroll">
        <q-card-section>
          <q-select
            v-model="store.nik"
            style="margin-bottom: 5px"
            outlined
            :options="storedewan.items"
            option-label="nama"
            option-value="nik"
            label="Anggota Dewan/Pendamping"
            transition-show="scale"
            transition-hide="scale"
            clearable
            use-input
            @input-value="storedewan.init"
            @update:model-value="caritingkatdangol"
          >
            <template #option="scope">
              <q-item v-bind="scope.itemProps"
                ><q-item-section avatar>
                  <q-item-label
                    ><q-avatar
                      v-if="scope.opt.jns_kelamin === 'P'"
                      glossy
                      size="40px"
                      class="overlapping"
                    >
                      <img src="../../../../../assets/images/female.svg" />
                    </q-avatar>
                    <q-avatar v-else size="40px" class="overlapping" glossy
                      ><img src="../../../../../assets/images/male.svg"
                    /></q-avatar>
                    NIK : {{ scope.opt.nik }} <br />
                    Nama : {{ scope.opt.nama }} ({{ scope.opt.jabatan.jenis }}
                    {{ scope.opt.komisi.komisi }})<br />
                    Status :
                    {{ scope.opt.flag_pegawai.nama }}<br />
                    Alamat : {{ scope.opt.alamat }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input
            v-model="store.biaya"
            style="margin-bottom: 5px"
            outlined
            label="Biaya..."
            disable
            input-class="text-right"
            :model-value="storebiaya.form.biaya"
          />
          <q-input
            v-model="storetransheder.form.kuantitas"
            type="number"
            style="margin-bottom: 5px"
            outlined
            label="Kuantitas"
          />
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn color="orange" label="SIMPAN" @click="store.simpantransaksi()" />
        <q-btn color="orange" label="KELUAR" v-close-popup />
      </q-card-actions>
    </q-card>

    <q-card v-if="storebiaya.paramsbiaya.jenisbiaya === 2" style="width: 100%">
      <q-card-section>
        <div class="text-h6">UANG PENGINAPAN</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-select
          v-model="store.nik"
          style="margin-bottom: 5px"
          outlined
          :options="storedewan.items"
          option-label="nama"
          option-value="nik"
          label="Anggota Dewan/Pendamping"
          transition-show="scale"
          transition-hide="scale"
          clearable
          use-input
          @input-value="storedewan.init"
          @update:model-value="caritingkatdangol"
        >
          <template #option="scope">
            <q-item v-bind="scope.itemProps"
              ><q-item-section avatar>
                <q-item-label
                  ><q-avatar
                    v-if="scope.opt.jns_kelamin === 'P'"
                    glossy
                    size="40px"
                    class="overlapping"
                  >
                    <img src="../../../../../assets/images/female.svg" />
                  </q-avatar>
                  <q-avatar v-else size="40px" class="overlapping" glossy
                    ><img src="../../../../../assets/images/male.svg"
                  /></q-avatar>
                  NIK : {{ scope.opt.nik }} <br />
                  Nama : {{ scope.opt.nama }} ({{ scope.opt.jabatan.jenis }}
                  {{ scope.opt.komisi.komisi }})<br />
                  Status :
                  {{ scope.opt.flag_pegawai.nama }}<br />
                  Alamat : {{ scope.opt.alamat }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          v-model="store.biaya"
          style="margin-bottom: 5px"
          outlined
          label="Biaya..."
          disable
          input-class="text-right"
          :model-value="storebiaya.form.biaya"
        />
        <q-input
          v-model="storetransheder.form.kuantitas"
          type="number"
          style="margin-bottom: 5px"
          outlined
          label="Kuantitas"
        />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn color="orange" label="SIMPAN" @click="store.simpantransaksi()" />
        <q-btn color="orange" label="KELUAR" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
// import { store } from "quasar/wrappers";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { useKotaKab } from "src/stores/master/kotakab";
import { useGetBiaya } from "src/stores/transaksi/getbiaya";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { ref } from "vue";

const nik = ref();
const fixed = ref(false);
const storebiaya = useGetBiaya();
const storekotakab = useKotaKab();
const storetransheder = usePerdinStore();
const store = usePerdinStore();

const storedewan = useAnggotaDewanStore();

function caritingkatdangol(val) {
  console.log("sasa", val?.id_jabatan);
  storebiaya.paramsbiaya.tingkatan = val?.tingkatan?.id;
  storebiaya.paramsbiaya.golongan = val?.golongan?.id;
  storebiaya.paramsbiaya.id_propinsi = storekotakab.params.id_propinsi;
  store.form.nik = val?.nik;
  store.form.jabatan = val?.id_jabatan;
  store.form.tingkatan = val?.tingkatan?.id;
  store.form.golongan = val?.golongan?.id;
  storebiaya.getuangSaku();
}
</script>

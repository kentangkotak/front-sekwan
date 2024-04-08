<template>
  <q-dialog v-model="fixed">
    <q-card v-if="storebiaya.paramsbiaya.jenisbiaya === 1" style="width: 100%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 items-center">UANG HARIAN PERJALANAN DINAS</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
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
      </q-card-actions>
    </q-card>

    <q-card v-if="storebiaya.paramsbiaya.jenisbiaya === 2" style="width: 100%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">UANG PENGINAPAN</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
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
      </q-card-actions>
    </q-card>

    <q-card v-if="storebiaya.paramsbiaya.jenisbiaya === 3" style="width: 100%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">BIAYA TRANSPORTASI PERJALANAN DINAS</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
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
        <q-select
          v-model="store.form.id_jeniskendaraan"
          :options="id_jeniskendaraan"
          option-label="name"
          option-value="id"
          emit-value
          map-options
          transition-show="scale"
          transition-hide="scale"
          outlined
          label="Jenis Kendaraan"
          @update:model-value="(val) => kirimkendaraan(val)"
        />
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
      </q-card-actions>
    </q-card>

    <q-card v-if="storebiaya.paramsbiaya.jenisbiaya === 4" style="width: 100%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">BIAYA PESAWAT</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
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

        <q-select
          v-model="store.form.id_tujuanpesawat"
          style="margin-bottom: 5px; visibility: visible"
          :options="pesawat"
          option-label="tujuan"
          option-value="id"
          transition-show="scale"
          transition-hide="scale"
          emit-value
          map-options
          outlined
          label="Tujuan Peswat..."
          @update:model-value="initcaribiayapesawat"
        />

        <q-select
          v-model="store.form.kelas"
          style="margin-bottom: 5px; visibility: visible"
          :options="kelas"
          transition-show="scale"
          transition-hide="scale"
          emit-value
          map-options
          outlined
          label="Kelas..."
          @update:model-value="initcaribiayapesawat"
        />

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
      </q-card-actions>
    </q-card>

    <q-card v-if="storebiaya.paramsbiaya.jenisbiaya === 5" style="width: 100%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">BIAYA TAKSI</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
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
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
// import { store } from "quasar/wrappers";
import { notifErrmodip } from "src/boot/notify-defaults";
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

const kelas = ref(["Bisnis", "Ekonomi"]);

const props = defineProps({
  id_propinsi: { type: Number },
  id_jeniskendaraan: { type: Array, default: () => [] },
  pesawat: { type: Array, default: () => [] },
});

function caritingkatdangol(val) {
  storebiaya.paramsbiaya.tingkatan = val?.tingkatan?.id;
  storebiaya.paramsbiaya.golongan = val?.golongan?.id;
  storebiaya.paramsbiaya.id_propinsi = props.id_propinsi;
  store.form.nik = val?.nik;
  store.form.jabatan = val?.id_jabatan;
  store.form.tingkatan = val?.tingkatan?.id;
  store.form.golongan = val?.golongan?.id;
  if (storebiaya.paramsbiaya.jenisbiaya === 1) {
    storebiaya.getuangSaku();
  } else if (storebiaya.paramsbiaya.jenisbiaya === 2) {
    storebiaya.getuangPenginapan();
  }
}

function kirimkendaraan(val) {
  console.log("idkota", store.form.id_kota);
  if (store.form.id_propinsi === null || store.form.id_propinsi === "") {
    notifErrmodip("Provinsi Harus Diisi...!!!");
  } else if (store.form.id_kota === null || store.form.id_kota === "") {
    notifErrmodip("Kota Harus Diisi...!!!");
  } else {
    storebiaya.paramsbiaya.kendaraan = val;
    storebiaya.paramsbiaya.kota = store.form.id_kota;
    // this.carijenisbiaya();
    storebiaya.getTransport();
  }
}

function initcaribiayapesawat(val) {
  console.log("wew", val);
  if (store.form.nik === null || store.form.nik === "") {
    notifErrmodip("Dewan/Pedamping Harus Diisi...!!!");
    storebiaya.paramspesawat.tujuan = "";
    store.form.id_tujuanpesawat = "";
  } else if (
    store.form.id_tujuanpesawat === null ||
    store.form.id_tujuanpesawat === ""
  ) {
    notifErrmodip("Dewan/Pedamping Harus Diisi...!!!");
    storebiaya.paramspesawat.kelas = "";
    store.form.kelas = "";
  } else {
    if (val === "Bisnis" || val === "Ekonomi") {
      storebiaya.paramspesawat.kelas = val;
      store.form.kelas = val;
    } else {
      storebiaya.paramspesawat.tujuan = val;
      store.form.id_tujuanpesawat = val;
    }

    if (
      storebiaya.paramspesawat.tujuan === "" ||
      storebiaya.paramspesawat.kelas === ""
    ) {
    } else {
      storebiaya.caribiayapesawat();
    }
  }
}
</script>

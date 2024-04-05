<template>
  <div>
    <q-card-section>
      <q-select
        v-model="nik"
        style="margin-bottom: 5px"
        outlined
        :options="dewan.items"
        option-label="nama"
        option-value="nik"
        label="Anggota Dewan/Pendamping"
        transition-show="scale"
        transition-hide="scale"
        clearable
        use-input
        @input-value="dewan.init"
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
        v-model="store.form.id_jenistransaksi"
        style="margin-bottom: 5px"
        outlined
        :options="jenistransaksi"
        option-label="name"
        option-value="id"
        label="Jenis Transaksi"
        transition-show="scale"
        transition-hide="scale"
        emit-value
        map-options
        @update:model-value="(val) => carijenisbiaya(val)"
      />
      <!-- <app-autocomplete
        label="Pilih Anggota Dewan"
        style="margin-bottom: 5px; background-color: white"
        :source="anggotadewan"
        :option-label="(source) => [anggotadewan]"
        option-value="nik"
        @selected="pilih"
        value-field="icon"
      /> -->

      <q-select
        v-if="store.form.id_jenistransaksi !== 3"
        v-model="store.form.id_jeniskendaraanx"
        style="display: none"
      />
      <q-select
        v-else
        v-model="store.form.id_jeniskendaraan"
        :options="store.form.id_jeniskendaraan"
        option-label="name"
        option-value="id"
        emit-value
        map-options
        transition-show="scale"
        transition-hide="scale"
        style="margin-bottom: 5px; visibility: visible"
        outlined
        label="Jenis Kendaraan"
        @update:model-value="(val) => store.kirimkendaraan(val)"
      />

      <q-select
        v-if="store.form.id_jenistransaksi !== 4"
        v-model="store.form.id_tujuanpesawatx"
        style="display: none"
      />
      <q-select
        v-else
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
        @update:model-value="store.initcaribiayapesawat()"
      />

      <q-select
        v-if="store.form.id_jenistransaksi !== 4"
        v-model="store.form.kelasx"
        style="display: none"
      />
      <q-select
        v-else
        v-model="store.form.kelas"
        style="margin-bottom: 5px; visibility: visible"
        :options="kelas"
        transition-show="scale"
        transition-hide="scale"
        emit-value
        map-options
        outlined
        label="Kelas..."
        @update:model-value="store.initcaribiayapesawat()"
      />

      <q-input
        v-model="store.form.biaya"
        style="margin-bottom: 5px"
        outlined
        label="Biaya..."
        disable
        input-class="text-right"
        :model-value="storegetbiaya.form.biaya"
      />
      <q-input
        v-model="store.form.kuantitas"
        type="number"
        style="margin-bottom: 5px"
        outlined
        label="Kuantitas"
      />
      <q-btn color="orange" label="SIMPAN" @click="store.simpantransaksi()" />
    </q-card-section>
  </div>
</template>

<script setup>
import { notifErrmodip } from "src/boot/notify-defaults";
import AppAutocomplete from "src/components/~global/AppAutocomplete.vue";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { useGetBiaya } from "src/stores/transaksi/getbiaya";
import { ref } from "vue";

const storegetbiaya = useGetBiaya();
const store = usePerdinStore();
const props = defineProps({
  jenistransaksi: { type: Array, default: () => [] },
  anggotadewan: {
    type: Array,
    default: () => [],
  },
  propinsi: { type: Array, default: () => [] },
  jeniskendaraan: { type: Array, default: () => [] },
  pesawat: { type: Array, default: () => [] },
});
const jenistransaksi_s = ref("");
const nik = ref("");
function carijenisbiaya(val) {
  if (val?.id === 1) {
    if (store.form.nik === null || store.form.nik === "") {
      notifErrmodip("Anggota Dewan/Pedamping Harus Diisi...!!!");
      store.form.id_jenistransaksi = "";
    } else {
      storegetbiaya.paramsbiaya.id_propinsi = store.form.id_propinsi;
      store.form.id_jenistransaksi = val?.id;
      storegetbiaya.getuangSaku();
    }
  }
}

function caritingkatdangol(val) {
  store.form.id_jenistransaksi = "";
  storegetbiaya.form.biaya = 0;
  if (store.form.id_propinsi === null) {
    notifErrmodip("Provinsi Tidak Boleh Kosong...!!!");
    store.form.nik = "";
  } else {
    storegetbiaya.paramsbiaya.golongan = val?.golongan_id;
    storegetbiaya.paramsbiaya.tingkatan = val?.tingkatan_id;
    store.form.nik = val?.nik;
  }
}
// const stringOptions = props.anggotadewan;
// const options = ref(stringOptions);

// function filterFn(val, update) {
//   if (val === "") {
//     update(() => {
//       options.value = stringOptions;

//       // here you have access to "ref" which
//       // is the Vue reference of the QSelect
//     });
//     return;
//   }
//   update(() => {
//     const needle = val.toLowerCase();

//     options.value = stringOptions.filter(
//       (v) =>
//         v.nama.toString().toLowerCase().indexOf(needle) > -1 ||
//         v.nik.toString().toLowerCase().indexOf(needle) > -1
//     );
//     // console.log("sasa", v);
//   });
// }

const kelas = ref(["Bisnis", "Ekonomi"]);
const scope = ref();
const dewan = useAnggotaDewanStore();

// const q = computed({
//   get() {
//     return props.search;
//   },
//   set(newVal) {
//     emits("setSearch", newVal);
//   },
// });
// const options = ref(null);
// const dewan = useAnggotaDewanStore();

// async function fetchData() {
//   const respon = dewan.items;
//   console.log("wew", respon);
//   options.value = await respon.json();
// }

// fetchData();
const id_propinsi = props;

function caritingkatdangolx(val) {
  if (store.form.id_propinsi === null) {
    notifErrmodip("Provinsi Tidak Boleh Kosong...!!!");
    dewan.form.id_dewan = "";
    store.form.nik = "";
    store.form.id_jenistransaksi = "";
    store.form.biaya = 0;
    store.paramsbiaya.tingkatan = "";
    store.paramsbiaya.golongan = "";
    store.form.tingkatan = "";
    store.form.golongan = "";
    store.form.jabatan = "";
  } else {
    store.form.nik = val?.nik;
    store.form.id_jenistransaksi = "";
    store.form.biaya = 0;
    store.paramsbiaya.tingkatan = val?.tingkatan_id;
    store.paramsbiaya.golongan = val?.golongan_id;
    store.form.tingkatan = val?.tingkatan_id;
    store.form.golongan = val?.golongan_id;
    store.form.jabatan = val?.id_jabatan;
  }

  // const idbiaya = store.paramsbiaya.jenisbiaya;
  // store.carijenisbiaya(idbiaya);
  // store.getuangSaku();
  // const jenisbiaya = this.paramsbiaya.jenisbiaya;
  // this.carijenisbiaya(jenisbiaya);
}
</script>

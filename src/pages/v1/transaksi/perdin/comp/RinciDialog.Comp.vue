<template>
  <div>
    <q-card-section>
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
        @update:model-value="store.carijenisbiaya"
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
        v-model="dewan.dewan"
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
        @update:model-value="store.caritingkatdangol"
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
        v-model="store.form.biaya"
        style="margin-bottom: 5px"
        outlined
        label="Biaya..."
        disable
      />
      <q-input style="margin-bottom: 5px" outlined label="Kuantitas" />
      <q-input style="margin-bottom: 5px" outlined label="No. Transaksi" />
    </q-card-section>
  </div>
  {{ store.items[0]?.biaya }}
</template>

<script setup>
import AppAutocomplete from "src/components/~global/AppAutocomplete.vue";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { ref } from "vue";

const store = usePerdinStore();
const props = defineProps({
  jenistransaksi: { type: Array, default: () => [] },
  anggotadewan: {
    type: Array,
    default: () => [],
  },
  propinsi: { type: Array, default: () => [] },
});
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
console.log("sa", id_propinsi);

function carijenisbiaya(val) {
  const id_jenistransaksi = store.form.id_jenistransaksi;
  const id_tingkatan = val?.tingkatan_id;

  if (val === 1) {
    console.log("sa", tingkatan);
  }
}

const filteredOptions = ref({});
</script>

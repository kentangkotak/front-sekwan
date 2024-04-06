<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card flat bordered class="my-card" style="width: 100%">
      <q-card-section style="margin-bottom: 10px; margin-top: 10px">
        <div v-if="maxx === true" class="text-h4 absolute-center">
          <b>FORM PERJALANAN DINAS</b>
        </div>
        <div v-else class="text-h10 absolute-center">
          <b>FORM PERJALANAN DINAS</b>
        </div>
      </q-card-section>

      <q-separator inset />
      <q-card-section
        horizontal
        style="margin-top: 10px; margin-left: 5px; margin-bottom: 10px"
      >
        <q-input
          v-model="store.form.notrans"
          style="margin-right: 5px; width: 25%"
          outlined
          label="No. Transaksi"
          disable
        />
        <q-input
          outlined
          v-model="store.form.tanggal"
          label="Tanggal"
          style="margin-right: 5px; width: 25%"
          :disable="store.disabled"
          :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="store.form.tanggal" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="store.form.lamaperdin"
          style="margin-right: 5px; width: 25%"
          outlined
          label="Lama PerDin"
          type="number"
          :disable="store.disabled"
          :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
        />

        <q-input
          v-model="store.form.judul"
          style="margin-right: 5px; width: 25%"
          outlined
          label="Judul"
          :disable="store.disabled"
          :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
        />
      </q-card-section>

      <q-card-section
        horizontal
        style="margin-top: 10px; margin-left: 5px; margin-bottom: 10px"
      >
        <q-input
          v-model="store.form.koderekekning"
          style="margin-right: 5px; width: 25%"
          outlined
          disable
          label="Kode Rekening 50"
        />

        <q-select
          v-model="storepermen.kode"
          :options="storepermen.items"
          option-label="uraian"
          option-value="kodeall"
          style="margin-right: 5px; width: 25%"
          outlined
          label="Uraian Rekening 50"
          clearable
          use-input
          hide-bottom-space
          behavior="menu"
          hide-dropdown-icon
          :disable="store.disabled"
          @input-value="storepermen.init"
          @update:model-value="storepermen.caripermen"
          :rules="[(val) => !!val || 'Tidak Boleh Kosong...!!!']"
        >
          <template #option="scope">
            <q-item v-bind="scope.itemProps"
              ><q-item-section avatar>
                <q-item-label>
                  KODE REKENING : {{ scope.opt.kodeall }} <br />
                  URAIAN : {{ scope.opt.uraian }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          v-model="store.form.id_propinsi"
          style="margin-right: 5px; width: 25%"
          :options="options"
          option-label="name"
          option-value="id"
          outlined
          label="Tujuan Propinsi"
          transition-show="scale"
          transition-hide="scale"
          emit-value
          map-options
          clearable
          use-input
          :disable="store.disabled"
          @filter="filterFn"
          @update:model-value="(val) => kirimpropinsi(val)"
        />
        <template #option="scopex">
          <q-item v-bind="scopex.itemProps"
            ><q-item-section avatar>
              <q-item-label> {{ scopex.opt.name }} <br /> </q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <q-select
          v-model="store.form.id_kota"
          style="margin-right: 5px; width: 25%"
          :options="storekotakab.items"
          option-label="name"
          option-value="id"
          outlined
          emit-value
          map-options
          transition-show="scale"
          transition-hide="scale"
          :disable="store.disabled"
          label="Tujuan Kota"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { max } from "moment";
import { notifErrmodip } from "src/boot/notify-defaults";
import { useKotaKab } from "src/stores/master/kotakab";
import { usePermenStore } from "src/stores/master/permen50";
import { usePropinsi } from "src/stores/master/propinsi";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { onBeforeMount, ref } from "vue";

const store = usePerdinStore();
const storepermen = usePermenStore();
const storepropinsi = usePropinsi();

const scope = ref();
const scopex = ref();

const props = defineProps({
  propinsi: { type: Array, default: () => [] },
  permen: { type: Array, default: () => [] },
  maxx: { type: Boolean },
});

const storekotakab = useKotaKab();

const stringOptions = props.propinsi;
const options = ref(stringOptions);

function filterFn(val, update) {
  if (val === "") {
    update(() => {
      options.value = stringOptions;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();

    options.value = stringOptions.filter(
      (v) => v.name.toString().toLowerCase().indexOf(needle) > -1
    );
  });
}
function kirimpropinsi(val) {
  if (val !== null) {
    storekotakab.params.id_propinsi = val;
    store.form.id_kota = storekotakab.items[0];
  } else {
    store.namakota = "-";
    store.form.id_kota = "";
    storekotakab.params.id_propinsi = "";
    store.form.nik = "";
    store.form.biaya = 0;
  }
  storekotakab.init();
}

// const tanggal = (Date.now) => {
//   return Date.now.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };
store.formattanggal();
//store.getData();
</script>

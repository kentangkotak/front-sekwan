<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card flat bordered class="my-card" style="width: 100%">
      <q-card-section style="margin-bottom: 10px; margin-top: 10px">
        <div class="text-h4 absolute-center">
          <b>FORM PERJALANAN DINAS</b>
        </div>
      </q-card-section>

      <q-separator inset />
      <q-card-section
        horizontal
        style="margin-top: 10px; margin-left: 5px; margin-bottom: 10px"
      >
        <q-input
          style="margin-right: 5px; width: 20%"
          outlined
          label="No. Transaksi"
        />
        <q-input
          outlined
          v-model="date"
          mask="date"
          label="Tanggal"
          style="margin-right: 5px; width: 20%"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          style="margin-right: 5px; width: 20%"
          outlined
          label="Lama PerDin"
        />
        <q-input style="margin-right: 5px; width: 20%" outlined label="Judul" />
        <q-select
          v-model="store.form.id_propinsi"
          style="margin-right: 5px; width: 20%"
          :options="options"
          option-label="name"
          option-value="id"
          outlined
          label="Tujuan Propinsi"
          transition-show="scale"
          transition-hide="scale"
          map-options
          clearable
          use-input
          @filter="filterFn"
          @update:model-value="(val) => store.kirimpropinsi(val)"
        />
        <template #option="scopex">
          <q-item v-bind="scopex.itemProps"
            ><q-item-section avatar>
              <q-item-label> {{ scopex.opt.name }} <br /> </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-card-section>
      <q-card-section
        horizontal
        style="margin-top: 10px; margin-left: 5px; margin-bottom: 10px"
      >
        <q-select
          v-model="store.form.id_kota"
          style="margin-right: 5px; width: 20%"
          :options="store.items"
          option-label="name"
          option-value="id"
          outlined
          transition-show="scale"
          transition-hide="scale"
          label="Tujuan Kota"
          map-options
        />
        <q-input
          v-model="storepermen.koderekening"
          style="margin-right: 5px; width: 20%"
          outlined
          disable
          label="Kode Rekening 50"
        />
        <q-select
          v-model="storepermen.kode"
          :options="storepermen.items"
          option-label="uraian"
          option-value="kodeall"
          style="margin-right: 5px; width: 20%"
          outlined
          label="Uraian Rekening 50"
          clearable
          use-input
          hide-bottom-space
          behavior="menu"
          hide-dropdown-icon
          @input-value="storepermen.init"
          @update:model-value="storepermen.caripermen"
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
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { usePermenStore } from "src/stores/master/permen50";
import { usePropinsi } from "src/stores/master/propinsi";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { computed, ref } from "vue";

const date = ref("YYYY");
const store = usePerdinStore();
const storepermen = usePermenStore();

const scope = ref();
const scopex = ref();

const props = defineProps({
  propinsi: { type: Array, default: () => [] },
  permen: { type: Array, default: () => [] },
});

const storepropinsi = usePropinsi();

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
    store.kirimpropinsi(val);
    // store.params.id_propinsi = val.id;
    // this.params.id_propinsi = val.id;
    // this.form.id_kota = null;
    // console.log("sasasa", this.params.id_propinsi);
    // store.getData();
  });
}
store.getData();
</script>

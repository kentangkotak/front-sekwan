<template>
  <div class="q-pa-md row items-start q-gutter-md" ref="refhederdialog">
    <q-card flat bordered class="my-card" style="width: 100%">
      <q-card-section style="margin-bottom: 10px; margin-top: 10px">
        <div v-if="maxx === true">
          <q-badge color="primary" class="text-h6 absolute-center">
            NO: {{ store.form.notrans ?? "-" }}
          </q-badge>
        </div>
        <div v-else class="text-h10 absolute-center">
          <q-badge color="primary" class="text-h6 absolute-center">
            NO: {{ store.form.notrans ?? "-" }}
          </q-badge>
        </div>
      </q-card-section>

      <q-separator inset />
      <q-card-section
        horizontal
        style="margin-top: 10px; margin-left: 5px; margin-bottom: 10px"
      >
        <q-input
          ref="reftanggal"
          outlined
          dense
          v-model="store.form.tanggal"
          label="Tanggal Berangkat"
          style="margin-right: 5px; width: 25%"
          :disable="store.disabled"
        >
          <template v-slot:prepend>
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
          outlined
          v-model="store.form.tanggalsampai"
          label="Tanggal Sampai"
          dense
          style="margin-right: 5px; width: 25%"
          :disable="store.disabled"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="store.form.tanggalsampai" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          ref="refjudul"
          v-model="store.form.judul"
          style="margin-right: 5px; width: 25%"
          outlined
          dense
          label="Judul"
          :disable="store.disabled"
        />

        <q-input
          v-model="store.form.instansi_tujuan"
          style="margin-right: 5px; width: 25%"
          outlined
          dense
          label="Instansi Tujuan"
          :disable="store.disabled"
        />
        <q-input
          v-model="store.form.instansi_tujuan2"
          style="margin-right: 5px; width: 25%"
          outlined
          dense
          label="Instansi Tujuan Lain"
          :disable="store.disabled"
        />
        <q-select
          v-model="store.form.idkomisi"
          label="Komisi"
          outlined
          dense
          emit-value
          map-options
          style="margin-right: 5px; width: 25%"
          :options="props.komisix"
          option-label="komisi"
          option-value="id"
          :disable="store.disabled"
          @update:model-value="(val) => storedewan.gantikomisi(val)"
        />
      </q-card-section>
      <q-card-section horizontal style="margin-left: 5px; margin-bottom: 10px">
        <q-select
          v-model="store.form.id_propinsi"
          style="margin-right: 5px; width: 25%"
          :options="options"
          option-label="name"
          option-value="id"
          outlined
          dense
          label="Tujuan Propinsi"
          transition-show="scale"
          transition-hide="scale"
          emit-value
          map-options
          clearable
          use-input
          :disable="store.disabled"
          @filter="filterFn"
          @update:model-value="(val) => storekotakab.kirimpropinsix(val)"
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
          dense
          emit-value
          map-options
          transition-show="scale"
          transition-hide="scale"
          :disable="store.disabled"
          label="Tujuan Kota"
          clearable
        />
        <q-select
          v-model="store.form.id_kotax"
          style="margin-right: 5px; width: 25%"
          :options="storekotakab.items"
          option-label="name"
          option-value="id"
          outlined
          dense
          emit-value
          map-options
          transition-show="scale"
          transition-hide="scale"
          :disable="store.disabled"
          label="Tujuan Kota"
          clearable
        />
        <q-select
          v-model="store.form.sekretarisdprd"
          style="margin-right: 5px; width: 25%"
          :options="props.pejabat"
          option-label="nama"
          option-value="nip"
          outlined
          dense
          emit-value
          map-options
          transition-show="scale"
          transition-hide="scale"
          :disable="store.disabled"
          label="Sekretaris DPRD Kota Probolinggo"
          clearable
          @update:model-value="(val) => detailsekretaris(val)"
        />
        <q-select
          v-model="store.form.ppk"
          style="margin-right: 5px; width: 25%"
          :options="props.pejabat"
          option-label="nama"
          option-value="nip"
          outlined
          dense
          emit-value
          map-options
          transition-show="scale"
          transition-hide="scale"
          :disable="store.disabled"
          label="PPK"
          clearable
          @update:model-value="(val) => detailppk(val)"
        />
        <q-select
          v-model="store.form.bendaharapengeluaran"
          style="margin-right: 5px; width: 25%"
          :options="props.pejabat"
          option-label="nama"
          option-value="nip"
          outlined
          dense
          emit-value
          map-options
          transition-show="scale"
          transition-hide="scale"
          :disable="store.disabled"
          label="Bendahara Pengeluaran"
          clearable
          @update:model-value="(val) => detailbendahara(val)"
        />
      </q-card-section>
      <!-- <q-card-section horizontal style="margin-left: 5px; margin-bottom: 10px">
        <q-select
          v-model="store.form.sekretaris"
          style="margin-right: 5px; width: 25%"
          :options="storekotakab.items"
          option-label="name"
          option-value="id"
          outlined
          dense
          emit-value
          map-options
          transition-show="scale"
          transition-hide="scale"
          :disable="store.disabled"
          label="Sekretaris DPRD Kota Probolinggo"
          clearable
        />
      </q-card-section> -->
    </q-card>
  </div>
</template>

<script setup>
// import { max } from "moment";
import { notifErrmodip } from "src/boot/notify-defaults";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { useKotaKab } from "src/stores/master/kotakab";
import { usePermenStore } from "src/stores/master/permen50";
import { usePropinsi } from "src/stores/master/propinsi";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { onBeforeMount, ref } from "vue";

const store = usePerdinStore();
const storepermen = usePermenStore();
const storepropinsi = usePropinsi();
const storedewan = useAnggotaDewanStore();

const scope = ref();
const scopex = ref();

const props = defineProps({
  propinsi: { type: Array, default: () => [] },
  komisix: { type: Array, default: () => [] },
  // kota: { type: Array, default: () => [] },
  permen: { type: Array, default: () => [] },
  maxx: { type: Boolean },
  pejabat: { type: Array, default: () => [] },
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
    //store.form.id_kota = storekotakab.items[0];
  } else {
    store.namakota = "-";
    store.form.id_kota = "";
    storekotakab.params.id_propinsi = "";
    store.form.nik = "";
    store.form.biaya = 0;
  }
  storekotakab.init();
}

function isikomisi(val) {
  storedewan.params.komisi_id = val;
}

// const tanggal = (Date.now) => {
//   return Date.now.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };
if (store.form.notrans === "") {
  store.formattanggal();
}

function detailsekretaris(val) {
  const sekretaris = props.pejabat.find((x) => x.nip === val);
  store.form.namasekretaris = sekretaris.nama;
  store.form.jabatansekretaris = sekretaris.jabatan;
}

function detailppk(val) {
  const ppk = props.pejabat.find((x) => x.nip === val);
  store.form.namappk = ppk.nama;
  store.form.jabatanppk = ppk.jabatan;
}

function detailbendahara(val) {
  const bendahara = props.pejabat.find((x) => x.nip === val);
  store.form.namabendaharapengeluaran = bendahara.nama;
  store.form.jabatanbendaharapengeluaran = bendahara.jabatan;
}

onBeforeMount(() => {
  storedewan.params.komisi_id = "";
  //store.form.idkomisi = "";
});
//store.getData();
</script>

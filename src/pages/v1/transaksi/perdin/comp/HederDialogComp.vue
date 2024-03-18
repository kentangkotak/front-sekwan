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
          :options="propinsi"
          option-label="name"
          option-value="id"
          outlined
          label="Tujuan Propinsi"
          transition-show="scale"
          transition-hide="scale"
          map-options
          @update:model-value="(val) => store.kirimpropinsi(val)"
        />
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
          style="margin-right: 5px; width: 20%"
          outlined
          label="Kode Rekening 50"
        />
        <q-input
          style="margin-right: 5px; width: 20%"
          outlined
          label="Uraian Rekening 50"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { usePropinsi } from "src/stores/master/propinsi";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { ref } from "vue";

const date = ref("YYYY");
const store = usePerdinStore();

const props = defineProps({
  propinsi: { type: Array, default: () => [] },
});

const storepropinsi = usePropinsi();
</script>

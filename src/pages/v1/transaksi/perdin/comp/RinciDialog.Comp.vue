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
        emit-value
        map-options
      />
      <q-input
        style="margin-bottom: 5px"
        outlined
        label="Anggota Dewan/Pendamping"
      />
      <q-input style="margin-bottom: 5px" outlined label="No. Transaksi" />
      <q-input style="margin-bottom: 5px" outlined label="No. Transaksi" />
      <q-input style="margin-bottom: 5px" outlined label="No. Transaksi" />
    </q-card-section>
  </div>
</template>

<script setup>
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { ref } from "vue";

const store = usePerdinStore();
const props = defineProps({
  jenistransaksi: { type: Array, default: () => [] },
});
</script>

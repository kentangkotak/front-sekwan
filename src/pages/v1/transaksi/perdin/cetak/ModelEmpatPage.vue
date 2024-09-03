<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-3 col-md-4">Rekapitulasi Pengajuan Atas</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">???????????????</div>
    </div>
    <div class="row">
      <div class="col-3 col-md-4">Nominal</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">??????????????</div>
    </div>
    <div class="row">
      <div class="col-3 col-md-4">Kegiatan</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">???????????</div>
    </div>
    <div class="row">
      <div class="col-3 col-md-4">Kode Kegiatan</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">4.02.02.2.08.01</div>
    </div>
    <div class="row">
      <div class="col-3 col-md-4">Kd Rek Oby</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">?????????????</div>
    </div>
  </div>
  <q-separator />
  <q-markup-table separator="cell" dense wrap-cells flat bordered>
    <th>Uraian (Per Kegiatan)</th>
    <th>Kode Rekekning Obyek</th>
    <th>Rincian Jumlah</th>
    <th>Jumlah</th>
  </q-markup-table>
</template>
<script setup>
import { useDokumenEmpat } from "src/stores/transaksi/dokumenempat";
import { usePerdinStore } from "src/stores/transaksi/perdin";
const store = useDokumenEmpat();
const storeheder = usePerdinStore();

const props = defineProps({
  jenistransaksi: { type: Object },
});

store.mjenistrans = props.jenistransaksi;
store.params.nospj = storeheder.form.notrans;
store.init();
</script>

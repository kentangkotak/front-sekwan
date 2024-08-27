<template>
  <div class="q-pa-md example-column-row-width" style="border-style: dashed">
    <div class="column text-center" style="height: 1000px">
      <div class="col-3 bg-amber-10 text-bold">
        <q-item-label class="q-pt-sm text-h6"
          >Surat Perintah Pencairan Dana(SP2D)</q-item-label
        >
        <q-item-label class="q-pt-sm text-h6">
          Nomor : 35.74/04.0/......../LS /4.02.0.00.0.00.01.0000/P..../..../2024
        </q-item-label>
        <q-item-label class="q-pt-sm text-h6">Tanggal :</q-item-label>
        <q-item-label class="q-pt-sm text-h6"
          >Surat Perintah Membayar(SPM)</q-item-label
        >
        <q-item-label class="q-pt-sm text-h6">
          Nomor : 35.74/04.0/......../LS /4.02.0.00.0.00.01.0000/P..../..../2024
        </q-item-label>
        <q-item-label class="q-pt-sm text-h6">Tanggal :</q-item-label>
      </div>
      <div class="col-7">
        <br />
        <br />
        <br />
        <br />
        <q-item-label class="q-pt-sm q-pb-sm text-h5"
          >Koordinasi dan Konsultasi Pelaksaan Tugas DPRD</q-item-label
        >
        <q-item-label class="q-pt-sm q-pb-sm text-h6"
          >(4.02.02.2.08.01)</q-item-label
        >
        <q-item-label class="q-pt-sm q-pb-sm text-h6"
          >Belanja Perjalanan Dinas Biasa</q-item-label
        >
        <q-item-label class="q-pt-sm q-pb-sm text-h6"
          >(5.1.02.04.01.0001)</q-item-label
        >
        <br />
        <br />
        <q-item-label class="text-center text-h6"
          >SPJ : Rp.
          {{
            rupiah(
              storerinci.totalall.reduce(
                (total, curr) => (total = total + parseInt(curr.total_biaya)),
                0
              )
            )
          }}</q-item-label
        >
        <q-item-label class="text-center text-h6"
          >Pengajuan : Rp.
          {{
            rupiah(
              storerinci.totalall.reduce(
                (total, curr) => (total = total + parseInt(curr.total_biaya)),
                0
              )
            )
          }}</q-item-label
        >
      </div>
      <div class="col bg-amber-10">
        <q-item-label class="q-pt-sm q-pb-sm text-h6">PEKERJAAN</q-item-label>
        <q-item-label class="q-pt-sm q-pb-sm text-h6">
          {{ storeheder.form.judul }}
        </q-item-label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { useTranskRinci } from "src/stores/transaksi/transrinci";

const storerinci = useTranskRinci();
const storeheder = usePerdinStore();
const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>
<style lang="sass">
.example-column-row-width
  .column > div
    padding: 10px 15px
    background: rgba(#999, .15)
    border: 1px solid rgba(#999, .2)
  .column + .column
    margin-top: 1rem
</style>

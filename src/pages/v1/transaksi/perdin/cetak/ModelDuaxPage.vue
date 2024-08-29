<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-3 col-md-4">SKPD</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">SEKRETARIAT DPRD KOTA PROBOLINGGO</div>
    </div>
    <div class="row">
      <div class="col-3 col-md-4">PENGG. ANGGARAN</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">SEKRETARIS DPRD KOTA PROBOLINGGO</div>
    </div>
    <div class="row">
      <div class="col-3 col-md-4">BEND. PENGELUARAN</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">LIDYAWATI</div>
    </div>
    <div class="row">
      <div class="col-3 col-md-4">TAHUN ANGGARAN</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">{{ thn }}</div>
    </div>
    <div class="row">
      <div class="col-3 col-md-4">BULAN</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">{{ namabulan(bln) }}</div>
    </div>
    <div class="row">
      <div class="col-3 col-md-4">KODE SUB KEGIATAN</div>
      <div class="col-1 col-md-4">:</div>
      <div class="col-8 col-md-4">4.02.02.2.08.01</div>
    </div>
  </div>
  <q-separator />
  <br />
  <div class="q-pa-md">
    <q-markup-table separator="cell" dense wrap-cells flat bordered>
      <thead>
        <tr>
          <th class="text-center" rowspan="2">KODE SUB KEGIATAN</th>
          <th class="text-center" rowspan="2">Uraian Rekening</th>
          <th class="text-center" rowspan="2">Jumlah Menurut Pagu</th>
          <th class="text-center" rowspan="2">Jumlah SPJ Sebelumnya</th>
          <th class="text-center" colspan="2">SPJ</th>
          <th class="text-center" rowspan="2">Sisa Pagu</th>
        </tr>
        <tr>
          <th>LS</th>
          <th>UP/GU/TU</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(xxx, n) in store.items" :key="n">
          <td class="text-left">{{ xxx.koderek }}</td>
          <td class="text-left">{{ xxx?.uraian }}</td>
          <td class="text-right"></td>
          <td class="text-right"></td>
          <td class="text-right">{{ rupiah(xxx.ls) }}</td>
          <td class="text-right"></td>
          <td class="text-right"></td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  <br />
  <div style="margin-left: 70px" class="q-mt-md">
    <div class="row">
      <div class="col"></div>
      <div class="col text-weight-bold text-center">
        Probolinggo, {{ tglx }} {{ blnx }} {{ thnx }}
      </div>
    </div>
    <div class="row">
      <div class="col text-weight-bold text-center">Mengesahkan,</div>
      <div class="col"></div>
    </div>
    <div class="row text-weight-bold">
      <div class="col text-center">PPK - SKPD</div>
      <div class="col text-center">Bendahara Pengeluaran</div>
    </div>
    <div class="row text-weight-bold">
      <div class="col"></div>
      <div class="col text-center"></div>
    </div>
    <br />
    <br />
    <div class="row text-weight-bold">
      <div class="col text-center">
        <u> SUMARDI, S.Sos </u>
      </div>
      <div class="col text-center">
        <u>LIDYAWATI</u>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDokumenduax } from "src/stores/transaksi/dokumenduax";
import { usePerdinStore } from "src/stores/transaksi/perdin";

const storeheder = usePerdinStore();
const store = useDokumenduax();
const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function namabulan(val) {
  if (val === "01") {
    return "Januari";
  } else if (val === "02") {
    return "Februari";
  } else if (val === "03") {
    return "Maret";
  } else if (val === "04") {
    return "April";
  } else if (val === "05") {
    return "Mei";
  } else if (val === "06") {
    return "Juni";
  } else if (val === "07") {
    return "Juli";
  } else if (val === "08") {
    return "Augustus";
  } else if (val === "09") {
    return "September";
  } else if (val === "10") {
    return "Oktober";
  } else if (val === "11") {
    return "November";
  } else {
    return "Desember";
  }
}

const namabulanx = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const tglnow = storeheder.form.tanggal.split("-");
//const tgl = tglnow.getDate();
const bln = tglnow[1];
const thn = tglnow[0];

const tglnowx = new Date();

const tglx = tglnowx.getDate();
const blnx = namabulanx[tglnowx.getMonth()];
const thnx = tglnowx.getFullYear();

store.params.nospj = storeheder.form.notrans;
store.init();
</script>

<template>
  <div class="text-weight-bold" style="font-size: large">
    <div class="row justify-center">PEMERINTAH KOTA PROBOLINGGO</div>
    <div class="row justify-center">REGISTER PENGESAHAN SPJ</div>
    <div class="row justify-center">
      LAPORAN PERTANGGUNGJAWABAN PENGELUARAN (SPJ)
    </div>
  </div>
  <br />
  <!-- <q-separator /> -->
  <div class="row justify-center" style="margin-top: 30px">
    <q-markup-table separator="vertical" flat bordered dense wrap-cells>
      <thead width="50%">
        <tr>
          <th width="20%">Tanggal</th>
          <th>Uraian</th>
          <th width="20%">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ tgl }} {{ bln }} {{ thn }} <br />
            Sampai Dengan <br />
            {{ tglx }} {{ blnx }} {{ thnx }}
          </td>
          <td>{{ transheder.form.judul }}</td>
          <td>
            Rp.
            {{
              rupiah(
                storerinci.totalall.reduce(
                  (total, curr) => (total = total + parseInt(curr.total_biaya)),
                  0
                )
              )
            }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  <br />
  <div style="margin-left: 70px" class="q-mt-md">
    <div class="row">
      <div class="col"></div>
      <div class="col text-weight-bold text-center">
        Probolinggo, {{ tgl }} {{ bln }} {{ thn }}
      </div>
    </div>
    <div class="row">
      <div class="col text-weight-bold text-center">Mengetauhi,</div>
      <div class="col"></div>
    </div>
    <div class="row text-weight-bold">
      <div class="col text-center">Sekretaris DPRD Kota Probolinggo</div>
      <div class="col text-center">PPK Sekretariat DPRD</div>
    </div>
    <div class="row text-weight-bold">
      <div class="col"></div>
      <div class="col text-center">Kota Probolinggo</div>
    </div>
    <br />
    <br />
    <div class="row text-weight-bold">
      <div class="col text-center">
        <u> TEGUH BAGUS S., M.Pd </u>
      </div>
      <div class="col text-center">
        <u>SUMARDI, S. Sos</u>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { useTranskRinci } from "src/stores/transaksi/transrinci";
import { onMounted } from "vue";

const storerinci = useTranskRinci();
const transheder = usePerdinStore();
const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const namabulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const tglnow = new Date();
const tgl = tglnow.getDate();
const bln = namabulan[tglnow.getMonth()];
const thn = tglnow.getFullYear();

const tglnowx = new Date(
  new Date().getTime() + transheder.form.lamaperdin * 24 * 60 * 60 * 1000
);

const tglx = tglnowx.getDate();
const blnx = namabulan[tglnowx.getMonth()];
const thnx = tglnowx.getFullYear();
console.log("The current month is ", tglnow);

// var month_name = function (dt) {
//   // Define an array containing names of months
//   const mlist = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   // Return the name of the month corresponding to the month index of the provided date
//   return mlist[dt.getMonth()];
// };
onMounted(() => {
  storerinci.getDataTransRinciall();
});
</script>

<template>
  <div class="text-weight-bold" style="font-size: large">
    <div class="row justify-center">PEMERINTAH KOTA PROBOLINGGO</div>
    <div class="row justify-center">REGISTER PENGESAHAN SPJ</div>
    <div class="row justify-center">
      LAPORAN PERTANGGUNGJAWABAN PENGELUARAN (SPJ)
    </div>
  </div>
  <q-separator />
  <div class="row justify-center" style="margin-top: 30px">
    <q-markup-table separator="vertical" flat bordered dense wrap-cells>
      <thead width="50%">
        <tr>
          <th>Tanggal</th>
          <th>Uraian</th>
          <th>Jumlah</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ transheder.form.tanggal }}</td>
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
  <div class="row justify-center text-weight-bold">
    <div class="col-8"></div>
    <div class="col">Probolinggo, {{ tgl }} {{}} {{ bln }} {{ thn }}</div>
  </div>
  <div class="row justify-center text-weight-bold">
    <div class="col justify-center" style="margin-left: 70px">Mengetauhi,</div>
    <div class="col"></div>
  </div>
  <div class="row text-weight-bold">
    <div class="col-9">Sekretaris DPRD Kota Probolinggo</div>
    <div class="col justify-center">PPK Sekretariat DPRD</div>
  </div>
  <div class="row justify-center text-weight-bold">Kota Probolinggo</div>
  <br />
  <br />
  <div class="row text-weight-bold">
    <div class="col-9"><u> TEGUH BAGUS S., M.Pd </u></div>
    <div class="col justify-center"><u>SUMARDI, S. Sos</u></div>
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
  "Febru",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const tglnow = new Date();
const tgl = tglnow.getDay();
const bln = namabulan[tglnow.getMonth()];
const thn = tglnow.getFullYear();
console.log("The current month is " + namabulan[tglnow.getMonth()]);

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

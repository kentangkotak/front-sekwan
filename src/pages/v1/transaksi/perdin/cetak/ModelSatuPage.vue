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
  <div class="row justify-end" style="margin-right: 200px">
    Probolinggo, {{ Date.now() }}
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

// const namabulan = function (dt) {
//   mlist = [
//     "Januari",
//     "Februari",
//     "Maret",
//     "April",
//     "Mei",
//     "Juni",
//     "Juli",
//     "Augustus",
//     "September",
//     "October",
//     "November",
//     "Desember",
//   ];
//   return mlist[dt.getMonth()];
// };

onMounted(() => {
  storerinci.getDataTransRinciall();
});
</script>

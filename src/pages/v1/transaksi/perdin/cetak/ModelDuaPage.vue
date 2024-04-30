<template>
  <div class="row">DAFTAR NOMINATIF</div>
  <div class="row">
    <div class="col-3">JUDUL KEGIATAN</div>
    <div class="col-1">:</div>
    <div class="col">{{ transheder.form.judul }}</div>
  </div>
  <div class="row">
    <div class="col-3">TANGGAL</div>
    <div class="col-1">:</div>
    <div class="col">{{ transheder.form.tanggal }}</div>
  </div>
  <div class="row">
    <div class="col-3">LAMA PERJALANAN DINAS</div>
    <div class="col-1">:</div>
    <div class="col">{{ transheder.form.lamaperdin }} Hari</div>
  </div>
  <br />
  <div>
    <q-markup-table separator="vertical" flat bordered dense wrap-cells>
      <thead width="50%">
        <tr>
          <th>Nama</th>
          <th v-for="(judul, x) in jenistransaksi" :key="x">
            {{ judul?.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trans, n) in datamateng" :key="n">
          <td>{{ trans?.dewan?.dewan[0]?.nama }}</td>
          <td style="text-align: right">
            Rp. {{ rupiah(parseInt(trans?.biaya1?.total_biaya ?? 0)) }}
          </td>
          <td style="text-align: right">
            Rp. {{ rupiah(parseInt(trans?.biaya2?.total_biaya ?? 0)) }}
          </td>
          <td style="text-align: right">
            Rp. {{ rupiah(parseInt(trans?.biaya3?.total_biaya ?? 0)) }}
          </td>
          <td style="text-align: right">
            Rp. {{ rupiah(parseInt(trans?.biaya4?.total_biaya ?? 0)) }}
          </td>
          <td style="text-align: right">
            Rp. {{ rupiah(parseInt(trans?.biaya5?.total_biaya ?? 0)) }}
          </td>
          <!-- <div>
            <td v-for="(transx, x) in namaanggota?.jenis_biaya" :key="x">
              {{ transx }}
            </td>
          </div> -->
          <!-- <td v-if="trans[0]?.jenis_biaya === '1'">
              {{ trans[0]?.total_biaya ?? trans[0]?.total_biaya }}
              {{ trans[1]?.total_biaya ?? trans[1]?.total_biaya }}
              {{ trans[2]?.total_biaya ?? trans[2]?.total_biaya }}
            </td>
          </div>
          <td>
            {{ trans[0]?.jenis_biaya === "2" ? trans[0]?.total_biaya : 0 }}
          </td>
          <td>
            {{ trans[0]?.jenis_biaya === "3" ? trans[0]?.total_biaya : 0 }}
          </td>
          <td>
            {{ trans[0]?.jenis_biaya === "4" ? trans[0]?.total_biaya : 0 }}
          </td>
          <td>
            {{ trans[0]?.jenis_biaya === "5" ? trans[0]?.total_biaya : 0 }}
          </td> -->
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup>
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { useTranskRinci } from "src/stores/transaksi/transrinci";
import { onMounted, ref } from "vue";

const xxx = ref();
const transheder = usePerdinStore();
const transrinci = useTranskRinci();

const datamateng = [];
const datamentah = transrinci.itemsall;
const niks = datamentah.map((x) => x.nik);
const filteredNik = niks.filter((value, index, wew) => {
  return wew.indexOf(value) === index;
});

const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

if (filteredNik.length) {
  filteredNik.forEach((nik) => {
    const temp = {
      dewan: datamentah.find((f) => f.nik === nik) ?? {},
      biaya1:
        datamentah.find((f) => f.nik === nik && f.jenis_biaya === "1") ?? 0,
      biaya2:
        datamentah.find((f) => f.nik === nik && f.jenis_biaya === "2") ?? 0,
      biaya3:
        datamentah.find((f) => f.nik === nik && f.jenis_biaya === "3") ?? 0,
      biaya4:
        datamentah.find((f) => f.nik === nik && f.jenis_biaya === "4") ?? 0,
      biaya5:
        datamentah.find((f) => f.nik === nik && f.jenis_biaya === "5") ?? 0,
    };
    datamateng.push(temp);
    console.log("datamateng", datamateng);
  });
}
console.log("nik", datamentah);

const i = 1;
const namaanggota = Object.groupBy(transrinci.itemsall, ({ nik }) => nik);
// const nik = Object.keys(namaanggota);
// console.log("nik", nik);

// const wew1 = transrinci.items.filter(
//   nik.forEach((element) => {
//     (x) => x.jenis_biaya === "1" && x.nik === nik;
//   })
// );

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

const props = defineProps({
  jenistransaksi: { type: Object },
});

const tglnow = Date(transheder.form.tanggal);
console.log("wew", tglnow);
// const tgl = tglnow.getDate();
// const bln = namabulan[tglnow.getMonth()];
// const thn = tglnow.getFullYear();

onMounted(() => {
  // store.total = storrinci.totalall.reduce(
  //   (total, curr) => (total = total + parseInt(curr.total_biaya)),
  //   0
  // );
  // console.log("reduce", store.total);
  transrinci.getDataTransRinciall();
});
</script>

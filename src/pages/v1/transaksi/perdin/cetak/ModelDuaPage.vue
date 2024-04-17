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
        <tr v-for="(trans, n) in namaanggota" :key="n">
          <td>{{ trans[0]?.dewan[0]?.nama }}</td>
          <div v-for="(transx, x) in transrinci.itemsall" :key="x">
            <td
              v-if="
                trans[0]?.nik === transx?.nik &&
                trans[0]?.jenis_biaya === transx?.jenis_biaya
              "
            >
              <!-- {{ (xxx = transx.find((s) => s.jenis_biaya === "1")) }} -->
            </td>
          </div>
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

const i = 1;
const namaanggota = Object.groupBy(transrinci.itemsall, ({ nik }) => nik);
// console.log("xx", xxx);

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

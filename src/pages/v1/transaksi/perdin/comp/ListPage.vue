<template>
  <table>
    <thead width="100%">
      <tr>
        <th>NO. TRANSAKSI</th>
        <th>TANGGAL</th>
        <th>JUDUL PERJALANAN DINAS</th>
        <th>PERMEN 50</th>
        <th>TUJUAN</th>
        <th>LAMA</th>
        <!-- <th>TOTAL</th> -->
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="store.loading">
        <tr v-for="n in store.items" :key="n">
          <td>
            <q-skeleton type="text" width="15%" height="14px" />
          </td>
          <td>
            <q-skeleton type="text" width="13%" height="14px" />
          </td>
          <td>
            <q-skeleton type="text" width="14%" height="14px" />
          </td>
          <td>
            <div class="row q-mb-xs q-col-gutter-sm">
              <q-skeleton type="text" width="30%" height="14px" />
            </div>
            <div class="row q-col-gutter-sm items-center">
              <q-skeleton type="text" width="14%" height="14px" />
            </div>
          </td>
          <td>
            <div class="row q-mb-xs q-col-gutter-sm">
              <q-skeleton type="text" width="14%" height="14px" />
            </div>
            <div class="row q-col-gutter-sm items-center">
              <q-skeleton type="text" width="14%" height="14px" />
            </div>
          </td>
          <td>
            <q-skeleton type="text" width="14%" height="14px" />
          </td>
          <td class="text-end">
            <div class="row justify-end">
              <q-skeleton type="text" width="10%" height="14px" />
            </div>
          </td>
        </tr>
      </template>
      <template v-else>
        <template v-for="(item, n) in store.items" :key="n">
          <tr :class="item?.flag === '1' ? 'bg-light-blue-2' : ''">
            <td width="15%" height="14px">
              <b>{{ item?.no_transaksi }}</b>
            </td>
            <td width="13%" height="14px">{{ item?.tanggal }}</td>
            <td width="14%" height="14px">{{ item?.judul }}</td>
            <td width="18%" height="14px">
              <div>{{ item?.rekening50 }}</div>
              <div>{{ item?.uraian50 }}</div>
            </td>
            <td width="14%" height="14px">
              <div>Provinsi {{ item?.provinsi?.name }}</div>
              <div>KOTA {{ item?.kota?.name }}</div>
            </td>
            <td width="14%" height="14px">{{ item?.lamaperdin }} Hari</td>
            <td width="10%" height="14px">
              <q-btn
                color="black"
                size="sm"
                round
                glossy
                icon="eva-edit-2-outline"
                @click="formDialogx(item, item?.id)"
              >
                <q-tooltip class="primary" :offset="[10, 10]"> Edit </q-tooltip>
              </q-btn>

              <q-btn
                color="red"
                size="sm"
                round
                glossy
                icon="eva-person-delete-outline"
                :loading="store.loading"
                @click="store.lemparDewan(item.id)"
              >
                <q-tooltip class="primary" :offset="[10, 10]">
                  Delete
                </q-tooltip>
              </q-btn>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
    <formDialog v-model="dialog" />
  </table>
</template>

<script setup>
import { useKotaKab } from "src/stores/master/kotakab";
import { usePermenStore } from "src/stores/master/permen50";
import { useGetBiaya } from "src/stores/transaksi/getbiaya";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { useTranskRinci } from "src/stores/transaksi/transrinci";
import { defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";

//const itemterpilih = ref({});
const formDialog = defineAsyncComponent(() => import("./FormDialogComp.vue"));
const dialog = ref(false);
const store = usePerdinStore();
const storrinci = useTranskRinci();
const storegetbiaya = useGetBiaya();
const storekota = useKotaKab();
const storePermen = usePermenStore();
// const jabatan = ref([]);
// const komisi = ref([]);

const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function formDialogx(val, id) {
  // console.log(id);
  store.disabled = true;
  //coitemterpilih.value = val;
  dialog.value = true;
  store.form.id_jenistransaksi = 1;
  store.form.id = val?.id;
  store.form.notrans = val?.no_transaksi;
  store.form.tanggal = val?.tanggal;
  store.form.lamaperdin = val?.lamaperdin;
  store.form.judul = val?.judul;
  store.form.koderekekning = val?.rekening50;
  store.form.uraian50 = val?.uraian50;
  store.form.id_propinsi = val?.provinsi?.id;
  store.form.id_kota = val?.kota?.id;
  storePermen.kode = val?.uraian50;
  // store.form.namakota = val?.kota?.name;
  storegetbiaya.paramsbiaya.id_propinsi = store.form.id_propinsi;
  storrinci.params.id = id;

  storekota.kirimpropinsix(val?.provinsi?.id);
  // storePermen.caripermen(val?.rekening50);
  // storrinci.inittransrinci(id);
}

function getkelamin(val) {
  if (val === "L") {
    return "Laki-Laki";
  } else {
    return "Perempuan";
  }
}

function getstatusmu(val) {
  if (val === 0) {
    return "Tidak Aktif";
  } else {
    return "Aktif";
  }
}

const props = defineProps({
  jabatan: { type: Array, default: () => [] },
  komisi: { type: Array, default: () => [] },
  golongan: { type: Array, default: () => [] },
  tingkatan: { type: Array, default: () => [] },
});

// store.initgehedertransaksi();

// onUnmounted(() => {
//   store.items.reduce(
//     (total, curr) => (total = total + parseInt(curr.total_biaya)),
//     0
//   );
// });
</script>

<style lang="scss" scoped>
.text-end {
  text-align: end;
}
/* Standard Tables */

table {
  // margin: 1em 0;
  border-collapse: collapse;
  border: 1px solid #d6d6d6;
  width: 100%;
  margin-bottom: 50px;
}

th,
td {
  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
  border-top-color: brown;
}
td {
  padding: 0.5em 1em 0em 1.5em;
}
th {
  padding: 0.5em 0.5em 0.5em 1em;
  vertical-align: bottom;
  background-color: $dark;
  color: white;
}

tr:nth-child(even) th[scope="row"] {
  background-color: #f2f2f2;
}

tr:nth-child(odd) th[scope="row"] {
  background-color: #fff;
}

tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.05);
}

tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}

//sampai sini tadi

// td:nth-of-type(2) {
//   font-style: italic;
// }

// th:nth-of-type(3),
// td:nth-of-type(3) {
//   text-align: right;
// }
/* Fixed Headers */

// th {
//   position: -webkit-sticky;
//   position: sticky;
//   top: 0;
//   z-index: 2;
// }

// th[scope="row"] {
//   position: -webkit-sticky;
//   position: sticky;
//   left: 0;
//   z-index: 1;
// }

// th[scope="row"] {
//   vertical-align: top;
//   color: inherit;
//   background-color: inherit;
//   background: linear-gradient(
//     90deg,
//     transparent 0%,
//     transparent calc(100% - 0.05em),
//     #d6d6d6 calc(100% - 0.05em),
//     #d6d6d6 100%
//   );
// }

// table:nth-of-type(2) th:not([scope="row"]):first-child {
//   left: 0;
//   z-index: 3;
//   background: linear-gradient(
//     90deg,
//     #666 0%,
//     #666 calc(100% - 0.05em),
//     #ccc calc(100% - 0.05em),
//     #ccc 100%
//   );
// }

/* Strictly for making the scrolling happen. */

// th[scope="row"] + td {
//   min-width: 24em;
// }

// th[scope="row"] {
//   min-width: 20em;
// }
</style>

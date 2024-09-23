<template>
  <div>
    <LoadingList v-if="store.loading" />
    <empty-data v-else-if="!store.items.length && !store.loading" />
    <q-list v-else separator>
      <q-item v-for="(item, x) in store.items" :key="x">
        <q-item-section>
          <div class="row">
            <div class="col-2">
              <q-avatar>
                <img
                  v-if="item?.jns_kelamin === 'P'"
                  src="../../../../../assets/images/female.svg"
                />
                <img v-else src="../../../../../assets/images/male.svg" />
              </q-avatar>
            </div>
            <div class="col-10 text-weight-bold">
              <q-item-label class="text-red-10"
                >No. Transaksi : {{ item?.notrans }}
              </q-item-label>
              <q-item-label class="text-orange"
                >Tanggal : {{ item.tanggal }} Sampai
                {{ item.tanggal_sampai }}</q-item-label
              >
              <q-item-label>KOMISI : {{ item?.komisi }} </q-item-label>
            </div>
            <q-item-label caption lines="2" class="text-primary"
              >JUDUL : {{ item?.judul }}</q-item-label
            >
          </div>
        </q-item-section>
        <q-separator vertical inset color="orange" />
        <q-item-section>
          <div class="row">
            <div class="col-10 text-weight-bold q-ml-md">
              <q-item-label class="text-purple-10"
                >TUJUAN : {{ item?.tujuanpropinsi }}
                <span v-if="item?.tujuankota1 !== null">
                  - {{ item?.tujuankota2 }}
                </span>
              </q-item-label>
              <q-item-label class="text-purple"
                >INSTANSI YANG DITUJU :
                {{ item?.instansi_tujuan }}</q-item-label
              >
              <q-badge color="red"
                >TOTAL BIAYA : Rp. {{ rupiah(item?.totalk) }}</q-badge
              >
            </div>
          </div>
        </q-item-section>
        <q-item-section side>
          <div class="row">
            <div class="col-7">
              <q-btn
                color="primary"
                size="sm"
                round
                glossy
                :loading="store.loading"
                icon="eva-edit-2-outline"
                @click="formDialogx(item, item?.id)"
              >
                <q-tooltip class="primary" :offset="[10, 10]"> Edit </q-tooltip>
              </q-btn>
            </div>
            <div class="col-1">
              <q-btn
                v-model="store.payloadx.id"
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
            </div>
          </div>
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>
    <!-- </div> -->
    <!-- </div> -->
    <!-- </q-scroll-area> -->
    <formDialog v-model="dialog" />
  </div>
</template>

<script setup>
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { useKotaKab } from "src/stores/master/kotakab";
import { usePermenStore } from "src/stores/master/permen50";
import { useGetBiaya } from "src/stores/transaksi/getbiaya";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { useTranskRinci } from "src/stores/transaksi/transrinci";
import { defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";
import LoadingList from "./LoadingList.vue";
import EmptyData from "./EmptyData.vue";

//const itemterpilih = ref({});
const formDialog = defineAsyncComponent(() => import("./FormDialogComp.vue"));
const dialog = ref(false);
const store = usePerdinStore();
const storrinci = useTranskRinci();
const storegetbiaya = useGetBiaya();
const storekota = useKotaKab();
const storePermen = usePermenStore();
const storedewan = useAnggotaDewanStore();

// const jabatan = ref([]);
// const komisi = ref([]);

const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function formDialogx(val, id) {
  console.log("wewwe", val);
  store.disabled = true;
  //coitemterpilih.value = val;
  dialog.value = true;
  store.form.idkomisi = val?.komisi;
  store.form.id_jenistransaksi = 1;
  store.form.id = val?.id;
  store.form.notrans = val?.notrans;
  store.form.tanggal = val?.tanggal;
  store.form.tanggalsampai = val?.tanggal_sampai;
  store.form.lamaperdin = val?.lamaperdin;
  store.form.judul = val?.judul;
  store.form.koderekekning = val?.rekening50;
  store.form.uraian50 = val?.uraian50;
  store.form.id_propinsi = val?.idtujuanpropinsi;
  store.form.id_kota = val?.tujuankota1;

  // komisi.value = [
  //   {
  //     id: val?.idkomisi,
  //     komisi: val?.komisi,
  //   },
  // ];

  // storedewan.gantikomisi(val?.idkomisi);
  store.form.instansi_tujuan = val?.instansi_tujuan;
  store.form.id_kotax = val?.tujuankota2;
  storePermen.kode = val?.uraian50;
  // store.form.namakota = val?.kota?.name;
  storegetbiaya.paramsbiaya.id_propinsi = store.form.id_propinsi;
  storrinci.params.id = id;

  //storekota.kirimpropinsix(val?.provinsi?.id);
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
  //komisix: { type: Array, default: () => [] },
  golongan: { type: Array, default: () => [] },
  tingkatan: { type: Array, default: () => [] },
});

// function namabulan(val) {
//   if (val === "01") {
//     return "Januari";
//   } else if (val === "02") {
//     return "Februari";
//   } else if (val === "03") {
//     return "Maret";
//   } else if (val === "04") {
//     return "April";
//   } else if (val === "05") {
//     return "Mei";
//   } else if (val === "06") {
//     return "Juni";
//   } else if (val === "07") {
//     return "Juli";
//   } else if (val === "08") {
//     return "Augustus";
//   } else if (val === "09") {
//     return "September";
//   } else if (val === "10") {
//     return "Oktober";
//   } else if (val === "11") {
//     return "November";
//   } else {
//     return "Desember";
//   }
// }

// const tglnow = store.form.tanggal.split("-");
// const tgl = tglnow[2];
// const bln = tglnow[1];
// const thn = tglnow[0];
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

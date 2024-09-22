<template>
  <div>
    <div class="q-pb-xl">
      <LoadingList v-if="store.loading" />
      <empty-data v-else-if="!store.items.length && !store.loading" />
      <!-- <q-scroll-area :visible="visible" style="height: 800px"> -->
      <!-- <div class="row q-pa-SM">
        <div class="col-12"> -->
      <q-list v-else separator>
        <q-item v-for="(item, n) in store.items" :key="n">
          <q-item-section>
            <div class="row">
              <div class="col-2">
                <q-avatar>
                  <img
                    v-if="item?.jns_kelamin === 'P'"
                    src="../../../../assets/images/female.svg"
                  />
                  <img v-else src="../../../../assets/images/male.svg" />
                </q-avatar>
              </div>
              <div class="col-10 text-weight-bold">
                <q-item-label class="text-red-10"
                  >NIK : {{ item?.nik }}
                </q-item-label>
                <q-item-label class="text-orange"
                  >NAMA : {{ item?.nama }}</q-item-label
                >
                <q-item-label
                  >KELAMIN : {{ getkelamin(item?.jns_kelamin) }}</q-item-label
                >
              </div>
              <q-item-label caption lines="2"
                >ALAMAT : {{ item?.alamat }}</q-item-label
              >
            </div>
          </q-item-section>
          <q-separator vertical inset color="orange" />
          <q-item-section>
            <div class="row">
              <div class="col-10 text-weight-bold q-ml-md">
                <q-item-label class="text-red-10"
                  >JABATAN : {{ item?.jabatan?.jenis }}
                </q-item-label>
                <q-item-label class="text-orange"
                  >KOMISI : {{ item?.komisi?.komisi }}</q-item-label
                >
                <q-item-label
                  >GOLONGAN : {{ item?.golongan?.name }}</q-item-label
                >
                <q-item-label class="text-primary"
                  >TINGKATAN : {{ item?.tingkatan?.name }}</q-item-label
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
                  @click="formDialogx(item)"
                >
                  <q-tooltip class="primary" :offset="[10, 10]">
                    Edit
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="col">
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
      <div class="q-pb-xl" />
      <div class="q-pb-xl" />
      <!-- </div> -->
      <!-- </div> -->
      <!-- </q-scroll-area> -->
    </div>
  </div>
  <formDialog v-model="store.dialog" :komisi="komisi" :golongan="golongan" />
</template>

<script setup>
import { useQuasar } from "quasar";
import LoadingList from "./LoadingList.vue";
import EmptyData from "./EmptyData.vue";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { useJabatanStore } from "src/stores/master/jabatan";
import { defineAsyncComponent, ref } from "vue";
import { useRouter } from "vue-router";

//const itemterpilih = ref({});
const formDialog = defineAsyncComponent(() => import("./FormDialogComp.vue"));
const store = useAnggotaDewanStore();
const jabatanStore = useJabatanStore();

// const jabatan = ref([]);
// const komisi = ref([]);

function formDialogx(val) {
  // itemterpilih.value = val;
  store.dialog = true;

  store.form.id = val.id;
  store.form.nik = val.nik;
  store.form.nama = val.nama;
  store.form.jns_kelamin = val.jns_kelamin;
  store.form.alamat = val.alamat;
  store.form.id_jabatan = parseInt(val.id_jabatan);
  store.form.id_komisi = parseInt(val.id_komisi);
  store.form.golongan_id = parseInt(val.golongan_id);
  store.form.tingkatan_id = parseInt(val.tingkatan_id);
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

.fixed_header {
  width: 400px;
  table-layout: fixed;
  border-collapse: collapse;
}

.fixed_header tbody {
  display: block;
  width: 100%;
  overflow: auto;
  height: 100px;
}

.fixed_header thead tr {
  display: block;
}

.fixed_header thead {
  background: black;
  color: #fff;
}

.fixed_header th,
.fixed_header td {
  padding: 5px;
  text-align: left;
  width: 200px;
}
</style>

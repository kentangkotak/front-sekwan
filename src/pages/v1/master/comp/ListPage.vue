<template>
  <table>
    <thead>
      <tr>
        <th>AVATAR</th>
        <th>NIK</th>
        <th>NAMA</th>
        <th>JENIS KELAMIN</th>
        <th>ALAMAT</th>
        <th>JABATAN</th>
        <th>KOMISI</th>
        <!-- <th>STATUS</th> -->
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="store.loading">
        <tr v-for="n in store.params.per_page" :key="n">
          <!-- <td width="5%">
            <q-skeleton
              type="text"
              width="20px"
              height="14px"
            />
          </td>
          <td>
            <q-skeleton
              type="text"
              width="50px"
              height="14px"
            />
            <q-skeleton
              type="text"
              width="40px"
              height="10px"
            />
          </td>
          <td>
            <div class="row q-mb-xs q-col-gutter-sm">
              <q-skeleton
                type="text"
                width="100px"
                height="14px"
              />
            </div>
            <div class="row q-col-gutter-sm items-center">
              <q-skeleton
                type="text"
                width="40px"
                height="14px"
              />
              <div class="text-grey q-pt-none">
                ||
              </div>
              <q-skeleton
                type="text"
                width="40px"
                height="14px"
                class="q-ml-xs"
              />
            </div>
          </td>
          <td>
            <q-skeleton
              type="text"
              width="100px"
              height="14px"
            />
          </td>
          <td>
            <q-skeleton
              type="text"
              width="100px"
              height="14px"
            />
          </td>
          <td class="text-end">
            <div class="row justify-end">
              <q-skeleton
                type="text"
                width="100px"
                height="14px"
              />
            </div>
          </td> -->
        </tr>
      </template>
      <template v-else>
        <template v-for="(item, n) in store.items" :key="n">
          <tr :class="item?.flag === '1' ? 'bg-light-blue-2' : ''">
            <td>
              <q-avatar
                v-if="item?.jns_kelamin === 'P'"
                glossy
                size="40px"
                class="overlapping"
              >
                <img src="../../../../assets/images/female.svg" />
              </q-avatar>
              <q-avatar v-else size="40px" class="overlapping" glossy
                ><img src="../../../../assets/images/male.svg"
              /></q-avatar>
            </td>
            <td>{{ item?.nik }}</td>
            <td>{{ item?.nama }}</td>
            <td>{{ getkelamin(item?.jns_kelamin) }} <br /></td>
            <td>
              {{ item?.alamat }}
            </td>
            <td>
              {{ item?.jabatan?.jenis }}
            </td>
            <td>
              {{ item?.komisi?.komisi }}
            </td>
            <!-- <td>
              {{ getstatusmu(item?.status) }}
            </td> -->
            <td>
              <q-btn
                color="black"
                size="sm"
                round
                glossy
                icon="eva-edit-2-outline"
                @click="formDialogx(item)"
              >
                <q-tooltip class="primary" :offset="[10, 10]"> Edit </q-tooltip>
              </q-btn>
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
            </td>
          </tr>
        </template>
      </template>
    </tbody>
    <formDialog v-model="dialog" :jabatan="jabatan" :komisi="komisi" />
  </table>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { useJabatanStore } from "src/stores/master/jabatan";
import { defineAsyncComponent, ref } from "vue";
import { useRouter } from "vue-router";

//const itemterpilih = ref({});
const formDialog = defineAsyncComponent(() => import("./FormDialogComp.vue"));
const dialog = ref(false);
const store = useAnggotaDewanStore();
const jabatanStore = useJabatanStore();

// const jabatan = ref([]);
// const komisi = ref([]);

function formDialogx(val) {
  // itemterpilih.value = val;
  dialog.value = true;

  store.form.id = val.id;
  store.form.nik = val.nik;
  store.form.nama = val.nama;
  store.form.jns_kelamin = val.jns_kelamin;
  store.form.alamat = val.alamat;
  store.form.id_jabatan = parseInt(val.id_jabatan);
  store.form.id_komisi = parseInt(val.id_komisi);
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
</style>

<template>
  <table>
    <thead>
      <tr>
        <th>NO.</th>
        <th>NAMA KOMISI</th>
        <!-- <th>STATUS</th> -->
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="store.loading">
        <tr v-for="n in store.params.per_page" :key="n"></tr>
      </template>
      <template v-else>
        <template v-for="(item, n) in store.items" :key="n">
          <tr :class="item?.flag === '1' ? 'bg-light-blue-2' : ''">
            <td width="20%">{{ n + 1 }}.</td>
            <td width="70%">{{ item?.komisi }}</td>
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
              <!-- <q-btn
                color="red"
                size="sm"
                round
                glossy
                icon="eva-person-delete-outline"
                :loading="store.loading"
                @click="store.lemparkomisi(item.id)"
              >
                <q-tooltip class="primary" :offset="[10, 10]">
                  Delete
                </q-tooltip>
              </q-btn> -->
            </td>
          </tr>
        </template>
      </template>
    </tbody>
    <formDialog v-model="dialog" />
  </table>
</template>

<script setup>
import { useKomisiStore } from "src/stores/master/komisi";
import { defineAsyncComponent, ref } from "vue";

const formDialog = defineAsyncComponent(() => import("./FormDialogComp.vue"));
const dialog = ref(false);
const store = useKomisiStore();

function formDialogx(val) {
  dialog.value = true;
  store.form.id = val.id;
  store.form.komisi = val.komisi;
}

// const props = defineProps({
//   komisi: { type: Array, default: () => [] },
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

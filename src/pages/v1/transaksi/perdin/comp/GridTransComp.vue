<template>
  <q-card-section>
    <table>
      <thead>
        <tr>
          <th width="2%">NO.</th>
          <th>NIK</th>
          <th>NAMA</th>
          <th>STATUS</th>
          <th>KOMISI</th>
          <th>GOLONGAN</th>
          <th>TINGKATAN</th>
          <th>JENIS TRANSAKSI</th>
          <th>BIAYA</th>
          <th>JUMLAH</th>
          <th>TOTAL</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="store.loading">
          <tr v-for="n in store.items" :key="n">
            <td>
              <q-skeleton type="text" />
            </td>
            <td>
              <q-skeleton type="text" />
            </td>
            <td>
              <q-skeleton type="text" />
            </td>
            <td>
              <q-skeleton type="text" />
            </td>
            <td>
              <q-skeleton type="text" />
            </td>
            <td>
              <q-skeleton type="text" />
            </td>
            <td>
              <q-skeleton type="text" />
            </td>
            <td>
              <q-skeleton type="text" />
            </td>
            <td>
              <q-skeleton type="text" />
            </td>
            <td>
              <q-skeleton type="text" />
            </td>
            <td>
              <q-skeleton type="text" />
            </td>
            <td class="text-end">
              <div class="row justify-end">
                <q-skeleton type="text" />
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <template v-for="(item, x) in store?.items" :key="x">
            <tr :class="item?.flag === '1' ? 'bg-light-blue-2' : ''">
              <td>{{ x + 1 }}.</td>
              <td>
                {{ item?.nik }}
              </td>
              <td>
                {{ item?.dewan[0]?.nama }}
              </td>
              <td>{{ item?.dewan[0]?.flag_pegawai?.nama }}</td>
              <td>
                {{ item?.dewan[0]?.komisi?.komisi }}
              </td>
              <td>
                {{ item?.dewan[0]?.golongan?.name }}
              </td>
              <td>
                {{ item?.dewan[0]?.tingkatan?.name }}
              </td>
              <td>
                {{ item?.jenisbiaya[0]?.name }}
              </td>
              <td>Rp. {{ rupiah(item?.biaya) }}</td>
              <td>
                {{ item?.berapa_kali }}
              </td>
              <td nowrap>Rp. {{ rupiah(item?.total_biaya) }}</td>
              <td>
                <q-btn
                  color="red"
                  size="sm"
                  round
                  glossy
                  icon="delete_forever"
                  @click="store.inithapus(item.id)"
                >
                  <q-tooltip class="primary" :offset="[10, 10]">
                    Delete
                  </q-tooltip>
                </q-btn>
              </td>
            </tr>
          </template>
        </template>
        <tr style="background-color: black; color: aliceblue">
          <td colspan="10" style="text-align: end">Subtotal</td>
          <td style="text-align: end">
            Rp.
            {{
              rupiah(
                store.items.reduce(
                  (total, curr) => (total = total + parseInt(curr.total_biaya)),
                  0
                )
              )
            }}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </q-card-section>
</template>

<script setup>
import { useTranskRinci } from "src/stores/transaksi/transrinci";
import { computed, onMounted } from "vue";

const rupiah = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const props = defineProps({
  jenistransaksi: { type: Array, default: () => [] },
});
const store = useTranskRinci();
// onMounted(() => {
//   console.log("sasasaaaaaaaaaaaa");
//   const grandTotals = store.items.total_biaya
//     .map((counter) => {
//       console.log("Subtotals", counter.subtotal);
//       return counter.subtotal;
//     })
//     .reduce((prev, curr) => (prev += curr), 0);
//   store.subtotal = 5;
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
}

th,
td {
  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
}
td {
  padding: 0.5em 0.5em 0.5em 1.5em;
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

td:nth-of-type(2) {
  font-style: italic;
}

// th:nth-of-type(3),
// td:nth-of-type(3) {
//   text-align: right;
// }
/* Fixed Headers */

th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}

th[scope="row"] {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
}

th[scope="row"] {
  vertical-align: top;
  color: inherit;
  background-color: inherit;
  background: linear-gradient(
    90deg,
    transparent 0%,
    transparent calc(100% - 0.05em),
    #d6d6d6 calc(100% - 0.05em),
    #d6d6d6 100%
  );
}

table:nth-of-type(2) th:not([scope="row"]):first-child {
  left: 0;
  z-index: 3;
  background: linear-gradient(
    90deg,
    #666 0%,
    #666 calc(100% - 0.05em),
    #ccc calc(100% - 0.05em),
    #ccc 100%
  );
}

/* Strictly for making the scrolling happen. */

th[scope="row"] + td {
  min-width: 24em;
}

th[scope="row"] {
  min-width: 20em;
}
</style>

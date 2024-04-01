<template>
  <div class="column">
    <div class="row justify-between items-center q-pa-sm bg-indigo text-white">
      <div class="kiri row q-gutter-sm items-center">
        <q-input
          outlined
          dark
          color="white"
          dense
          placeholder="Cari Transaksi ..."
          debounce="500"
          style="min-width: 200px"
        >
          <template #append>
            <q-icon
              name="close"
              icon="eva-close-outline"
              size="xs"
              class="cursor-pointer"
            />
          </template>
          <template #prepend>
            <q-icon size="sm" name="search" icon="search-outline" />
          </template>
        </q-input>
      </div>
      <div class="kanan">
        <q-btn
          unelevated
          round
          color="orange"
          size="sm"
          icon="add"
          @click="formDialogTransaksi()"
        >
          <q-tooltip class="primary" :offset="[10, 10]"> Add </q-tooltip>
        </q-btn>

        <q-btn
          v-if="props.adaRefresh"
          unelevated
          color="orange"
          round
          size="sm"
          icon="refresh"
          @click="store.refreshTable()"
        >
          <q-tooltip class="primary" :offset="[10, 10]">
            Refresh Table
          </q-tooltip>
        </q-btn>
        <!-- per page -->
        <q-btn
          v-if="props.adaPerPage"
          unelevated
          color="orange"
          round
          size="sm"
          icon="layers"
        >
          <q-tooltip class="primary" :offset="[10, 10]">
            Filter Table
          </q-tooltip>
          <q-menu
            transition-show="flip-left"
            transition-hide="flip-right"
            class="q-pt-sm"
            anchor="top left"
            self="top right"
          >
            <q-list>
              <q-item v-for="(opt, i) in options" :key="i" v-ripple tag="label">
                <q-item-section>
                  <q-radio
                    v-model="selectPerPage"
                    size="xs"
                    :val="opt"
                    :label="opt + ' Baris'"
                    color="primary"
                  />
                </q-item-section>
                <q-item-label />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
  </div>
  <formDialog v-model="dialogformtrans" />
</template>
<script setup>
import { computed, defineAsyncComponent, ref } from "vue";

const formDialog = defineAsyncComponent(() => import("./FormDialogComp.vue"));
const dialogformtrans = ref(false);
const props = defineProps({
  search: { type: String, default: "" },
  labelCari: { type: String, default: "Cari ..." },
  adaPerPage: { type: Boolean, default: false },
  adaRefresh: { type: Boolean, default: false },
  useFull: { type: Boolean, default: false },
  perPage: { type: Number, default: 5 },
});
// const q = computed({
//   get() {
//     return props.search;
//   },
//   set(newVal) {
//     emits("setSearch", newVal);
//   },
// });

function formDialogTransaksi() {
  dialogformtrans.value = true;
}
</script>

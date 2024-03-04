<template>
  <div class="column">
    <div class="row justify-between items-center q-pa-sm bg-indigo text-white">
      <div class="kiri row q-gutter-sm items-center">
        <q-input
          v-model="store.params.q"
          outlined
          dark
          color="white"
          dense
          placeholder="Cari Anggota ..."
          debounce="500"
          style="min-width: 200px"
          @keyup.enter="store.init()"
        >
          <template v-if="q" #append>
            <q-icon
              name="close"
              icon="eva-close-outline"
              size="xs"
              class="cursor-pointer"
              @click.stop.prevent="q = ''"
            />
          </template>
          <template #prepend>
            <q-icon size="sm" name="search" icon="search-outline" />
          </template>
        </q-input>
        <!-- <q-select
          v-model="txt"
          dense
          outlined
          dark
          color="white"
          :options="txts"
          label="status dewan"
          class="q-ml-sm"
          emit-value
          map-options
          style="min-width: 150px"
          @update:model-value="gantiTxt"
        /> -->
        <q-select
          v-model="txt"
          dense
          outlined
          dark
          color="white"
          :options="komisi"
          label="Komisi"
          class="q-ml-sm"
          emit-value
          map-options
          style="min-width: 150px"
          @update:model-value="gantiTxt"
        />
      </div>
      <div class="kanan">
        <q-btn
          unelevated
          round
          color="orange"
          size="sm"
          icon="add"
          @click="formDialogx()"
        >
          <q-tooltip class="primary" :offset="[10, 10]"> Add </q-tooltip>
        </q-btn>
        <!-- refresh Ids -->
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
  <formDialog v-model="dialog" :jabatan="jabatan" :komisi="komisi" />
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { useStyledStore } from "src/stores/app/styled";
import { useQuasar } from "quasar";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";

const txts = ref(["SEMUA", "AKTIF", "TIDAK AKTIF"]);
const formDialog = defineAsyncComponent(() => import("./FormDialogComp.vue"));
const dialog = ref(false);
// const style = useStyledStore()
const emits = defineEmits([
  "cari",
  "refresh",
  "setPerPage",
  "setSearch",
  "dialog",
]);
const props = defineProps({
  search: { type: String, default: "" },
  labelCari: { type: String, default: "Cari ..." },
  adaPerPage: { type: Boolean, default: false },
  adaRefresh: { type: Boolean, default: false },
  useFull: { type: Boolean, default: false },
  perPage: { type: Number, default: 5 },
  jabatan: { type: Array, default: () => [] },
  komisi: { type: Array, default: () => [] },
});

const store = useAnggotaDewanStore();

const q = computed({
  get() {
    return props.search;
  },
  set(newVal) {
    emits("setSearch", newVal);
  },
});

const options = ref([5, 10, 20, 50, 100]);
const selectPerPage = computed({
  get() {
    return props.perPage;
  },
  set(val) {
    emits("setPerPage", val);
  },
});

function gantiTxt(val) {
  if (val === "AKTIF") {
    store.params.status = "";
  } else if (val === "TIDAK AKTIF") {
    store.params.status = 1;
  } else {
    store.params.status = "all";
  }
  store.init();
}

const txt = ref("SEMUA");

function gantiPeriode() {
  // console.log(to.value)
  // console.log(from.value)
  const per = {
    status: gantiStatus(txt.value),
  };
  emits("setPeriode", per);
}

function formDialogx() {
  dialog.value = true;
}
</script>

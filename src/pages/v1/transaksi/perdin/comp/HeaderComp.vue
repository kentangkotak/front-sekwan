<template>
  <div class="column">
    <div class="row justify-between items-center q-pa-sm bg-indigo text-white">
      <div class="kiri row q-gutter-sm items-center">
        <q-input
          outlined
          dark
          color="white"
          dense
          placeholder="Cari Pendamping ..."
          debounce="500"
          style="min-width: 200px"
        >
          <template v-if="q" #append>
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
          @click="formDialogx()"
        >
          <q-tooltip class="primary" :offset="[10, 10]"> Add </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
  <form-dialog v-model="dialogform" />
</template>
<script setup>
import { computed, defineAsyncComponent, ref } from "vue";

const formDialog = defineAsyncComponent(() => import("./FormDialogComp.vue"));
const dialogform = ref(false);
// const q = computed({
//   get() {
//     return props.search;
//   },
//   set(newVal) {
//     emits("setSearch", newVal);
//   },
// });

function formDialogx() {
  // store.clear();
  dialogform.value = true;
}
</script>

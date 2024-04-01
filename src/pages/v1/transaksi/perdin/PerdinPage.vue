<template>
  <q-page
    class=""
    :class="
      style.componentfull
        ? 'container-no-header'
        : 'container--q-header q-pa-xs'
    "
  >
    <div class="heder" style="margin-top: 5px">
      <HeaderComp
        ada-per-page
        ada-refresh
        use-full
        :per-page="store.params.per_page"
        @cari="store.setSearch"
        @refresh="store.refresh"
        @set-per-page="store.setPerPage"
      />
    </div>
    <q-card flat no-shadow square class="my-flex-1 scroll">
      <ListPage />

      <div
        v-if="Object.keys(store.metaperdin).length"
        class="absolute-bottom bg-primary text-white"
      >
        <BottomComp
          v-if="store.metaperdin !== null"
          :key="store.metaperdin"
          :meta="store.metaperdin"
          @go-to="store.setPage"
        />
      </div>
    </q-card>
  </q-page>
</template>
<script setup>
import { useStyledStore } from "src/stores/app/styled";
import { defineAsyncComponent } from "vue";
import { usePerdinStore } from "src/stores/transaksi/perdin";

const style = useStyledStore();
const HeaderComp = defineAsyncComponent(() => import("./comp/HeaderComp.vue"));
const ListPage = defineAsyncComponent(() => import("./comp/ListPage.vue"));
const BottomComp = defineAsyncComponent(() => import("./comp/BottomPage.vue"));
const store = usePerdinStore();

store.gethedertransaksi();
</script>

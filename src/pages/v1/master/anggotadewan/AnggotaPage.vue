<template>
  <q-page
    class=""
    :class="
      style.componentfull
        ? 'container-no-header'
        : 'container--q-header q-pa-xs'
    "
  >
    <div class="header" style="margin-top: 5px">
      <HeaderComp
        ada-per-page
        ada-refresh
        use-full
        :per-page="wew.params.per_page"
        @cari="wew.setSearch"
        @refresh="wew.refresh"
        @set-per-page="wew.setPerPage"
        :komisi="komisiStore.items"
        :jabatan="jabatanStore.items"
      />
    </div>
    <q-card flat no-shadow square class="my-flex-1 scroll">
      <ListPage :jabatan="jabatanStore.items" :komisi="komisiStore.items" />

      <div
        v-if="Object.keys(wew.meta).length"
        class="absolute-bottom bg-primary text-white"
      >
        <BottomComp
          v-if="wew.meta !== null"
          :key="wew.meta"
          :meta="wew.meta"
          @go-to="wew.setPage"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";
import { useStyledStore } from "src/stores/app/styled";

import { store } from "quasar/wrappers";
import { useJabatanStore } from "src/stores/master/jabatan";
import { useKomisiStore } from "src/stores/master/komisi";

const HeaderComp = defineAsyncComponent(() => import("../comp/HeaderComp.vue"));
const ListPage = defineAsyncComponent(() => import("../comp/ListPage.vue"));
const BottomComp = defineAsyncComponent(() => import("../comp/BottomComp.vue"));
const jabatanStore = useJabatanStore();
const komisiStore = useKomisiStore();
const wew = useAnggotaDewanStore();
const style = useStyledStore();

wew.params.q = "";
wew.params.id_flag_pegawai = "1";
wew.getData();
jabatanStore.getData();
komisiStore.getData();
</script>

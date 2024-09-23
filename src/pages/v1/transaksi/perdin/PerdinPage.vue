<template>
  <q-page
    class=""
    :class="
      style.componentfull
        ? 'container-no-header'
        : 'container--q-header q-pa-xs'
    "
  >
    <div class="header bg-primary text-white">
      <HeaderComp
        class="q-pa-xs"
        :komisix="komisi.items"
        ada-per-page
        ada-refresh
        use-full
        :per-page="store.params.per_page"
        @cari="store.setSearch"
        @refresh="store.refresh"
        @set-per-page="store.setPerPage"
      />
    </div>
    <div class="footer absolute-bottom text-white z-top">
      <!-- <div
        v-if="store.dialog === false"
        class="footer absolute-bottom text-white z-top"
      > -->
      <BottomComp
        v-if="store.metaperdin !== null"
        :key="store.metaperdin"
        :meta="store.metaperdin"
        @go-to="store.setPage"
      />
      <!-- </div> -->
    </div>

    <q-card flat no-shadow class="my-flex-1 scroll">
      <q-scroll-area style="height: 750px">
        <ListPage :komisix="komisi.items" />
      </q-scroll-area>
    </q-card>
  </q-page>
</template>
<script setup>
import { useStyledStore } from "src/stores/app/styled";
import { defineAsyncComponent, onMounted } from "vue";
import { usePerdinStore } from "src/stores/transaksi/perdin";
import { useTranskRinci } from "src/stores/transaksi/transrinci";
import { useKomisiStore } from "src/stores/master/komisi";

const style = useStyledStore();
const HeaderComp = defineAsyncComponent(() => import("./comp/HeaderComp.vue"));
const ListPage = defineAsyncComponent(() => import("./comp/ListPage.vue"));
const BottomComp = defineAsyncComponent(() => import("./comp/BottomPage.vue"));
const store = usePerdinStore();
const storrinci = useTranskRinci();
const komisi = useKomisiStore();

onMounted(() => {
  // store.total = storrinci.totalall.reduce(
  //   (total, curr) => (total = total + parseInt(curr.total_biaya)),
  //   0
  // );
  // console.log("reduce", store.total);
  store.gethedertransaksi();
  komisi.init();
});
</script>

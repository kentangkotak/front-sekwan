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
        ada-per-page
        ada-refresh
        use-full
        :per-page="store.params.per_page"
        @cari="store.setSearch"
        @refresh="store.refresh"
        @set-per-page="store.setPerPage"
        :komisi="komisiStore.items"
        :golongan="storegolongan.items"
      />
    </div>
    <!-- <div
      v-if="Object.keys(store.meta).length"
      class="footer absolute-bottom text-white z-top"
    >
      <BottomComp
        v-if="store.meta !== null"
        :key="store.meta"
        :meta="store.meta"
        @go-to="store.setPage"
      />
    </div> -->

    <!-- <q-card flat no-shadow square class="my-flex-1 scroll">
      <ListPage :komisi="komisiStore.items" :golongan="storegolongan.items" />
    </q-card> -->
  </q-page>
</template>
<script setup>
import { useKomisiStore } from "src/stores/master/komisi";
import { usePendampingDewanStore } from "src/stores/master/pendampingdewan";
import { useStyledStore } from "src/stores/app/styled";
// import ListPage from "src/pages/v1/master/pendamping/comp/ListPageComp.vue";
import HeaderComp from "src/pages/v1/master/pendamping/comp/HeaderComp.vue";
// import BottomComp from "src/pages/v1/master/pendamping/comp/BottomComp.vue";
import { useGolonganStore } from "src/stores/master/golongan";
// import { onMounted } from "vue";

const komisiStore = useKomisiStore();

const store = usePendampingDewanStore();
const storegolongan = useGolonganStore();

const style = useStyledStore();

// onMounted(() => {
//   storegolongan.getData();
//   store.getData();
//   komisiStore.getData();
// });
</script>

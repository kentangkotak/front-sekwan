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
        :per-page="store.params.per_page"
        @cari="store.setSearch"
        @refresh="store.refresh"
        @set-per-page="store.setPerPage"
        :komisi="komisiStore.items"
      />
    </div>

    <q-card flat no-shadow square class="my-flex-1 scroll">
      <ListPage />

      <div
        v-if="Object.keys(store.meta).length"
        class="absolute-bottom bg-primary text-white"
      >
        <BottomComp
          v-if="store.meta !== null"
          :key="store.meta"
          :meta="store.meta"
          @go-to="store.setPage"
        />
      </div>
    </q-card>
  </q-page>
</template>
<script setup>
import { useStyledStore } from "src/stores/app/styled";
import { useKomisiStore } from "src/stores/master/komisi";
import { usePendampingDewanStore } from "src/stores/master/pendampingdewan";
import { defineAsyncComponent } from "vue";
import ListPage from "src/pages/v1/master/pendamping/comp/ListPageComp.vue";
import HeaderComp from "src/pages/v1/master/pendamping/comp/HeaderComp.vue";
import BottomComp from "src/pages/v1/master/pendamping/comp/BottomComp.vue";

//const HeaderComp = defineAsyncComponent(() => import("./comp/HeaderComp.vue"));
//const ListPage = defineAsyncComponent(() => import("./comp/ListPageComp.vue"));
//const BottomComp = defineAsyncComponent(() => import("./comp/BottomComp.vue"));

const komisiStore = useKomisiStore();

const store = usePendampingDewanStore();

const style = useStyledStore();

store.getData();
komisiStore.getData();
</script>

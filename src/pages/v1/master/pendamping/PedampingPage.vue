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
      />
    </div>

    <q-card flat no-shadow square class="my-flex-1 scroll">
      <ListPage />

      <div class="absolute-bottom bg-primary text-white">
        <BottomComp />
      </div>
    </q-card>
  </q-page>
</template>
<script setup>
import { useStyledStore } from "src/stores/app/styled";
import { usePendampingDewanStore } from "src/stores/master/pendampingdewan";
import { defineAsyncComponent } from "vue";

const HeaderComp = defineAsyncComponent(() => import("./comp/HeaderComp.vue"));
const ListPage = defineAsyncComponent(() => import("./comp/ListPageComp.vue"));
const BottomComp = defineAsyncComponent(() => import("./comp/BottomComp.vue"));

const store = usePendampingDewanStore();

const style = useStyledStore();

store.getData();
</script>

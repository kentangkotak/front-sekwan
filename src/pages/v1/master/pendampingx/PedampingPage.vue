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
        @cari="store.filterData"
        @refresh="store.refresh"
        @set-per-page="store.setPerPage"
        :komisi="komisiStore.items"
        :golongan="storegolongan.items"
      />
    </div>

    <div
      v-if="Object.keys(store.meta).length"
      class="footer absolute-bottom text-white z-top"
    >
      <div v-if="store.dialog === false">
        <BottomComp
          v-if="store.meta !== null"
          :key="store.meta"
          :meta="store.meta"
          @go-to="store.setPage"
        />
      </div>
    </div>

    <q-card flat no-shadow class="my-flex-1 scroll">
      <ListPageComp
        :komisi="komisiStore.items"
        :golongan="storegolongan.items"
      />
    </q-card>
  </q-page>
</template>
<script setup>
import { useStyledStore } from "src/stores/app/styled";
import HeaderComp from "../pendampingx/comp/HeaderComp.vue";
import ListPageComp from "../pendampingx/comp/ListPageComp.vue";
import BottomComp from "../pendampingx/comp/BottomComp.vue";
import { usePendampingDewanStorex } from "src/stores/master/pendampingdewanx";
import { onMounted } from "vue";
import { useKomisiStore } from "src/stores/master/komisi";
import { useGolonganStore } from "src/stores/master/golongan";

const style = useStyledStore();
const store = usePendampingDewanStorex();
const komisiStore = useKomisiStore();
const storegolongan = useGolonganStore();

onMounted(() => {
  store.getData();
  komisiStore.getData();
  storegolongan.getData();
});
</script>

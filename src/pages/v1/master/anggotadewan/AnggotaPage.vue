<template>
  <q-page
     class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header">
      <HeaderComp
        ada-per-page
        ada-refresh
        use-full
        :search="store.params.q"
        :per-page="store.params.per_page"
        @cari="store.setSearch"
        @refresh="store.refresh"
        @set-per-page="store.setPerPage"
      />
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
    >
        <ListPage />
      <div
        v-if="Object.keys(store.meta).length"
        class="absolute-bottom bg-primary text-white"
      >
        <BottomComp
          :meta="store.meta"
          @go-to="store.setPage"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan"
import { useStyledStore } from 'src/stores/app/styled'

const HeaderComp = defineAsyncComponent(() => import('../comp/HeaderComp.vue'))
const ListPage = defineAsyncComponent(() => import('../comp/ListPage.vue'))
const BottomComp = defineAsyncComponent(() => import('../comp/BottomComp.vue'))

const store = useAnggotaDewanStore()
const style = useStyledStore()

</script>



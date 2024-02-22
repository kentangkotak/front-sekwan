<template>
  <q-page
     class=""
    :class="style.componentfull?'container-no-header':'container--q-header q-pa-xs'"
  >
    <div class="header" style="margin-top: 5px;">
      <HeaderComp
        ada-per-page
        ada-refresh
        use-full
        :search="wew.params.q"
        :per-page="wew.params.per_page"
        @cari="wew.setSearch"
        @refresh="wew.refresh"
        @set-per-page="wew.setPerPage"
      />
    </div>
    <q-card
      flat
      no-shadow
      square
      class="my-flex-1 scroll"
    >
    {{ wew.items }}
    <ListPage />

      <div
        v-if="Object.keys(wew.meta).length"
        class="absolute-bottom bg-primary text-white"
      >
        <BottomComp
          :meta="wew.meta"
          @go-to="wew.setPage"
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

const wew = useAnggotaDewanStore()
const style = useStyledStore()

wew.getData()

</script>



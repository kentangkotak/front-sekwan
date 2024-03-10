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
      <HeaderComp />
    </div>
    <q-card><ListPage /> </q-card>

    <div>
      <BottomComp />
    </div>
  </q-page>
</template>
<script setup>
import { useStyledStore } from "src/stores/app/styled";
import { defineAsyncComponent } from "vue";
const style = useStyledStore();
const HeaderComp = defineAsyncComponent(() => import("./comp/HeaderComp.vue"));
const ListPage = defineAsyncComponent(() => import("./comp/ListPage.vue"));
const BottomComp = defineAsyncComponent(() => import("./comp/BottomPage.vue"));
</script>

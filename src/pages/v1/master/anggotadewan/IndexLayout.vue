<template>
  <q-page>
    <Suspense>
      <AsyncComp />
      <template #fallback> </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const AsyncComp = defineAsyncComponent(() => import("./AnggotaPage.vue"));
import AnggotaPage from "./AnggotaPage.vue";
//import AppLoadingx from "src/components/~global/AppLoadingx.vue";
import { useAnggotaDewanStore } from "src/stores/master/anggotadewan";

const store = useAnggotaDewanStore();
//import { defineComponent } from 'vue'

// export default defineComponent({
//   name: './AnggotaPage.vue'
// })
</script>

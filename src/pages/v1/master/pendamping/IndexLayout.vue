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

const AsyncComp = defineAsyncComponent(() => import("./PedampingPage.vue"));

//import { defineComponent } from 'vue'

// export default defineComponent({
//   name: './AnggotaPage.vue'
// })
</script>

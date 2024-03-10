<template>
  <q-page>
    <Suspense>
      <AsyncComp />
      <template #fallback> <AppLoading /> </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const AsyncComp = defineAsyncComponent(() => import("./AnggotaPage.vue"));
const AppLoading = defineAsyncComponent(() =>
  import("../../../../components/~global/AppLoading.vue")
);
//import { defineComponent } from 'vue'

// export default defineComponent({
//   name: './AnggotaPage.vue'
// })
</script>

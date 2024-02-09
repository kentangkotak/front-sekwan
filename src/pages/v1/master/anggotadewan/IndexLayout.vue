<template>
  <q-page>
    <Suspense>
      <AsyncComp />
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./AnggotaPage.vue')
)

//import { defineComponent } from 'vue'

// export default defineComponent({
//   name: './AnggotaPage.vue'
// })
</script>

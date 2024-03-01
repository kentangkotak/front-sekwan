<template>
  <q-page>
    <Suspense>
      <AsyncComp />

      <template #fallback>
        <div class="fixed-center">
          <!-- <q-spinner-hourglass
            color="purple"
            size="4em"
          /> -->
          <AppLoading/>
        </div>
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./AnggotaPage.vue')
)

const AppLoading = defineAsyncComponent(() =>
  import('../../../../components/~global/AppLoading.vue')
)

//import { defineComponent } from 'vue'

// export default defineComponent({
//   name: './AnggotaPage.vue'
// })
</script>

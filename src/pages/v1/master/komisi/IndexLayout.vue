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

const AsyncComp = defineAsyncComponent(() => import("./KomisiPage.vue"));
</script>

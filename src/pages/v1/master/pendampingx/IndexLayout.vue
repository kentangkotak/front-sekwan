<template>
  <q-page>
    <Suspense>
      <PedampingPage />
      <template #fallback> </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import PedampingPage from "./PedampingPage.vue";
</script>

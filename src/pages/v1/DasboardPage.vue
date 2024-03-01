<template>
  <q-page class=" bg-primary">
    <div class="fixed-center">
      <AppLoading/>
    </div>
    <!-- <h5>selamat datang</h5> -->
    <div class="text-h1">SELAMAT DATANG.......</div>
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const AppLoading = defineAsyncComponent(() =>
  import('../../components/~global/AppLoading.vue')
)
</script>


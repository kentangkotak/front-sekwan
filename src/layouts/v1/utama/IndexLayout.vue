<template>
  <q-layout view="hhr LpR lfr">
    <HeaderLayout
     @click="toggleLeftDrawer"
    />
    <LeftDrawer
      v-model="leftDrawerOpen"
      style="margin-top: 50px;"
    />
  </q-layout>

</template>
<script setup>
import{ ref } from 'vue'
import HeaderLayout from "./HederLayout.vue";
import LeftDrawer from "./MenukiriLayout.vue";


const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="hHh LpR lff">
    <HeaderLayout
     @click="toggleLeftDrawer"
    />
    <LeftDrawer
      v-model="leftDrawerOpen"
    />

    <q-page-container >
      <router-view
          v-slot="{ Component }"
        >
          <transition
            name="fade"
            mode="in-out"
          >
            <component :is="Component" />
          </transition>
        </router-view>
    </q-page-container>

  </q-layout>


  <!-- <q-layout view="hhr LpR lfr">
    <HeaderLayout
     @click="toggleLeftDrawer"
    />
    <LeftDrawer
      v-model="leftDrawerOpen"
      style="margin-top: 50px;"
    />

  </q-layout> -->
</template>
<script setup>
import{ ref } from 'vue'
import HeaderLayout from "../../../pages/v1/utama/HederLayout.vue";
import LeftDrawer from "../../../pages/v1/utama/MenukiriLayout.vue";


const leftDrawerOpen = ref(true)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

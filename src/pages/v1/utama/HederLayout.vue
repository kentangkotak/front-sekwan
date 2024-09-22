<template>
  <q-header class="bg-indigo text-white" elevated>
    <q-toolbar class="glossy">
      <q-btn dense flat round icon="menu" />
      <q-toolbar-title>
        <q-avatar>
          <img src="../../../../public/icons/sekwan.png" />
        </q-avatar>
        <b> SISTEM APLIKASI DPRD KOTA PROBOLINGGO</b>
      </q-toolbar-title>
      <q-btn
        dense
        flat
        icon="logout"
        Weight="700"
        Grade="200"
        rounds
        @click="logout()"
      />
    </q-toolbar>
  </q-header>
</template>
<script setup>
function logout() {
  localStorage.clear();
}
</script>

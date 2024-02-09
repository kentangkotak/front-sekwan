<template>
  <q-drawer
    show-if-above
    :width="300"
    elevated
  >
    <q-scroll-area class="fit">
      <div
        class="q-pa-md"
        style="max-width: 300px"
      >
        <q-list
          bordered
          class="rounded-borders text-primary"
        >
          <q-expansion-item class="bg-indigo text-white">
            <template #header>
              <q-item-section>DATA MASTER</q-item-section>
            </template>
            <q-list>
              <q-item
                v-ripple
                clickable
                active-class="my-menu-link"
                to="/masteruser"
                class="bg-indigo-1 text-dark"
              >
                <q-item-section avatar>
                  <q-icon name="book" />
                </q-item-section>
                <q-item-section class="text-bold">
                  USER
                </q-item-section>
              </q-item>
              <q-item
                v-ripple
                clickable
                active-class="my-menu-link"
                to="/masterbarang"
                class="bg-indigo-1 text-dark"
              >
                <q-item-section avatar>
                  <q-icon name="work_outline" />
                </q-item-section>
                <q-item-section class="text-bold">
                  KOMISI
                </q-item-section>
              </q-item>
              <q-item
                v-ripple
                clickable
                active-class="my-menu-link"
                @click="panggil()"
                class="bg-indigo-1 text-dark"
              >
                <q-item-section avatar>
                  <q-icon name="people" />
                </q-item-section>
                <q-item-section class="text-bold">
                  ANGGOTA DEWAN
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-separator/>

          <q-expansion-item class="bg-indigo text-white">
            <template #header>
              <q-item-section>DATA TRANSAKSI</q-item-section>
            </template>
            <q-list>
              <q-item
                v-ripple
                clickable
                active-class="my-menu-link"
                to="/masteruser"
                class="bg-indigo-1 text-dark"
              >
                <q-item-section avatar>
                  <q-icon name="store" />
                </q-item-section>
                <q-item-section class="text-bold">
                  PERJALANAN DINAS
                </q-item-section>
              </q-item>
              <q-item
                v-ripple
                clickable
                active-class="my-menu-link"
                to="/masterbarang"
                class="bg-indigo-1 text-dark"
              >
                <q-item-section avatar>
                  <q-icon name="work_outline" />
                </q-item-section>
                <q-item-section class="text-bold">
                  KOMISI
                </q-item-section>
              </q-item>
              <q-item
                v-ripple
                clickable
                active-class="my-menu-link"
                to="/masterbarang"
                class="bg-indigo-1 text-dark"
              >
                <q-item-section avatar>
                  <q-icon name="people" />
                </q-item-section>
                <q-item-section class="text-bold">
                  ANGGOTA DEWAN
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </q-list>
      </div>
    </q-scroll-area>
  </q-drawer>

</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import toggleLeftDrawer from './HederLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function panggil() {
  console.log('wew',router)
  router.push({ path: "/anggotadewan"})
  // return { panggil }
}


</script>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>

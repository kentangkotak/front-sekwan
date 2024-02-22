<template>
  <q-layout class="bg-green-1">
    <q-page-container>
      <q-page class="home-page window-height window-width row justify-center items-center ">
        <q-card class="row flex inline shadow-box flex-center shadow-21 justify-center q-pa-md bg-green-10 pigura">
          <div
            class="self-center wewfont"
            style="margin-bottom: -100px;"
          >
            <q-item-label style="color: rgb(235, 235, 240);">
              <em><u>DPRD KOTA PROBOLINGGO</u></em>
            </q-item-label>
          </div>

          <div
            class="self-center "
            style="width: 600px; height: 300px;"
          >
            <div class="row col-5">
              <div
                class="row"
                style="border-right-style: solid;border-color:black;"
              >
                <div
                  class="col self-center"
                  style="width:110px;margin-right: 10px;"
                >
                </div>
              </div>
              <div class="row">
                <div class="col self-center">
                  <q-form
                    ref="myForm"
                    style="width: 450px;margin: 0px auto;"
                    class="q-gutter-md"
                    @submit="onSubmit"

                  >
                    <q-input
                      v-model="form.username"
                      autofocus
                      filled
                      label="User Name*"
                      bg-color="white"
                      style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;"
                      error-message="User Name Tidak Boleh kosong"
                      lazy-rules
                      :rules="[val => !!val || 'Harap diisi terlebih dahulu']"
                    />

                    <q-input
                      v-model="form.pass"
                      filled
                      label="Password"
                      bg-color="white"
                      error-message="Password Tidak Boleh kosong"
                      style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;"
                      lazy-rules
                      :rules="[val => !!val || 'Harap diisi terlebih dahulu']"
                      :type="isPasw ? 'password' : 'text'"
                    />
                    <div>
                      <q-btn
                        label="Login"
                        color="negative"
                        type="submit"
                      />
                          &nbsp;
                      <q-btn
                        label="Reset"
                        type="reset"
                        color="negative"
                      />
                    </div>
                  </q-form>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>

import { ref } from 'vue'
import { useQuasar } from 'quasar';
//import { useAuthStore } from 'src/stores/auth'
import { useAuthStore } from 'src/stores/auth'
const $q = useQuasar()

const isPasw = ref(true)
const myForm = ref(null)
const form = ref({
  username: '',
  pass: '',
})

const storeAuth = useAuthStore()
function onSubmit () {
  const formData = new FormData()
  formData.append('username', form.value.username)
  formData.append('password', form.value.pass)
  storeAuth.login(formData)
}

function resetform() {
  const formData = new FormData()
  this.form.username.value = ''

}

</script>

<style lang="scss" scoped>
.wewfont{
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: xx-large;
  font-style: italic;

}

.pigura{
  width: 700px;height: 500px;
  border-top-left-radius: 1000px;
  border-bottom-right-radius: 1000px;
}
</style>

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

                    style="width: 450px;margin: 0px auto;"
                    class="q-gutter-md"

                  >
                    <q-input
                      v-model="username"
                      autofocus
                      filled
                      label="User Name*"
                      bg-color="white"
                      style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;"
                      error-message="User Name Tidak Boleh kosong"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Masukkan Username Anda']"
                    />

                    <q-input
                      v-model="pass"
                      filled
                      type="password"
                      label="Password"
                      bg-color="white"
                      error-message="Password Tidak Boleh kosong"
                      style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Masukkan Password Anda']"
                    />
                    <div>
                      <q-btn
                        label="Login"
                        color="negative"
                        @click="login"
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
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const username = ref()
const pass = ref()
// const form = ref({
//   username: '',
//   pass: '',
// })

const router = useRouter()


// function onSubmit () {
//   const formData = new FormData()
//   formData.append('email', form.value.email + '@app.com')
//   formData.append('password', form.value.password)
//   storeAuth.login(formData)
// }

// function onReset () {
//   const formData = new FormData()
// }

const login = () => {
  router.push({ path: "/"})
  return { login }
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

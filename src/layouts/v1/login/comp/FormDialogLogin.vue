<template>
  <div class="container">
    <div class="screen">
      <div class="screen__content">
        <q-form ref="myForm" class="login" @submit="onSubmit">
          <!-- <q-img
            src="public/icons/sekwan.png"
            style="height: 100px; max-width: 100px"
            :ratio="1"
            class="items-center"
          /> -->
          <div class="column items-center text-bold">
            <div style="color: orangered; font-size: x-large">
              <em>SEKRETARIAT DEWAN</em>
            </div>
          </div>
          <div class="column items-center text-bold">
            <div style="color: orangered; font-size: x-large">
              <em>KOTA PROBOLINGGO</em>
            </div>
          </div>
          <!-- <label style="color: white; font-size: large">
            <b
              >Sekretariat Dewan Kota <br />
              Probolinggo</b
            >
          </label> -->
          <div class="login__field">
            <!-- <q-icon name="person" /> -->
            <q-input
              v-model="form.username"
              label="User Name"
              autofocus
              outlined
              bg-color="white"
              color="indigo"
              :rules="[(val) => !!val || 'Harap diisi terlebih dahulu']"
            >
              <template v-slot:append>
                <q-icon :name="matAccountCircle" />
              </template>
            </q-input>
          </div>
          <div class="login__field">
            <!-- <i class="login__icon fas fa-lock"></i> -->
            <q-input
              v-model="form.pass"
              label="Password"
              bg-color="white"
              outlined
              color="indigo"
              :rules="[(val) => !!val || 'Harap diisi terlebih dahulu']"
              :type="isPasw ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon :name="matLock" />
              </template>
            </q-input>
          </div>
          <q-btn
            class="button login__submit"
            :icon-right="matLogin"
            label="Log In"
            type="submit"
          />
        </q-form>
      </div>
      <div class="screen__background"></div>
    </div>
  </div>
</template>

<script setup>
import { matAccountCircle } from "@quasar/extras/material-icons";
import { matLock } from "@quasar/extras/material-icons";
import { matLogin } from "@quasar/extras/material-icons";
import { useAuthStore } from "src/stores/auth";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

const form = ref({
  username: "",
  pass: "",
});
const isPasw = ref(true);
const myForm = ref(null);
const router = useRouter();

const auth = computed(() => {
  return storeAuth.token;
});

const storeAuth = useAuthStore();

function onSubmit() {
  const formData = new FormData();
  formData.append("username", form.value.username);
  formData.append("password", form.value.pass);
  storeAuth.login(formData);
}

watch(
  auth,
  (n, o) => {
    // console.log('n',n)
    // console.log('o',o)
    if (n !== null) {
      router.push()({ path: "/" });
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway:400,700");

* {
  box-sizing: border-box;
  margin: -100;
  padding: 0;
  font-family: Raleway, sans-serif;
}

body {
  background: linear-gradient(90deg, #c7c5f4, #776bcc);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 110vh;
}

.screen {
  background: linear-gradient(90deg, #5d54a4, #7c78b8);
  position: relative;
  height: 500px;
  width: 360px;
  box-shadow: 0px 0px 24px #5c5696;
}

.screen__content {
  margin-top: -100px;
  z-index: 1;
  position: relative;
  height: 100%;
}

.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #fff;
  top: -50px;
  right: 120px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6c63ac;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5d54a4, #6a679e);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7e7bb9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}

.login__icon {
  position: absolute;
  top: 30px;
  color: #7875b5;
}

.login__input {
  border: none;
  border-bottom: 2px solid #d1d1d4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: 0.2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
  outline: none;
  border-bottom-color: #6a679e;
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #d4d3e8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4c489d;
  box-shadow: 0px 2px 2px #5c5696;
  cursor: pointer;
  transition: 0.2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
  border-color: #6a679e;
  outline: none;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #7875b5;
}

.social-login {
  position: absolute;
  height: 140px;
  width: 160px;
  text-align: center;
  bottom: 0px;
  right: 0px;
  color: #fff;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-login__icon {
  padding: 20px 10px;
  color: #fff;
  text-decoration: none;
  text-shadow: 0px 0px 8px #7875b5;
}

.social-login__icon:hover {
  transform: scale(1.5);
}
</style>

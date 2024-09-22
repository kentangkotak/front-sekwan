<template>
  <div class="background">
    <div class="shape"></div>
    <div class="shape"></div>
  </div>
  <q-form ref="myForm" class="login" @submit="onSubmit">
    <h5 text-center>SEKRETARIAT DEWAN KOTA PROBOLINGGO</h5>

    <label for="username">Username</label>
    <q-input
      v-model="form.username"
      autofocus
      outlined
      bg-color="indigo-11"
      standout="bg-orange-12"
      :rules="[(val) => !!val || 'Harap diisi terlebih dahulu']"
    >
      <template v-slot:append>
        <q-icon :name="matAccountCircle" />
      </template>
    </q-input>

    <label for="password">Password</label>
    <q-input
      v-model="form.pass"
      label="Password"
      bg-color="indigo-11"
      standout="bg-orange-12"
      outlined
      :rules="[(val) => !!val || 'Harap diisi terlebih dahulu']"
      :type="isPasw ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon :name="matLock" />
      </template>
    </q-input>

    <q-btn :icon-right="matLogin" label="Log In" type="submit" color="red" />
  </q-form>
</template>

<script setup>
import { matAccountCircle } from "@quasar/extras/material-icons";
import { matLock } from "@quasar/extras/material-icons";
import { matLogin } from "@quasar/extras/material-icons";
import { fromJSON } from "postcss";
import { useAuthStore } from "src/stores/auth";
import { computed, onBeforeMount, ref, watch } from "vue";
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
      router.push({ path: "/" });
    }
  },
  { deep: true }
);

onBeforeMount(() => {
  form.value.username = "";
  form.value.pass = "";
});
</script>
<style lang="scss" scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: #080710;
}
.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child {
  background: linear-gradient(#1845ad, #23a2f6);
  left: -80px;
  top: -80px;
}
.shape:last-child {
  background: linear-gradient(to right, #ff512f, #f09819);
  right: -30px;
  bottom: -80px;
}
form {
  height: 520px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}
form * {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}
input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder {
  color: #e5e5e5;
}
button {
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
.social {
  margin-top: 30px;
  display: flex;
}
.social div {
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}
.social .fb {
  margin-left: 25px;
}
.social i {
  margin-right: 4px;
}
</style>

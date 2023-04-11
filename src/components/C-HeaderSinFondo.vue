<template>
  <v-app-bar app>
    <v-toolbar color="grey-darken-4" prominent clipped-left>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" class="d-sm-flex d-md-none"></v-app-bar-nav-icon>
      <img src="../assets/images/logo.png" alt="logo" class="logo d-none d-sm-block">

      <v-toolbar-title class="title d-none d-md-block">Namekians
        <span class="text-no-wrap" style="width: 8rem;">Games</span></v-toolbar-title>

        <v-toolbar-title class="title d-sm-flex d-md-none">Namekians<br>
        <span class="text-no-wrap" style="width: 8rem;">Games</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-md-block" justify-end>
        <v-btn class="link" text>Explorar</v-btn>
        <v-btn class="link" text @click="goLogin()">Login</v-btn>
        <v-btn class="link" text @click="goSignUp()">Registro</v-btn>
        <v-btn class="link" text>Contacto</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" active-color="#F80808">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()


const drawer = ref(false)
const group = ref(null)

const items = [
  {
    title: 'Explorar',
    value: 'explorar',
    icon: 'fa-solid fa-eye'
  },
  {
    title: 'Registro',
    value: 'registro',
    icon: 'fa-solid fa-user-plus'
  },
  {
    title: 'Login',
    value: 'login',
    icon: 'fa-solid fa-right-to-bracket'
  },
  {
    title: 'Contacto',
    value: 'contacto',
    icon: 'fa-sharp fa-solid fa-inbox'
  },
]

watch(group, () => {
  drawer.value = false
})

const goLogin = () => {
  router.push({ path: '/login' })
}

const goSignUp = () => {
  router.push({ path: '/registro' })
}

</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}

.cover {
  background-image: url(../assets/images/test.png);
  width: 100%;
  height: 100%;
  position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.full-screen-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.logo {
  color: white;
  width: 80px;
  margin-left: 20px;
  height: 65px;
}

.link {
  font-size: 14px;
  font-weight: 600;
}

.link::before {
  background-color: transparent !important;
}

.link:hover {
  color: rgb(248, 8, 8);
  transition: 0.3s;
}

.title {
  color: #fff;
  white-space: nowrap;
}

.title span {
  color: rgb(248, 8, 8);
  font-size: 1.1em;
}

</style>
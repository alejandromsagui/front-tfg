<template>
  <v-app-bar app>
    <v-toolbar color="grey-darken-4" prominent clipped-left>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" class="d-sm-flex d-md-none"></v-app-bar-nav-icon>
      <img src="../assets/images/logo.png" alt="logo" class="logo d-none d-sm-block">

      <v-toolbar-title class="title d-none d-md-flex">
        <div class="d-flex">
          <span style="color: #fff;">Namekians</span>
          <span>Games</span>
        </div>
      </v-toolbar-title>

      <v-toolbar-title class="title d-sm-flex d-md-none">Namekians<br>
        <span class="text-no-wrap">Games</span></v-toolbar-title>
      <template v-if="!authenticated">
        <v-spacer></v-spacer>
        <v-toolbar-items class="d-none d-md-block" justify-end>
          <v-btn class="link" text @click="goLogin()">
            <i class="fas fa-right-to-bracket mr-2"></i> Login
          </v-btn>
          <v-btn class="link mr-12" text @click="goSignUp()">
            <i class="fa-solid fa-user-plus mr-2"></i> Registro</v-btn>
          <v-icon class="link fas fa-search mr-5" size="14"></v-icon>
        </v-toolbar-items>
      </template>

      <template v-else>
        <v-spacer></v-spacer>
        <v-btn class="link" text>
          <i class="fa-solid fa-user"></i> Perfil
        </v-btn>
        <v-btn class="link" text @click="logout()">
          <i class="fa-solid fa-right-from-bracket"></i> Desconectar
        </v-btn>
      </template>
    </v-toolbar>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <template v-if="!authenticated">
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :value="item" active-color="#F80808"
          @click="menuActionClick(item.action)">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>

    <template v-else>
      <v-list>
        <v-list-item v-for="(itemLogged, i) in itemsLogged" :key="i" :value="itemLogged" active-color="#F80808"
          @click="menuActionClick(itemLogged.action)">
          <template v-slot:prepend>
            <v-icon :icon="itemLogged.icon"></v-icon>
          </template>
          <v-list-item-title>{{ itemLogged.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login';
import { storeToRefs } from 'pinia';


const router = useRouter()

const userStore = useLoginStore()
const { authenticated } = storeToRefs(userStore)
const token = localStorage.getItem('token')

onMounted(() => {
  if(token){
    authenticated.value = true
  }else{
    authenticated.value = false
  }
})

onBeforeUnmount(() => {
  if(!token){
    router.push({ path: '/login' })
  }
})

console.log('Logado? ' + authenticated.value);

const drawer = ref(false)
const group = ref(null)

const items = [

  {
    title: 'Login',
    value: 'login',
    icon: 'fa-solid fa-right-to-bracket',
    action: "login"
  },
  {
    title: 'Registro',
    value: 'registro',
    icon: 'fa-solid fa-user-plus',
    action: "register"
  }
]


const itemsLogged = [{
  title: 'Perfil',
  value: 'perfil',
  icon: 'fa-solid fa-user',
  action: "profile"
},
{
  title: 'Desconectar',
  value: 'desconectar',
  icon: 'fa-solid fa-right-from-bracket',
  action: "logout"
}
]
watch(group, () => {
  drawer.value = false
})

watch(authenticated, () => {
  if(authenticated.value === false){
    router.push({ path: '/login'})
  }
})

const menuActionClick = (action) => {
  if (action === "login") {
    router.push({ path: '/login' })
  } else if (action === "register") {
    router.push({ path: '/registro' })
  } else if (action === "profile") {
    router.push({ path: '#' })
  } else {
    logout()
    router.push({ path: '/login' })
  }
}
const goLogin = () => {
  router.push({ path: '/login' })
}

const goSignUp = () => {
  router.push({ path: '/registro' })
}

const logout = () => {
  userStore.logout()
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

.title span {
  color: rgb(248, 8, 8);

}
</style>
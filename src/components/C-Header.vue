<template>
  <v-app-bar app color="transparent">
    <v-toolbar color="grey-darken-4" prominent clipped-left>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" class="d-sm-flex d-md-none"></v-app-bar-nav-icon>
      <router-link to="/">
      <img src="../assets/images/logo.png" alt="logo" class="logo d-none d-sm-block">
    </router-link>

      <router-link to="/">
      <v-toolbar-title class="title d-none d-md-flex">
        <div class="d-flex">
          <span style="color: #fff;">Namekians</span>
          <span>Games</span>
        </div>
      </v-toolbar-title>
    </router-link>

      <v-toolbar-title class="title d-sm-flex d-md-none">Namekians<br>
        <span class="text-no-wrap">Games</span></v-toolbar-title>
        
      <template v-if="!authenticated">
        <v-spacer></v-spacer>
        <v-toolbar-items class="d-none d-md-block mr-4" justify-end>
          <v-btn text @click="goLogin()" class="link">
            <i class="fas fa-right-to-bracket mr-2"></i> Acceso
          </v-btn>
          <CSearchBar/>
        </v-toolbar-items>
      </template>

      <template v-else>
        <v-spacer></v-spacer>
        <v-toolbar-items class="d-none d-md-block">
          <v-btn class="link" text>
            <i class="fa-solid fa-upload mr-1"></i> Subir
          </v-btn>
          <v-btn class="link" text>
            <i class="fa-solid fa-user mr-1"></i> Perfil
          </v-btn>
          <v-btn class="link" stacked v-if="hasNotifications">
            <v-badge color="error" floating content="0">
              <i class="fa-solid fa-message mr-1"></i> Chat
            </v-badge>
          </v-btn>
          <v-btn class="link" text v-if="!hasNotifications">
              <i class="fa-solid fa-message mr-1"></i> Chat
          </v-btn>
          <v-btn class="link" text>
            <i class="fa-solid fa-cart-shopping mr-1"></i> Carrito
          </v-btn>
          <v-btn class="link mr-10" text @click="logout()">
            <i class="fa-solid fa-right-from-bracket mr-1"></i> Salir
          </v-btn>
        </v-toolbar-items>
        <v-icon class="link fas fa-search mr-5" size="14"></v-icon>
      </template>
    </v-toolbar>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary floating width="360" class="mx-0">
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
      <v-list-item-title class="items pt-4">
        <v-row no-gutters>
          <v-col class="align-center" cols="auto">
            <v-list-item class="pa-0">
              <v-avatar image="../src/assets/images/avatar.jpg" size="80" class="ml-6"></v-avatar>
            </v-list-item>
          </v-col>
          <v-col class="align-center" cols="auto">
            <v-list-item class="pa-0 d-flex">
              <p class="data ml-8 mt-4">nombre de usuario</p>
              <p class="data ml-8">usuario@gmail.com</p>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list-item-title>


      <v-list class="options">
        <v-list-item v-for="(itemLogged, i) in itemsLogged" :key="i" :value="itemLogged" active-color="#F44336"
          @click="menuActionClick(itemLogged.action)">
          <template v-slot:prepend>
            <v-icon :icon="itemLogged.icon"></v-icon>
          </template>
          <v-list-item-title class="mt-2" style="font-size: 1.1em">{{ itemLogged.title }}</v-list-item-title>
        </v-list-item>
      </v-list>

    </template>
    <template v-slot:append v-if="authenticated">
      <div class="pa-2">
        <v-btn block color="black" @click="logout()">
          Desconectarse
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { CSearchBar } from '../components'
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login';
import { storeToRefs } from 'pinia';


const router = useRouter()

const userStore = useLoginStore()
const { authenticated } = storeToRefs(userStore)
const token = localStorage.getItem('token')

const hasNotifications = ref(false)

onMounted(() => {
  if (token) {
    authenticated.value = true
  } else {
    authenticated.value = false
  }
})

onBeforeUnmount(() => {
  if (!token) {
    router.push({ path: '/acceso' })
  }
})



const drawer = ref(false)
const group = ref(null)

const items = [

  {
    title: 'Acceder',
    value: 'Acceder',
    icon: 'fa-solid fa-right-to-bracket',
    action: "login"
  }
]


const itemsLogged = [{
  title: 'Perfil',
  value: 'perfil',
  icon: 'fa-solid fa-user',
  action: "profile"
},
{
  title: 'Subir juego',
  value: 'subir',
  icon: 'fa-solid fa-upload',
  action: '#'
},
{
  title: 'Chat',
  value: 'chat',
  icon: 'fa-solid fa-message',
  action: '#'
},
{
  title: 'Historial de compras',
  value: 'historial de compras',
  icon: 'fa-sharp fa-solid fa-shop',
  action: '#'
}
]
watch(group, () => {
  drawer.value = false
})

watch(authenticated, () => {
  if (authenticated.value === false) {
    router.push({ path: '/acceso' })
  }
})

const menuActionClick = (action) => {
  if (action === "login") {
    router.push({ path: '/acceso' })
  } else if (action === "register") {
    router.push({ path: '/registro' })
  } else if (action === "profile") {
    router.push({ path: '#' })
  } else {
    logout()
    router.push({ path: '/acceso' })
  }
}
const goLogin = () => {
  router.push({ path: '/acceso' })
}

const goSignUp = () => {
  router.push({ path: '/registro' })
}

const logout = () => {
  userStore.logout()
}


</script>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@700&display=swap');

* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
  font-family: 'Alegreya Sans SC', sans-serif;
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
  font-size: 12px;
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

.items {
  background-color: #F44336;
  color: #fff;
  font-size: 1.5em;
  margin: 0;
  letter-spacing: 10px;
  padding-bottom: 15px;
}
.data {
  letter-spacing: 0;
  font-size: 0.7em;
}
.options{
  font-size: 1em;
}
</style>
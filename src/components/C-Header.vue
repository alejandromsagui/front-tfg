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
        </v-toolbar-items>
      </template>

      <template v-else>
        <v-spacer></v-spacer>
        <v-toolbar-items class="d-none d-md-block">

          <CDialog />

          <v-btn class="link" text @click="goPerfil()">
            <i class="fa-solid fa-user mr-1"></i> Perfil
          </v-btn>

          <v-btn class="link" text>
            <i class="fa-solid fa-cart-shopping mr-1"></i> Carrito
          </v-btn>

          <v-menu transition="slide-x-transition">
            <template v-slot:activator="{ props }">
              <v-btn class="link" text v-bind="props" @click="getNamekoins()">
                <i class="fa-solid fa-coins mr-1"></i> Saldo
              </v-btn>
            </template>
            <v-card min-width="300">
              <v-card-title class="text-center mb-5">NAME<span
                  class="text-red-darken-3 font-weight-bold">KOINS</span></v-card-title>
              <v-card-text class="text-center text-h4">{{ namekoins }}</v-card-text>

              <v-dialog v-model="dialog" width="auto">
                <template v-slot:activator="{ props }">
                  <v-card-text class="font-subtitle-1" style="font-family: 'Roboto', 'sans-serif';">Puedes recargar más
                    Namekoins <a class="text-red-darken-3 font-weight-bold text-body-2" v-bind="props"
                      style="cursor: pointer">aquí</a></v-card-text>
                </template>
                <v-card class="mx-auto" max-width="800">
                  <div class="d-flex justify-end mt-2 mr-3">
                    <v-icon icon="fa-solid fa-rectangle-xmark text-red-darken-3" @click="dialog = false"></v-icon>
                  </div>
                  <v-card-title class="text-center" style="font-family: 'Roboto', sans-serif;">Recargar
                    Saldo</v-card-title>
                  <v-card-text class="text-center">
                    <p class="mb-5" style="font-family: 'Roboto', sans-serif;">Selecciona la cantidad de Name<span
                        class="text-red-darken-3 font-weight-bold" style="font-family: 'Roboto', sans-serif;">koins</span>
                      a recargar:</p>
                    <v-row class="d-flex justify-center">
                      <v-col cols="12" sm="4" class="mb-4">
                        <v-card class="d-flex flex-column align-center" @click="selectedAmount = 10"
                          :class="{ 'selected': selectedAmount === 10 }">
                          <img src="https://via.placeholder.com/150" alt="10€" class="mb-2">
                          <span class="font-weight-bold" style="font-family: 'Roboto', sans-serif;">10€</span>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-4">
                        <v-card class="d-flex flex-column align-center" @click="selectedAmount = 25"
                          :class="{ 'selected': selectedAmount === 25 }">
                          <img src="https://via.placeholder.com/150" alt="25€" class="mb-2">
                          <span class="font-weight-bold" style="font-family: 'Roboto', sans-serif;">25€</span>
                        </v-card>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-4">
                        <v-card class="d-flex flex-column align-center" @click="selectedAmount = 40"
                          :class="{ 'selected': selectedAmount === 40 }">
                          <img src="https://via.placeholder.com/150" alt="40€" class="mb-2">
                          <span class="font-weight-bold" style="font-family: 'Roboto', sans-serif;">40€</span>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-divider class="my-4"></v-divider>
                    <p class="mb-2" style="font-family: 'Roboto', sans-serif;">Cantidad a recargar:</p>
                    <h2 class="text-center mb-3">{{ selectedAmount }}€</h2>
                    <p class="text-center mb-3 text-white" style="font-family: 'Roboto', sans-serif;">Total de Name<span
                        class="text-red-darken-3 font-weight-bold"
                        style="font-family: 'Roboto', sans-serif;">koins</span>:</p>
                    <h2 class="text-center"> {{ namekoinsRecarge }} </h2>
                  </v-card-text>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn color="text-white bg-red-darken-3 font-weight-bold" variant="outlined"
                      :disabled="!selectedAmount" @click="recharge()">Recargar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </v-menu>
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
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login';
import { userData } from '../stores/userData'
import { storeToRefs } from 'pinia';
import { Buffer } from "buffer";
import { CDialog, CMenu } from "../components";
import { paymentStore } from "../stores/paymentStore"

const userDataStore = userData();
const emits = defineEmits(['open-modal']);

let isActive = false;
const openDialog = () => {
  isActive = true;
};

const router = useRouter()

const userStore = useLoginStore()
const { authenticated } = storeToRefs(userStore)
const token = localStorage.getItem('token')
const dialog = ref(false)
const namekoins = ref()
const selectedAmount = ref(null)
const namekoinsRecarge = ref(0)
onMounted(async () => {
  if (token) {
    authenticated.value = true
  } else {
    authenticated.value = false
  }
})

const getNamekoins = async () => {
  try {
    const res = await userDataStore.getUserByNickname()
    namekoins.value = res.number_namekoins;
  } catch (error) {
    console.log(error);
  }
}

onBeforeUnmount(() => {
  if (!token) {
    router.push({ path: '/acceso' })
  }
})

const recharge = async () => {
  const usepaymentStore = paymentStore()
  console.log('Valor de namekoins seleccionados: ' + selectedAmount.value);
  await usepaymentStore.createOrder(selectedAmount.value)
}
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
  title: 'Saldo',
  value: 'saldo',
  icon: 'fa-solid fa-coins',
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

watch(selectedAmount, (newVal) => {
  namekoinsRecarge.value = newVal * 10
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

const goPerfil = () => {
  router.push({ path: '/perfil' })
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

.options {
  font-size: 1em;
}

.selected {
  box-shadow: 0px 0px 10px #C62828;
}</style>
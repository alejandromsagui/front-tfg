<template>
  <v-app-bar>
    <v-toolbar color="grey-darken-4" clipped-left>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="isMobile"></v-app-bar-nav-icon>
      <img src="../assets/images/logo.png" alt="logo" class="logo">

      <v-toolbar-title class="title" truncate>Namekians<span>Games</span></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="items" v-if="!isMobile" justify-end>
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
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
import { ref, watch, computed } from 'vue'

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

const isMobile = computed(() => {
  const width = window.innerWidth
  return width < 960
})

watch(group, () => {
  drawer.value = false
})

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

.items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  color: #fff;
  transition: all 0.5s;
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
  overflow: hidden;
  text-overflow: ellipsis;
}

.title span {
  color: rgb(248, 8, 8);
  font-size: 1.1em;
}
</style>
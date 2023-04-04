<template>
     <v-app-bar  color="grey-darken-4">
    <v-toolbar color="grey-darken-4" density="comfortable" class="toolbar">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <img src="../assets/images/logo.png" alt="logo" class="logo">
      <v-toolbar-title class="title"
        >Namekians<span>Games</span></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items class="items">
        <v-btn class="link" text>Explorar</v-btn>
        <v-btn class="link" text>Login</v-btn>
        <v-btn class="link" text>Registro</v-btn>
        <v-btn class="link" text>Contacto</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </v-app-bar>
</template>
<script setup>
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
}
.title span {
  color: rgb(248, 8, 8);
  font-size: 1.1em;
}
</style>
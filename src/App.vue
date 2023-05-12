<template>
  <v-app>
    <v-main>
      <CHeader />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script setup>
import { CHeader } from "./components";

</script>

<style scoped>
</style>

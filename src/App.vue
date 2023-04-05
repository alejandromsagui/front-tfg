<template>
  <v-app>
    <v-main>
      <CHeaderSin />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script setup>
import { CHeader } from "./components";
import {CHeaderSin} from "./components";
</script>

<style scoped>
</style>

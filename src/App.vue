<template>
  <v-app>
    <CHeaderSin />
    <v-main>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-main>
  </v-app>
</template>

<script setup>
import { CHeader } from "./components";
import {CHeaderSin} from "./components";
</script>

<style scoped>
</style>

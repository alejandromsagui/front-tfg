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
import { onMounted } from "vue";
import { instance_axios } from "./middlewares/axios";
import { useLoginStore } from "./stores/login"


// const loginStore = useLoginStore()
// const token = localStorage.getItem('token')

// onMounted(async () => {
//   if (token) {
//     try {
//       const res = await instance_axios.get('/checkJWT')
//     } catch (error) {
//       if (error.res && error.res.status === 401) {
//         loginStore.logout()
//       }
//     }
//   }
// })
</script>

<style scoped></style>

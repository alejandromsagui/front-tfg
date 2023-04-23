<template>
  <v-container fluid class="background">
    <div class="background-image"></div>
    <div class="center">
      <v-sheet class="d-flex align-center justify-center flex-wrap text-center" elevation="4" rounded :width="800"
        style="margin-bottom: 10%">
        <v-card width="800px" height="400">
          <v-row align-content="center" v-if="!isMobile ">
            <v-col align-self="center" cols="8">
              <!-- <v-img src="../src/assets/images/gif.gif" width="100%" cover height="400"></v-img> -->
              <img src="../assets/images/gif.gif" alt="login" style="width: 100%; height: 400px; object-fit: cover;">
            </v-col>
            <v-col align-self="center" class="my-10" cols="4">
              <div id="form">
                <v-card-title style="font-weight: bold;" class="mb-6">Iniciar sesión</v-card-title>
                <v-form @keyup.enter="sendData">
                  <v-text-field clearable label="Usuario" type="text" prepend-icon="fa-solid fa-user" variant="underlined"
                    class="input" v-model="userLogin.nickname"></v-text-field>
                  <v-text-field clearable label="Contraseña" type="password" prepend-icon="fa-sharp fa-solid fa-key"
                    variant="underlined" class="input" v-model="userLogin.password"></v-text-field>
                  <v-btn color="#F80808" class="mt-5" variant="elevated" id="button" @click="sendData()">Acceder</v-btn>
                </v-form>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-sheet>
    </div>
  </v-container>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useLoginStore } from '../stores/login'

const screenSize = ref(false);
const userLogin = reactive({
  nickname: '',
  password: ''
})

const authStore = useLoginStore();

const sendData = async () => {
  await authStore.login(userLogin.nickname, userLogin.password);
};

const isMobile = computed(() => window.innerWidth <= 960)
  

console.log(isMobile);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
  font-family: "Roboto", sans-serif;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.input {
  width: 230px;
  padding: 3px;
  color: black !important;
}

#form {
  margin: 0 auto;
  display: block;
}

.background {
  width: 100%;
  height: 100%;
  position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.background-image {
  background-image: url(../assets/images/test.png);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  filter: blur(4px);
  transform: scale(1.1);
}

#button {
  color: #fff;
  font-weight: bold;
}

#button:hover {
  background-color: #fff !important;
  color: #F80808;
  transition: 0.3s;
}
</style>

<template>
  <v-container>
    <!-- <v-row align="center" justify="center" sm="6" md="4" d-flex flex-row>
      <v-col col="2" class="d-none d-lg-block">
        <img src="../assets/images/GamingZone.jpg" alt="Game Zone" class="mt-7 ml-9" style="object-fit: cover; width: 550px; height: 500px;">
      </v-col>
      <v-col col="12">
        <div style="height: 50%;">
          <v-carousel hide-delimiters cycle height="auto">
            <v-carousel-item v-for="(videogame, index) in videogames.slice(0, 4)" :key="index">
              <v-img contain :src="videogame.thumbnail" class="rounded"></v-img>
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-col>
    </v-row> -->
    <v-row align-content="center">
      <v-col v-for="videogame in videogames.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))"
        :key="videogame._id" cols="12" sm="6" md="4">
        <v-lazy :options="{ 'threshold': 0.5 }" transition="fade-transition">
          <v-card class="card mx-auto mt-7" :margin="16" elevation="10" max-width="500" height="100%"
            @click="verJuego(videogame)">
            <div style="position: relative; padding-top: 75%;">
              <img :src="videogame.image" alt="videogame"
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
            </div>
            <v-card-title class="text-center">{{ videogame.name }}</v-card-title>
            <v-card-text>
              <p class="text-red-darken-1">{{ videogame.genre.join(",").replaceAll(',', ', ') }}</p>
              <div style="display: flex; align-items: center; justify-content: flex-end;">
                <i class="fas fa-user fa-fw"></i>
                <router-link :to="'/perfil/' + videogame.nickname" class="text-decoration-none">
                  <p style="margin-left: 5px;" class="text-red-darken-1">{{ videogame.nickname }}</p>
                </router-link>
              </div>
            </v-card-text>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
    <v-row v-if="nuevoJuego">
      <v-col cols="12" sm="6" md="4">
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="1400">
          <v-card>
            <v-row class="center mx-5 my-5">
              <v-col cols="12" sm="6" md="4" xs="6" class="col-dialog">
                <v-card-title class="text-center text-white text-h4 mb-2">{{ nuevoJuego.name }}</v-card-title>
                <img :src=nuevoJuego.image alt="Portada" class="d-flex mx-auto rounded">
                <p class="text-subtitle-1 text-white text-center mt-5">Subido por <a
                    :href="'/perfil/' + nuevoJuego.nickname" target="_blank" class="text-red-darken-1">{{
                      nuevoJuego.nickname }}</a></p>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="8" class="col-dialog-info">
                <v-card-title class="text-center text-white text-h4 mb-3">Descripción</v-card-title>
                <v-card-text class="text-subtitle-1 text-justify">{{ nuevoJuego.description }}.</v-card-text>
                <v-card-title class="text-center text-white text-h4 mb-3">Género</v-card-title>
                <v-card-text class="text-subtitle-1 text-center text-body-1">
                  {{ nuevoJuego.genre.join(',').replace(/,\s*/g, ', ') }}
                </v-card-text>
                <v-card-title class="text-center text-white text-h4 mb-2 my-6">Opiniones de venta</v-card-title>
                <v-card elevation="10" class="bg-red-darken-3">
                  <v-card-text class="text-white">Pepe: Lorem ipsum dolor sit amet consectetur adipiscing,
                    elit eget magnis sociis et interdum,</v-card-text>
                  <v-card-text class="text-white"> Pepe:Lorem ipsum dolor sit amet consectetur adipiscing,
                    elit eget magnis sociis et interdum,</v-card-text>
                  <v-card-text class="text-white">Manolo: Lorem ipsum dolor sit amet consectetur adipiscing,
                    elit eget magnis sociis et interdum,</v-card-text>
                </v-card>
                <v-row>
                  <v-col cols="6">
                    <v-card-title class="text-center text-white text-h4 mb-2 my-6">Precio</v-card-title>
                    <v-card-text class="text-center my-6 text-body-1">{{ nuevoJuego.price }}</v-card-text>
                  </v-col>
                  <v-col cols="6">
                    <v-card-title class="text-center text-white text-h4 mb-2 my-6">Plataforma</v-card-title>
                    <v-card-text class=" text-center my-6 text-body-1">{{ nuevoJuego.platform
                    }}</v-card-text>
                  </v-col>
                </v-row>
                <v-btn class="bg-red-darken-3 text-white font-weight-bold d-flex mx-auto" variant="outlined"
                  @click="createOrder()">Comprar</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { reactive, onMounted, ref, watch } from 'vue';
import { useVideogameStore } from "../stores/videogames"
import { paymentStore } from "../stores/paymentStore"

const getVideogamesMain = useVideogameStore()
const usePaymentStore = paymentStore()
const nuevoJuego = ref()
let videogames = reactive([]);
const dialog = ref(false)

onMounted(async () => {
  const games = await getVideogamesMain.getVideogames();
  console.log('Games desde onMounted: ' + games);
  await videogames.push(...await getVideogamesMain.getVideogames());
  console.log('Games desde onMounted:', videogames);
});

// watch(() => videogames, () => {
//     console.log('new value',);
// }, { deep: true });

const verJuego = (videogame) => {
  nuevoJuego.value = videogame
  dialog.value = true
}

const createOrder = async () => {
  await usePaymentStore.createOrder()
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  font-family: "Roboto", sans-serif;
}

.user {
  text-align: right;
}

.card:hover {
  cursor: pointer;
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.top-align {
  align-self: flex-start;
  margin-top: 16px;
}

.image {
  max-width: 500px;
  max-height: 250px;
  object-fit: cover;
}

.col-dialog {
  width: 100%;
  height: auto;
}

.col-dialog img {
  max-width: 100%;
  height: auto;
}

.col-dialog-info {
  width: 100%;
  height: auto;
}</style>
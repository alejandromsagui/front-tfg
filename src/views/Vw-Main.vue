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

    <v-row align="center" align-content="center">
      <v-col v-for="videogame in videogames" :key="videogame.id" cols="12" sm="6" md="4">
        <v-lazy :options="{ 'threshold': 0.5 }" transition="fade-transition">
          <v-card class="card mx-auto mt-7" :margin="16" elevation="10" max-width="500" height=350>
            <v-img :src="videogame.thumbnail" height=250 cover></v-img>
            <v-card-title>{{ videogame.title }}</v-card-title>
            <v-card-text>
              <p>Fecha de lanzamiento: {{ videogame.release_date }}</p>
              <div style="display: flex; align-items: center; justify-content: flex-end;">
                <i class="fas fa-user fa-fw"></i>
                <p style="margin-left: 5px;">Nombre de usuario</p>
              </div>
            </v-card-text>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { getVideogames } from '../services/videogames';

const videogames = reactive([]);


onMounted(async () => {
  videogames.push(...await getVideogames());
});

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
</style>
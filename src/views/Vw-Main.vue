<template>
  <v-container>
    <v-row align="center" justify="center" sm="6" md="4" d-flex flex-row>
      <v-col col="2" class="d-none d-lg-block">
        <!-- <v-img cover src="../src/assets/images/GamingZone.jpg" class="mx-auto mt-7" :width="550" /> -->
        <img src="../assets/images/GamingZone.jpg" alt="Game Zone" class="mt-7 ml-9" style="object-fit: cover; width: 550px; height: 500px;">
      </v-col>
      <v-col col="10" style="width: 75%">
        <v-carousel hide-delimiters cycle height="auto">
          <v-carousel-item v-for="(videogame, index) in videogames.slice(0, 4)" :key="index">
            <v-img cover :src="videogame.thumbnail" class="rounded"></v-img>
            </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row align="center" align-content="center">
      <v-col v-for="videogame in videogames" :key="videogame.id" cols="12" sm="6" md="4">
        <v-lazy :options="{ 'threshold': 0.5 }" transition="fade-transition">
          <v-card class="card mx-auto mt-7" :margin="16" elevation="10" max-width="500" height=350>
            <v-img :src="videogame.thumbnail" height=250 cover></v-img>
            <v-card-title>{{ videogame.title }}</v-card-title>
            <v-card-text>
              <p>Fecha de lanzamiento: {{ videogame.release_date }}</p>
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
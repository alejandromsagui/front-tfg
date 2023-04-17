<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="videogame in videogames"
        :key="videogame.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="mb-4 mt-7 ml-4 mr-4" :margin="16" elevation="5">
          <v-img :src="videogame.background_image" cover max-height="250" class="fill-height" object-fit="contain"></v-img>
          <v-card-title>{{ videogame.name }}</v-card-title>
          <v-card-text>
            <p>Fecha de lanzamiento: {{ videogame.released }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';

const videogames = reactive([]);

axios.get('https://api.rawg.io/api/games?key=ded7f6640f8f4314a29a65b901752d4a')
  .then(res => {
    videogames.push(...res.data.results);
  })
  .catch(err => {
    console.log(err);
  })
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  font-family: "Roboto", sans-serif;
}

</style>
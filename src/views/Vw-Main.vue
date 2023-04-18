<template>
  <v-container fluid class="">
    <v-row>
      <v-col v-for="videogame in videogamesWithUsers" :key="videogame.id" cols="12" sm="6" md="4">
        <v-card class="card mx-auto mb-4 mt-7 ml-4 mr-4" :margin="16" elevation="10" max-width="500" height=350>
          <v-img :src="videogame.thumbnail" height=250 cover></v-img>
          <v-card-title>{{ videogame.title }}</v-card-title>
          <v-card-text>
            <p>Fecha de lanzamiento: {{ videogame.release_date }}</p>
            <div class="user">
            <p><v-icon class="fa-regular fa-user mr-1"></v-icon>{{ videogame.user.username }}</p>
          </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, computed } from 'vue';
import axios from 'axios';

const videogames = reactive([]);
const users = reactive([]);

const options = {
  method: 'GET',
  url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
  params: { tag: '3d.mmorpg.fantasy.pvp', platform: 'pc' },
  headers: {
    'X-RapidAPI-Key': '054da42c59msh5049a7d66b5af97p18628ejsn9c9ae8e37ba9',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
  videogames.push(...response.data.map(videogame => {
    // Agrega un identificador de usuario único a cada videojuego
    videogame.userId = Math.floor(Math.random() * users.length) + 1;
    return videogame;
  }));
}).catch(function (error) {
  console.error(error);
});

axios.get('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    console.log(res.data);
    users.push(...res.data);
  })
  .catch(err => {
    console.log(err);
  })

const videogamesWithUsers = computed(() => {
  // Crea una nueva matriz de videojuegos que incluya información de usuario
  return videogames.map(videogame => {
    const user = users.find(user => user.id === videogame.userId);
    return {
      ...videogame,
      user: user
    }
  });
});


</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  font-family: "Roboto", sans-serif;
}
.user{
  text-align: right;
}
.card:hover{
  cursor: pointer;
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
}
</style>
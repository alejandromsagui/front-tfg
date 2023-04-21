<template>
  <v-container>
    <v-row align="center" justify="center" sm="6" md="4" d-flex flex-row>
      <v-col col="2" class="d-none d-lg-block">
        <v-img cover src="../src/assets/images/GamingZone.jpg" class="mx-auto mt-7" :width="550" />
      </v-col>
      <v-col col="10" style="width: 75%">
        <v-carousel hide-delimiters cycle height="auto">
          <v-carousel-item v-for="(videogame, index) in videogames.slice(0, 4)" :key="index" :src="videogame.thumbnail"
            cover />
        </v-carousel>
      </v-col>
    </v-row>

    <v-row align="center" align-content="center">
      <v-col v-for="videogame in videogamesWithUsers" :key="videogame.id" cols="12" sm="6" md="4">
        <v-lazy :options="{ 'threshold': 0.5 }" transition="fade-transition">
          <v-card class="card mx-auto mt-7" :margin="16" elevation="10" max-width="500" height=350>
            <v-img :src="videogame.thumbnail" height=250 cover></v-img>
            <v-card-title>{{ videogame.title }}</v-card-title>
            <v-card-text>
              <p>Fecha de lanzamiento: {{ videogame.release_date }}</p>
              <div class="user">
                <!-- <p><v-icon class="fa-regular fa-user mr-1"></v-icon>{{ videogame.user.username }}</p> -->
              </div>
            </v-card-text>
          </v-card>
        </v-lazy>
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
  videogames.push(...response.data.map(videogame => {
    videogame.userId = Math.floor(Math.random() * users.length) + 1;
    return videogame;
  }));
}).catch(function (error) {
  console.error(error);
});

axios.get('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    users.push(...res.data);
  })
  .catch(err => {
    console.log(err);
  })

const videogamesWithUsers = computed(() => {
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

.user {
  text-align: right;
}

.card:hover {
  cursor: pointer;
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}
</style>
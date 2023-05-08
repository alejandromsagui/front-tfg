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
      <v-col v-for="videogame in videogames" :key="videogame._id" cols="12" sm="6" md="4">
        <v-lazy :options="{ 'threshold': 0.5 }" transition="fade-transition">
          <v-card class="card mx-auto mt-7" :margin="16" elevation="10" max-width="500" height="100%" @click="dialog = true">
            <div style="position: relative; padding-top: 75%;">
              <img :src="videogame.image" alt="videogame" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
            </div>
            <v-card-title class="text-center">{{ videogame.name }}</v-card-title>
            <v-card-text>
              <p class="text-red-darken-1">{{ videogame.genre.join(', ') }}</p>
              <div style="display: flex; align-items: center; justify-content: flex-end;">
                <i class="fas fa-user fa-fw"></i>
                <p style="margin-left: 5px;" class="text-red-darken-1">{{ videogame.nickname }}</p>
              </div>
            </v-card-text>
          </v-card>
          
        </v-lazy>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="1400">
          <v-card>
            <v-row class="center mx-5 my-5">
              <v-col cols="12" sm="6" md="4" xs="6">
                <v-card-title class="text-center text-white text-h4 mb-2">Ttitulo</v-card-title>
                <img src="../assets/images/god-of-war.jpg" alt="" height="450" width="350" class="d-flex mx-auto rounded">
              </v-col>
              <v-col cols="12" sm="6" md="4" class="top-align">
                <v-card-title class="text-center text-white text-h4 mb-2 my-6">Descripción</v-card-title>
                <v-card-text class="text-subtitle-1 text-justify my-6">Lorem ipsum dolor sit amet consectetur adipiscing,
                  elit eget magnis sociis et interdum, sapien fusce lobortis cras vitae. Hac proin leo vestibulum pulvinar
                  dapibus ridiculus dictum elementum, eros etiam sollicitudin habitant tellus himenaeos magnis feugiat, in
                  velit sociosqu dignissim viverra non semper. Sed nisl nunc ut in rhoncus ridiculus tempus eleifend
                  tortor, suscipit consequat malesuada praesent conubia convallis tempor per nec lectus, est ligula dictum
                  dictumst potenti sollicitudin rutrum luctus.</v-card-text>
                <v-card-title class="text-center text-white text-h4 mb-2 my-6">Género</v-card-title>
                <v-card-text class="text-subtitle- text-center my-6 text-body-1">
                  Aventura</v-card-text>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="top-align">
                <v-card-title class="text-center text-white text-h4 mb-2 my-6">Opiniones de venta</v-card-title>
                <v-card elevation="10" class="bg-red-lighten-1">
                  <v-card-text>Pepe: Lorem ipsum dolor sit amet consectetur adipiscing,
                    elit eget magnis sociis et interdum,</v-card-text>
                  <v-card-text> Pepe:Lorem ipsum dolor sit amet consectetur adipiscing,
                    elit eget magnis sociis et interdum,</v-card-text>
                  <v-card-text>Manolo: Lorem ipsum dolor sit amet consectetur adipiscing,
                    elit eget magnis sociis et interdum,</v-card-text>
                </v-card>
                <v-card-title class="text-center text-white text-h4 mb-2 my-6">Precio</v-card-title>
                <v-card-text class="text-subtitle- text-center my-6 text-body-1">20€</v-card-text>
                <v-btn block class="bg-red-lighten-1 text-white font-weight-bold">Comprar</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useVideogameStore } from "../stores/videogames"

const getVideogamesMain = useVideogameStore()

let videogames = reactive([]);
const dialog = ref(false)

onMounted(async () => {
  const games = await getVideogamesMain.getVideogames();
  console.log('Games desde onMounted: ' + games);
  await videogames.push(...await getVideogamesMain.getVideogames());
  console.log('Games desde onMounted:', videogames);
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

.top-align {
  align-self: flex-start;
  margin-top: 16px;
}

.image {
  max-width: 500px;
  max-height: 250px;
  object-fit: cover;
}
</style>
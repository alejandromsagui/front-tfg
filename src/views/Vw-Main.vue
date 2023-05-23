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
  <v-col cols="12" sm="12" md="12">
    <v-text-field hide-details label="Buscar..." placeholder="Título o género" prepend-icon="fa-solid fa-search"
      filled rounded dense single-line class="shrink mt-2 mr-7" v-model="searchQuery" variant="outlined">
    </v-text-field>
  </v-col>
</v-row>

  <v-row>
      <TransitionGroup name="list">
        <v-col
          v-for="videogame in getVideogamesMain.videogames.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) "
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
                <p class="text-red-darken-1">{{ videogame.genre }}</p>
                <div style="display: flex; align-items: center; justify-content: space-between;" class="mt-5">
                  <div style="display: flex; align-items: center;">
                    <i class="fas fa-user fa-fw"></i>
                    <router-link :to="'/perfil/' + videogame.nickname" class="text-decoration-none">
                      <p style="margin-left: 5px;" class="text-red-darken-1">{{ videogame.nickname }}</p>
                    </router-link>
                  </div>
                  <div v-if="authenticated">
                    <v-tooltip text="Denunciar publicación">
                      <template v-slot:activator="{ props }">
                        <i class="fa-solid fa-flag" v-bind="props" @click.stop="reportVideogame(videogame._id);"></i>
                      </template>
                    </v-tooltip>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-lazy>
        </v-col>
      </TransitionGroup>
    </v-row>
    <v-row v-if="nuevoJuego">
      <v-col cols="12" sm="6" md="4">
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="1400">
          <v-card>
            <div class="d-flex justify-end mt-5 mr-3">
              <v-icon icon="fa-solid fa-rectangle-xmark text-red-darken-3 fa-xl" @click="dialog = false"></v-icon>
            </div>
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
                <!-- <v-card-text class="text-subtitle-1 text-center text-body-1">
                  {{ nuevoJuego.genre.join(',').replace(/,\s*/g, ', ') }}
                </v-card-text> -->
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
                    <v-card-title class="text-center text-white text-h4 mb-2 my-6">Name<span
                        class="text-red-darken-3 font-weight-bold">koins</span></v-card-title>
                    <v-card-text class="text-center my-6 text-body-1">{{ nuevoJuego.price }}</v-card-text>
                  </v-col>
                  <v-col cols="6">
                    <v-card-title class="text-center text-white text-h4 mb-2 my-6">Plataforma</v-card-title>
                    <v-card-text class=" text-center my-6 text-body-1">{{ nuevoJuego.platform
                    }}</v-card-text>
                  </v-col>
                </v-row>
                <v-dialog transition="dialog-top-transition" width="500">
                  <template v-slot:activator="{ props }">
                    <v-btn class="bg-red-darken-3 text-white font-weight-bold d-flex mx-auto" variant="outlined"
                      v-bind="props">Comprar</v-btn>
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-card>
                      <div class="d-flex justify-end mt-2 mr-3">
                        <v-icon icon="fa-solid fa-rectangle-xmark text-red-darken-3"
                          @click="isActive.value = false"></v-icon>
                      </div>
                      <v-card-text>
                        <div class="text-h6 text-justify">¿Estás seguro de que quieres comprar el juego <span
                            class="text-red-darken-3 font-weight-bold">{{ nuevoJuego.name }}</span>?</div>
                      </v-card-text>
                      <v-card-actions class="justify-center">
                        <v-btn variant="text"
                          class="text-center bg-red-darken-3 text-white font-weight-bold d-flex mx-auto"
                          @click="createOrder(); comprado = true">Comprar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-dialog v-model="review" persistent max-width="900">
      <v-container>
        <v-card>
          <v-card-text class="text-center text-h6 mt-5">
            Namekians<span class="text-red-darken-3 font-weight-bold">Games</span> es una aplicación nueva. Por ello,
            necesitamos tu opinión para mejorar la calidad de nuestra plataforma
          </v-card-text>
          <v-form ref="form" @submit.prevent="sendReview">
            <v-row justify="center">
              <v-col cols="12" sm="6" md="4">
                <div class="text-center">
                  <v-rating size="large" color="yellow darken-1" class="mt-3 mb-4" v-model="rating.rating"></v-rating>
                </div>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="8" md="6">
                <v-textarea variant="underlined" placeholder="Escribe tu opinión aquí" no-resize
                  :rules="[v => (v || '').length <= 200 || 'Por favor, reduce tu comentario hasta un máximo de 200 caracteres']"
                  v-model="rating.comment"></v-textarea>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="6" md="4">
                <div class="text-center">
                  <v-btn class="text-white bg-red-darken-3 font-weight-bold mb-3" variant="outlined"
                    type="submit">Enviar</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { reactive, onMounted, ref, watch, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useVideogameStore } from "../stores/videogames"
import { paymentStore } from "../stores/paymentStore"
import { useLoginStore } from "../stores/login"
import { userData } from "../stores/userData"
import { reviewStore } from "../stores/reviewStore"
import { reportStore } from "../stores/reportStore"
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const form = ref()
const searchQuery = ref()
const loginStore = useLoginStore()
const useReviewStore = reviewStore()
const getVideogamesMain = useVideogameStore()
const usePaymentStore = paymentStore()
const useReportStore = reportStore()

const userStore = userData()
const nuevoJuego = ref()
let videogames = reactive([]);
const dialog = ref(false)
const comprado = ref(false)
const { authenticated } = storeToRefs(loginStore)


const games = ref()
const review = ref(false)
const newTransaction = reactive({
  description: '',
  price: '',
  idSeller: '',
  nicknameSeller: '',
  idVideogame: '',
  videogame: '',
  platform: ''
})


onBeforeMount(async () => {
  await getVideogamesMain.getVideogames();
})
const reportVideogame = async (id) => {
  await useReportStore.reportGame(id)
}
const token = localStorage.getItem('token')
onMounted(async () => {
  if (token) {
    authenticated.value = true
  } else {
    authenticated.value = false
  }
})

const rating = reactive({
  rating: null,
  idUserProfile: '',
  nicknameUserProfile: '',
  comment: ''
})

const verJuego = (videogame) => {
  nuevoJuego.value = videogame
  dialog.value = true
}

const sendReview = async () => {
  const isValid = form.value.validate()

  if (isValid) {
    rating.idUserProfile = nuevoJuego.value.userId
    rating.nicknameUserProfile = nuevoJuego.value.nickname
    await useReviewStore.newReview(rating)
    review.value = false;

    toast.success('¡Gracias por aportar tu valoración', {
      theme: 'colored',
      autoClose: 3000
    })
  } else {
    toast.error('¡Ha ocurrido un problema al validar tu valoración', {
      theme: 'colored',
      autoClose: 3000
    })
  }
}


const createOrder = async () => {

  const user = await userStore.getUserByNickname()

  newTransaction.description = `Transacción realizada entre el comprador ${user.nickname} y el vendedor ${nuevoJuego.value.nickname}`
  newTransaction.price = nuevoJuego.value.price,
    newTransaction.idSeller = nuevoJuego.value.userId
  newTransaction.nicknameSeller = nuevoJuego.value.nickname;
  newTransaction.idVideogame = nuevoJuego.value._id
  newTransaction.videogame = nuevoJuego.value.name
  newTransaction.platform = nuevoJuego.value.platform

  console.log('Plataforma: ' + nuevoJuego.value.platform);


  if (user.nickname === nuevoJuego.value.nickname) {
    toast.error('No puedes comprar tus propios juegos', {
      autoClose: 2000,
      theme: 'colored'
    })
  } else if (user.number_namekoins < newTransaction.price) {
    toast.error('Namekoins insuficientes', {
      autoClose: 2000,
      theme: 'colored'
    })
  } else {
    await usePaymentStore.newTransaction(newTransaction)

    toast.success('Transacción realizada correctamente', {
      autoClose: 2000,
      theme: 'colored'
    })

    dialog.value = false;
    comprado.value = true;

    if (comprado.value == true) {
      review.value = true;
    }
  }
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
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
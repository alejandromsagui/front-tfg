<template>
    <div style="background-color: #212121; width: 100%; height: 15%; position: absolute;" class="d-none d-md-flex"></div>
    <div v-if="userDataStore.loading" class="d-flex justify-center align-center"
        style="position: absolute; top: 0; right: 0; bottom: 0; left: 0">
        <half-circle-spinner :animation-duration="1000" :size="60" color="#D50000">
        </half-circle-spinner>
    </div>


    <!-- Navegacion para movil -->
    <v-row class="text-center overflow-x-hidden">
        <v-col cols="12" class="d-md-none">
            <div class="scrolling-wrapper">
                <div class="card"  @click="showNickname = true; showEmail = false; showPassword = false; showRecommendations = false; showTransactions = false">
                    <v-card class="bg-red-darken-3 d-flex flex-column align-center justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                            <i class="fa-solid fa-user fa-3x"></i>
                        </div>
                        <p class="subtitle-2 text-white text-center mt-1">Cambiar nombre</p>
                    </v-card>
                </div>
                <div class="card" @click="showEmail = true; showNickname = false; showPassword = false; showRecommendations = false; showTransactions = false">
                    <v-card class="bg-red-darken-3 d-flex flex-column align-center justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                        <i class="fa-solid fa-envelope fa-3x"></i>
                    </div>
                        <p class="subtitle-2 text-white text-center mt-1">Cambiar correo</p>
                    </v-card>
                </div>
                <div class="card" @click="showPassword = true; showEmail = false; showNickname = false; showRecommendations = false; showTransactions = false">
                    <v-card class="bg-red-darken-3 d-flex flex-column align-center justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                        <i class="fa-solid fa-key fa-3x"></i>
                        </div>
                        <p class="subtitle-2 text-white text-center mt-1">Cambiar contraseña</p>
                    </v-card>
                </div>
                <div class="card" v-if="ranking !== null" @click="showPassword = false; showEmail = false; showNickname = false; showRecommendations = true; showTransactions = false;">
                    <v-card class="bg-red-darken-3 d-flex align-center flex-column justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                        <i class="fa-solid fa-lightbulb fa-3x"></i>
                    </div>
                    <p class="subtitle-2 text-white text-center mt-1">Recomendaciones</p>
                    </v-card>
                </div>
                <div class="card" @click="showPassword = false; showEmail = false; showNickname = false; showRecommendations = false; showTransactions = true;">
                    <v-card class="bg-red-darken-3 d-flex align-center flex-column justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                        <i class="fa-solid fa-gamepad fa-3x"></i>
                    </div>
                    <p class="subtitle-2 text-white text-center mt-1">Juegos subidos</p>
                    </v-card>
                </div>

                <div class="card" @click="handleExportDataClick(); showPassword = false; showEmail = false; showNickname = false; showRecommendations = false; showTransactions = false; showTransactions = false">
                    <v-card class="bg-red-darken-3 d-flex align-center flex-column justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                            <i class="fa-solid fa-file-export fa-3x"></i>
                    </div>
                    <p class="subtitle-2 text-white text-center mt-1">Exportar historial</p>
                    </v-card>
                </div>
                <div class="card" @click="dialog = true">
                    <v-card class="bg-red-darken-3 d-flex align-center flex-column justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                            <i class="fa-solid fa-user-slash fa-3x"></i>
                    </div>
                    <p class="subtitle-2 text-white text-center mt-1">Eliminar cuenta</p>
                    </v-card>
                </div>
            </div>
        </v-col>

        <v-col cols="12" md="12" sm="12" xs="12" class="d-none d-md-block">
            <div style="position: relative; margin-top: 100px;">
                <div class="card mr-5 elevation-0"  @click="showNickname = true; showEmail = false; showPassword = false; showRecommendations = false; showTransactions = false">
                    <v-card class="bg-transparent d-flex flex-column align-center justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                            <i class="fa-solid fa-user fa-3x"></i>
                        </div>
                        <p class="subtitle-2 text-white text-center mt-1">Cambiar nombre</p>
                    </v-card>
                </div>
                <div class="card mr-5" @click="showEmail = true; showNickname = false; showPassword = false; showRecommendations = false; showTransactions = false">
                    <v-card class="bg-transparent d-flex flex-column align-center justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                        <i class="fa-solid fa-envelope fa-3x"></i>
                    </div>
                        <p class="subtitle-2 text-white text-center mt-1">Cambiar correo</p>
                    </v-card>
                </div>
                <div class="card mr-5" @click="showPassword = true; showEmail = false; showNickname = false; showRecommendations = false; showTransactions = false">
                    <v-card class="bg-transparent d-flex flex-column align-center justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                        <i class="fa-solid fa-key fa-3x"></i>
                        </div>
                        <p class="subtitle-2 text-white text-center mt-1">Cambiar contraseña</p>
                    </v-card>
                </div>
                <div class="card mr-5" v-if="ranking" @click="showPassword = false; showEmail = false; showNickname = false; showRecommendations = true; showTransactions = false;">
                    <v-card class="bg-transparent d-flex align-center flex-column justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                        <i class="fa-solid fa-lightbulb fa-3x"></i>
                    </div>
                    <p class="subtitle-2 text-white text-center mt-1">Recomendaciones</p>
                    </v-card>
                </div>
                <div class="card mr-5" @click="showPassword = false; showEmail = false; showNickname = false; showRecommendations = false; showTransactions = true;">
                    <v-card class="bg-transparent d-flex align-center flex-column justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                        <i class="fa-solid fa-gamepad fa-3x"></i>
                    </div>
                    <p class="subtitle-2 text-white text-center mt-1">Juegos subidos</p>
                    </v-card>
                </div>

                <div class="card mr-5" @click="handleExportDataClick(); showPassword = false; showEmail = false; showNickname = false; showRecommendations = false; showTransactions = false; showTransactions = false; exportingData = true">
                    <v-card class="bg-transparent d-flex align-center flex-column justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                            <i class="fa-solid fa-file-export fa-3x"></i>
                    </div>
                    <p class="subtitle-2 text-white text-center mt-1">Exportar historial</p>
                    </v-card>
                </div>
                <div class="card mr-5" @click="dialog = true">
                    <v-card class="bg-transparent d-flex align-center flex-column justify-center" height="100" width="150">
                        <div class="d-flex align-center justify-center">
                            <i class="fa-solid fa-user-slash fa-3x"></i>
                    </div>
                    <p class="subtitle-2 text-white text-center mt-1">Eliminar cuenta</p>
                    </v-card>
                </div>

                <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <div class="bg-white text-black d-flex align-center pa-2">
        <v-card-title class="text-left flex-grow-1 font-weight-bold text-h6">Confirmar</v-card-title>
        <div class="d-flex mr-3">
          <v-icon icon="fa-solid fa-rectangle-xmark text-red-darken-3" @click="dialog = false"></v-icon>
        </div>
      </div>
      <v-card-text class="text-h5 text-center">
        ¿Estás seguro de que quieres eliminar tu cuenta? Una vez realizada esta acción,
        no lo podrás
        <span class="text-red-darken-3 font-weight-bold">recuperar</span>
      </v-card-text>
      <v-card-actions class="justify-center mt-5">
        <v-btn class="text-white bg-red-darken-3 font-weight-bold" variant="outlined"
          @click="deleteUser()">Eliminar de todas
          formas</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
            </div>
        </v-col>
    </v-row>
      <p class="text-white text-center text-h4 mt-10 d-none d-lg-block" v-if="exportingData"
      >Exportando datos...</p>

        <v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showNickname">
          <v-col cols="12" md="6" sm="10" xs="10" class="pa-0">
      <v-sheet height="auto" class="mb-16 d-flex justify-center align-center d-none" rounded>
        <v-col cols="12" md="12" sm="12" xs="12">
          <h2 class="text-center text-white font-weight-bold mb-5">
            Cambiar nombre de usuario
          </h2>
          <p class="text-center text-subtitle-2 text-grey mb-4">
            Selecciona un nuevo nombre de usuario
          </p>
          <p class="text-center text-subtitle-2 text-grey mb-4">
            Nombre de usuario actual
          </p>
          <p class="text-center text-white text-subtitle-1 mb-8">
            {{ data.nickname }}
          </p>
          <slot name="username"></slot>
        </v-col>
      </v-sheet>
    </v-col>
  </v-row>

<v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showEmail">
  <v-col cols="12" md="6" sm="10" xs="10" class="pa-0">
    <v-sheet height="auto" class="mb-16 d-flex justify-center align-center d-none" rounded>
      <v-col cols="12" md="6" sm="6" xs="6" class="pa-0">
        <h2 class="text-center text-white font-weight-bold mb-5">
          Cambiar correo de la cuenta
        </h2>
        <p class="text-center text-subtitle-2 text-grey mb-4">
          Selecciona un nuevo correo para acceder a tu cuenta
        </p>
        <p class="text-center text-subtitle-2 text-grey mb-4">
          Correo actual
        </p>
        <p class="text-center text-white text-subtitle-1 mb-8">
          {{ data.email }}
        </p>
        <slot name="email"></slot>
      </v-col>
    </v-sheet>
  </v-col>
</v-row>
<v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showPassword">
  <v-col cols="12" md="6" sm="10" xs="10" class="pa-0">
    <v-sheet height="auto" class="mb-16 d-flex justify-center align-center d-none" rounded>
      <v-col cols="12" md="6" sm="6" xs="6" class="pa-0">
        <h2 class="text-center text-white font-weight-bold mb-5">
          Cambiar contraseña de la cuenta
        </h2>
        <p class="text-center text-subtitle-2 text-grey mb-4 mb-10">
          Escoge una contraseña robusta para <br> mantener la seguridad de tu cuenta
        </p>
        <slot name="password"></slot>
      </v-col>
    </v-sheet>
  </v-col>
</v-row>
<v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showRecommendations">
  <v-col cols="12" md="6" sm="10" xs="10" class="pa-0">
    <v-sheet :height="480" class="mb-16 d-flex justify-center align-center d-none" rounded>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6" sm="6" xs="6" class="pa-0">
            <h2 class="text-center text-white font-weight-bold mb-10">
              Envíanos una recomendación
            </h2>
            <p class="text-center text-subtitle-2 mb-10 text-grey">
              Si tienes alguna sugerencia para mejorar la plataforma,
              escríbela aquí y lo tendremos en cuenta
            </p>
            <v-textarea label="Recomendación" clearable no-resize v-model="details" variant="outlined"></v-textarea>
            <div style="width: 350px; margin-top: 20px; margin-left: auto; margin-right: auto; padding-bottom: 20px;">
                    <v-btn variant="outlined" class="button text-white text-center font-weight-bold bg-red-darken-3" @click="newRecommendation(details)"
                        block>ENVIAR RECOMENDACIÓN</v-btn>
                </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-col>
</v-row>

<v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showTransactions">
  <v-col cols="12" md="6" sm="6" xs="6" class="pa-0">
    <CVideogamesUploaded></CVideogamesUploaded>
  </v-col>
</v-row>

</template>

<script setup>
import {
    ref,
    reactive,
    onBeforeMount,
    watchEffect,
    watch,
    onMounted
} from "vue";

import { useLoginStore } from "../stores/login";
import { userData } from "../stores/userData";
import { Buffer } from "buffer";
import { toast } from "vue3-toastify";
import { HalfCircleSpinner } from "epic-spinners";
import "vue3-toastify/dist/index.css";
import { CVideogamesUploaded } from "../components/";
import { useVideogameStore } from "../stores/videogames";
const showNickname = ref(false);
const showEmail = ref(false);
const showPassword = ref(false);
const showRecommendations = ref(false);
const userDataStore = userData();
const videogameStore = useVideogameStore();
const dialog = ref(false);
const data = reactive({
    nickname: "",
    email: "",
});

const showTransactions = ref(true);
const details = ref();
const getData = async () => {
    const token = localStorage.getItem("token");
    const [header, payload, signature] = token.split(".");
    const decodedPayload = JSON.parse(
        Buffer.from(payload, "base64").toString("ascii")
    );
    return decodedPayload;
};

let exportingData = ref(false)
const newRecommendation = (data) => {
  userDataStore.newRecommendation(data).then((r) => {
    console.log('Lo que llega de data: ', data);
    if(r.status === 200){
      details.value = ''
    }
  }).catch((e) => {

  })
};


onBeforeMount(async() => {
    const tokenData = await getData();
    data.nickname = tokenData.nickname;
    data.email = tokenData.email;
    getVideogames();
    await getRanking()
    console.log('Ranking: ', ranking.value);
});

const ranking = ref()

const getRanking = async () => {
    const res = await userDataStore.getRanking(data.nickname);
    if (res.data.ranking) {
      console.log('Valor de position:', res.data.ranking.position);
      ranking.value = res.data.ranking.position;
    } else {
      ranking.value = null
    }
};


const deleteUser = async () => {
    await userDataStore.deleteUser();
};

const items = reactive([
    { text: "Modificar nombre de usuario", action: "username" },
    { text: "Modificar email", action: "email" },
    { text: "Modificar contraseña", action: "password" },
    { text: "Recomendaciones", action: "recommendation" },
    { text: "Videojuegos subidos", action: "transaction" },
    { text: "Exportar datos" },
]);

const handleItemClick = (item) => {
    if (item.action === "username") {
        showNickname.value = true;
        showEmail.value = false;
        showPassword.value = false;
        showRecommendations.value = false;
        showTransactions.value = false;
    } else if (item.action === "email") {
        showNickname.value = false;
        showEmail.value = true;
        showPassword.value = false;
        showRecommendations.value = false;
        showTransactions.value = false;
    } else if (item.action === "password") {
        showNickname.value = false;
        showEmail.value = false;
        showPassword.value = true;
        showRecommendations.value = false;
        showTransactions.value = false;
    } else if (item.action === "recommendation") {
        showNickname.value = false;
        showEmail.value = false;
        showPassword.value = false;
        showRecommendations.value = true;
        showTransactions.value = false;
    } else if (item.action === "transaction") {
        showNickname.value = false;
        showEmail.value = false;
        showPassword.value = false;
        showRecommendations.value = false;
        showTransactions.value = true;
    }
};


const handleExportDataClick = () => {
    exportingData.value = true;
    userDataStore
        .exportData()
        .then((response) => {
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "factura.pdf";
            a.click();

            exportingData.value = false;
        })
        .catch((error) => {
            toast.error(error.message, {
                theme: "colored",
                autoClose: 3000,
            });
        });
};

let videogames = ref([]);
const getVideogames = async () => {
  videogames.value = await videogameStore.getVideogamesByUser();
};
</script>
<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
    font-family: "Roboto", sans-serif;
}

.d-flex {
    display: flex;
}

.justify-center {
    justify-content: center;
}

.align-center {
    align-items: center;
}

.d-none.d-md-block.pa-0 {
    margin-left: -50px;
}

.full-height {
    height: 100vh;
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* Ajusta la altura según tus necesidades */
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}

.table-container {
    max-height: 400px;
    /* Ajusta la altura máxima según tus necesidades */
    overflow-y: auto;
}

.max-height-table {
    max-height: none;
}

.scrolling-wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;


}

.card {
    display: inline-block;
    margin-left: 10px;
}

.scrolling-wrapper-flexbox {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;


}

.card {
    flex: 0 0 auto;
    cursor: pointer;
    background: linear-gradient(to left, #C62828 50%, black 50%) right;
    background-size: 200%;
    transition: .3s ease-out;
}
.card:hover {
  background-position: left;
}

.button{
  flex: 0 0 auto !important;
    background: linear-gradient(to left, #C62828 50%, black 50%) right !important;
    background-size: 200% !important;
    transition: .3s ease-out !important
}
.button:hover{
    background-position: left !important;
}
.scrolling-wrapper {
    -webkit-overflow-scrolling: touch;
}
</style>

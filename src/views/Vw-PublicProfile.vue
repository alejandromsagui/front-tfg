<template>
    <div class="d-flex justify-center align-center" style="background-image: url('../src/assets/images/zelda-modified.jpg');
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    height: 300px;">
        <v-avatar size="100" style="margin-top: -50px;" class="ml-2">
            <img src="../assets/images/avatar.jpg" alt="Profile Picture" style="width: 100px">
        </v-avatar>
        <h3>{{ nickname }}</h3>
    </div>
    <v-container fluid style="border:">
        <div>
            <!-- Información del usuario -->
            <v-container class="mt-4">
                <v-row>
                    <v-col cols="12" md="6" class="d-flex justify-center">
                        <i class="fa-solid fa-ranking-star fa-2xl" style="color: #ffff00;"></i>
                        <p class="ml-3 text-white font-weight-bold text-subtitle-1">2</p>
                    </v-col>
                    <v-col class="justify-center d-flex">
                        <v-btn variant="outlined" class="bg-red-darken-3 text-white font-weight-bold">Iniciar Chat</v-btn>
                    </v-col>
                </v-row>
                <v-row align="start" class="align-start">
                    <v-col cols="12" md="6" class="align-self-stretch">
                        <h4 class="mt-6 mx-3 text-h4 text-center mb-2">Últimas valoraciones</h4>
                        <v-card class="mx-3" height="350" width="100%" outlined>
                            <v-list dense>
                                <v-list-item v-for="review in reviewArray" :key="review.id">
                                    <v-row class="py-4">
                                        <v-col cols="6" md="6" class="d-flex justify-start">
                                            <v-list-item-title class="text-body-1 text-white font-weight-bold">{{
                                                review.nickname }}</v-list-item-title>
                                        </v-col>
                                        <v-col cols="6" md="6" class="d-flex justify-end">
                                            <v-list-item-action>
                                                <v-rating size="x-small" color="yellow-darken-1" class="d-flex"
                                                    v-model="review.rating" disabled></v-rating>
                                            </v-list-item-action>
                                        </v-col>

                                    </v-row>
                                    <v-list-item-subtitle>{{ review.comment }}</v-list-item-subtitle>
                                    <v-list-item-subtitle class="text--secondary">{{ review.date
                                    }}</v-list-item-subtitle>
                                    <v-divider></v-divider>
                                </v-list-item>
                            </v-list>
                        </v-card>
                        <div class="d-flex mx-auto justify-center">
                            <!-- <v-pagination v-model="pageReviews" :length="4" prev-icon="fa-solid fa-arrow-left"
                                next-icon="fa-solid fa-arrow-right" active-color="red-darken-3">
                            </v-pagination> -->
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="align-self-stretch" style="width: 100%;">

                        <h4 class="mt-6 mx-3 text-h4 text-center mb-2">Últimas transacciones</h4>
                        <v-card class="mx-3" height="350" width="100%" outlined>
                            <v-card-text>
                                <v-row class="py-4">
                                    <v-col cols="3" class="text-center font-weight-bold">Namekoins</v-col>
                                    <v-col cols="3" class="text-center font-weight-bold">Operación</v-col>
                                    <v-col cols="3" class="text-center font-weight-bold">Juego</v-col>
                                    <v-col cols="3" class="text-center font-weight-bold">Plataforma</v-col>
                                </v-row>
                                <v-divider class="my-3"></v-divider>
                                <v-row v-for="transaction in datosPaginados" :key="transaction.id">
                                    <v-col cols="3" class="text-center">{{ transaction.price }}</v-col>
                                    <v-col cols="3" class="text-center">{{ transaction.description }}</v-col>
                                    <v-col cols="3" class="text-center">{{ transaction.videogame }}</v-col>
                                    <v-col cols="3" class="text-center">{{ transaction.platform }}</v-col>

                                </v-row>
                            </v-card-text>
                        </v-card>
                        <v-pagination v-model="page" :length="pageCount" prev-icon="fa-solid fa-arrow-left"
                            next-icon="fa-solid fa-arrow-right" active-color="red-darken-3"
                            @update:modelValue="getDataPage()" :items-per-page="6">
                        </v-pagination>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-container>
</template>
<script setup>

import { onMounted, reactive, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { instance_axios } from "../middlewares/axios";
import { router } from "../routes";
import { paymentStore } from "../stores/paymentStore"
import { reviewStore } from "../stores/reviewStore"
import Vue3Toastify from "vue3-toastify";
const page = ref(1)
const rating = ref()
const currentPage = ref(1)
const nickname = ref("");
const exists = ref(true);
const useReviewStore = reviewStore();
const itemsPerPage = ref(6)
var transactionsArray = ref([])
var reviewArray = ref([])
const usePaymentStore = paymentStore()

const totalRecords = () => {
    return transactionsArray.value.length;
}
const pageCount = computed(() => {
    return Math.ceil(totalRecords() / itemsPerPage.value)
})

const transactionsDetails = reactive({
    namekoins: '',
    operation: '',
    game: '',
    platform: ''
})

onMounted(async () => {
    const route = useRoute();
    nickname.value = route.params.nickname;

    try {
        const response = await instance_axios.get(`/getNickname/${nickname.value}`);
        console.log(response.data);
        exists.value = true;
    } catch (error) {
        console.log(error);
        exists.value = false;
        router.push({ path: '/404' })
    }

    try {
        const responseReview = await useReviewStore.getReviews(nickname.value)
        console.log('Array de valoraciones: ', responseReview);
        reviewArray.value = responseReview;

    } catch (error) {
        console.log(error);
    }

    try {
        const res = await usePaymentStore.getTransactions(nickname.value)
        res.forEach((transaction) => {
            console.log(transaction.nicknameBuyer);
            if (transaction.nicknameBuyer === nickname.value) {
                transaction.description = 'Compra'
            } else {
                transaction.description = 'Venta'
            }
        });

        transactionsArray.value = res;
    } catch (error) {
        console.log(error);
    }

    getDataPage()
});


const datosPaginados = ref([]);

const getDataPage = () => {
    datosPaginados.value = [];
    console.log('Estoy aqui');
    let ini = (page.value * itemsPerPage.value) - itemsPerPage.value;
    let end = (page.value * itemsPerPage.value);

    datosPaginados.value = transactionsArray.value.slice(ini, end);

    console.log('Numero de pagina: '+page.value);
    console.log('Item por pagina '+itemsPerPage.value);
    console.log('Datos paginados: ', datosPaginados);
}


// const beforePage = () => {
//     indice -= 6;
//     transactionsArray.value.splice(indice, ...removedItems);
//     transactionsArray.value = transactionsArray.value.slice(indice, indice + 13);

//     console.log('Indice: ' + indice);
//     console.log('Longitud desde back: ' + transactionsArray.value.length);
// }

const ratings = ref([
    { id: 1, user: 'Sarah Johnson', comment: 'Excelente trabajo, altamente recomendado.', value: 5, date: '2023-05-01' },
    { id: 2, user: 'David Brown', comment: 'Muy profesional y amable, siempre dispuesto a ayudar.', value: 4, date: '2023-04-25' },
    { id: 3, user: 'Emily Davis', comment: 'No me gustó mucho el resultado final, pero entregó a tiempo.', value: 2, date: '2023-04-18' }
]);
const headers = ref([
    { text: 'Fecha', value: 'date' },
    { text: 'Descripción', value: 'description' },
    { text: 'Monto', value: 'amount' }
]);


const getTransactions = async () => {
    const res = await usePaymentStore.getTransactions(nickname.value)
    console.log(res);
}

function startChat() {
    // Lógica para iniciar el chat con el usuario
}
</script>
<style scoped>
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

.pagination-container {
    display: flex;
    column-gap: 10px;
}

.paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
}

.paginate-buttons:hover {
    background-color: #d8d8d8;
}

.active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
}

.active-page:hover {
    background-color: #2988c8;
}</style>
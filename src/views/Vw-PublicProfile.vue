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
                        <v-btn variant="outlined" class="bg-red-darken-3 text-white font-weight-bold"
                            @click="startChat">Iniciar Chat</v-btn>
                    </v-col>
                </v-row>
                <v-row align="start" class="align-start">
                    <v-col cols="12" md="6" class="align-self-stretch">
                        <h4 class="mt-6 mx-3 text-h4 text-center mb-2">Últimas valoraciones</h4>
                        <v-card class="mx-3" height="350" width="100%" outlined>
                            <v-list dense>
                                <v-list-item v-for="rating in ratings" :key="rating.id">
                                    <v-row class="py-4">
                                        <v-col cols="6" md="6" class="d-flex justify-start">
                                            <v-list-item-title class="text-body-1 text-white font-weight-bold">{{ rating.user }}</v-list-item-title>
                                        </v-col>
                                        <v-col cols="6" md="6" class="d-flex justify-end">
                                            <v-list-item-action>
                                                <v-rating v-model="rating.value" size="x-small" color="yellow-darken-1"
                                                    class="d-flex"></v-rating>
                                            </v-list-item-action>
                                        </v-col>

                                    </v-row>
                                    <v-list-item-subtitle>{{ rating.comment }}</v-list-item-subtitle>
                                    <v-list-item-subtitle class="text--secondary">{{ rating.date
                                    }}</v-list-item-subtitle>
                                    <v-divider></v-divider>
                                </v-list-item>
                            </v-list>
                        </v-card>
                        <div class="d-flex mx-auto justify-center">
                            <v-card-actions>
                                <v-btn text class="mt-3 bg-red-darken-3 text-white font-weight-bold" variant="outlined">Ver
                                    más valoraciones</v-btn>
                            </v-card-actions>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="align-self-stretch" style="width: 100%;">
                        <h4 class="mt-6 mx-3 text-h4 text-center mb-2">Últimas transacciones</h4>
                        <v-card class="mx-3" height="350" width="100%" outlined>
                            <v-card-text>
                                <v-row class="py-4">
                                    <v-col cols="3" class="text-center font-weight-bold">Fecha</v-col>
                                    <v-col cols="3" class="text-center font-weight-bold">Precio</v-col>
                                    <v-col cols="3" class="text-center font-weight-bold">Operación</v-col>
                                    <v-col cols="3" class="text-center font-weight-bold">Juego</v-col>
                                </v-row>
                                <v-divider class="my-3"></v-divider>
                                <v-row v-for="transaction in transactions" :key="transaction.id">
                                    <v-col cols="3" class="text-center">{{ new
                                        Date(transaction.date).toLocaleDateString() }}</v-col>
                                    <v-col cols="3" class="text-center">{{ transaction.amount }}</v-col>
                                    <v-col cols="3" class="text-center">{{ transaction.description }}</v-col>
                                    <v-col cols="3" class="text-center">{{ transaction.id }}</v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                        <div class="d-flex mx-auto justify-center">
                            <v-card-actions>
                                <v-btn variant="outlined" class="mt-3 bg-red-darken-3 text-white font-weight-bold">Ver más
                                    transacciones</v-btn>
                            </v-card-actions>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-container>
</template>
<script setup>

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { instance_axios } from "../middlewares/axios";
import { router } from "../routes";

const nickname = ref("");
const exists = ref(true);

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
});

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
const transactions = ref([
    { id: 'God of War', date: '2023-05-10', description: 'Compra', amount: '$200' },
    { id: 'Spiderman', date: '2023-04-30', description: 'Venta', amount: '$500' },
    { id:'Call of Duty', date: '2023-04-15', description: 'Compra', amount: '$100' },
    { id: 'God of War', date: '2023-05-10', description: 'Compra', amount: '$200' },
    { id: 'Spiderman', date: '2023-04-30', description: 'Venta', amount: '$500' },
    { id:'Call of Duty', date: '2023-04-15', description: 'Compra', amount: '$100' }
    
]);

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
</style>
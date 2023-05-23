<template>
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
                                        <div class="text-h6 text-justify">¿Estás seguro de que quieres comprar el juego
                                            <span class="text-red-darken-3 font-weight-bold">{{ nuevoJuego.name }}</span>?
                                        </div>
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
</template>
<script setup>
import { ref } from "vue"

const dialog = ref(false)
</script>
<style scoped></style>
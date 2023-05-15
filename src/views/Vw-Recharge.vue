<template>
    <v-container class="d-flex justify-center align-center">
        <v-card class="mx-auto" max-width="800">
            <v-card-title class="text-center">Recargar Saldo</v-card-title>
            <v-card-text class="text-center">
                <p class="mb-5">Selecciona la cantidad de Name<span class="text-red-darken-3 font-weight-bold">koins</span> a recargar:</p>
                <v-row class="d-flex justify-center">
                    <v-col cols="12" sm="4" class="mb-4">
                        <v-card class="d-flex flex-column align-center" @click="selectedAmount = 10"
                            :class="{ 'selected': selectedAmount === 10 }">
                            <img src="https://via.placeholder.com/150" alt="10€" class="mb-2">
                            <span class="font-weight-bold">10€</span>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-4">
                        <v-card class="d-flex flex-column align-center" @click="selectedAmount = 25"
                            :class="{ 'selected': selectedAmount === 25 }">
                            <img src="https://via.placeholder.com/150" alt="25€" class="mb-2">
                            <span class="font-weight-bold">25€</span>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-4">
                        <v-card class="d-flex flex-column align-center" @click="selectedAmount = 40"
                            :class="{ 'selected': selectedAmount === 40 }">
                            <img src="https://via.placeholder.com/150" alt="40€" class="mb-2">
                            <span class="font-weight-bold">40€</span>
                        </v-card>
                    </v-col>
                </v-row>
                <v-divider class="my-4"></v-divider>
                <p class="mb-2">Cantidad a recargar:</p>
                <h2 class="text-center mb-3">{{ selectedAmount }}€</h2>
                <p class="text-center mb-3 text-white font-weight-bold">Total de Name<span class="text-red-darken-3 font-weight-bold">koins</span>:</p>
                <h2 class="text-center"> {{ namekoins }} </h2>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="text-white bg-red-darken-3 font-weight-bold" variant="outlined" :disabled="!selectedAmount">Recargar</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, watch } from "vue";

const selectedAmount = ref(null)
const namekoins = ref(null)

watch(selectedAmount, (newVal) => {
  namekoins.value = newVal * 10
})
</script>

<style lang="css" scoped>
.selected {
    box-shadow: 0px 0px 10px #C62828;
}
</style>
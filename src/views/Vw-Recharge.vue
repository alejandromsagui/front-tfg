<template>
    <v-container>
      <v-card>
        <v-card-text class="text-center text-h6 mt-5">
          Namekians<span class="text-red-darken-3 font-weight-bold">Games</span> es una aplicación nueva. Por ello, necesitamos tu opinión para mejorar la calidad de nuestra plataforma
        </v-card-text>
        <v-form ref="form" @submit.prevent="sendReview">
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4">
            <div class="text-center">
              <v-rating size="large" color="yellow darken-1" class="mt-3 mb-4"></v-rating>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-textarea variant="underlined" placeholder="Escribe tu opinión aquí" no-resize
            :rules="[v => (v || '' ).length <= 200 || 'Por favor, reduce tu comentario hasta un máximo de 200 caracteres']"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4">
            <div class="text-center">
              <v-btn class="text-white bg-red-darken-3 font-weight-bold mb-3" variant="outlined" type="submit">Enviar</v-btn>
            </div>
          </v-col>
        </v-row>
    </v-form>
      </v-card>
    </v-container>
  </template>
  
  

<script setup>
import { ref, watch } from "vue";

const form = ref()

const sendReview = () => {
    const isValid = form.value.validate()

    if(isValid){
        console.log('Formulario válido');
    }else {
        console.log('Inválido');
    }
}
</script>

<style lang="css" scoped>
.selected {
    box-shadow: 0px 0px 10px #C62828;
}
</style>
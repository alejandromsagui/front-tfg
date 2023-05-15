<template>
    <v-card>
        <v-form ref="form" @submit.prevent="uploadVideogame">
            <v-card-title class="title d-none d-md-block">
                <v-row>
                    <v-col cols="12" sm="6" md="6"></v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container fluid>
                    <div class="d-flex">
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Título" required variant="underlined" :rules="[requiredField]"
                                    v-model="newVideogame.name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select multiple chips variant="underlined" :items="['Acción', 'Carrera', 'Deportes', 'Exploración', 'Guerra', 'Lucha', 'Online', 'Rompecabezas', 'Simulador',
                                    'Violento', 'Anime', 'Casual', 'Fantasía', 'Indie', 'Multijugador', 'Plataforma', 'Sandbox', 'Supervivencia', 'Zombies',
                                    'Aventura', 'Cooperativo', 'Estrategia', 'FPS', 'JRPG', 'Mundo Abierto', 'Rol', 'Shooter', 'Terror'
                                ]" label="Género" required :rules="[requiredField]"
                                    v-model="newVideogame.genre"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Precio" required variant="underlined" type="number"
                                    :rules="[requiredField]" v-model="newVideogame.price"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-file-input label="Portada" variant="underlined" required
                                prepend-icon="fa-solid fa-camera-retro" name="image" @change="onChange"></v-file-input>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-textarea label="Descripción" variant="underlined" clearable :rules="[requiredField]"
                                v-model="newVideogame.description"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <div class="d-flex mx-auto justify-center">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="outlined" @click="emitValue(false)"
                    class="bg-red-darken-3 text-white font-weight-bold button1">
                    Cerrar
                </v-btn>
                <v-btn variant="outlined" class="bg-blue-darken-4 text-white font-weight-bold button2" type="submit">
                    Subir videojuego
                </v-btn>

            </v-card-actions>
        </div>
        </v-form>
    </v-card>
</template>

<script setup>
import { defineEmits, reactive, ref } from "vue";
import { instance_axios } from "../middlewares/axios";
import { useVideogameStore } from "../stores/videogames"
import { userData } from '../stores/userData';
const useModifierStore = userData()
import headers from "../middlewares/axios"
const videogameStore = useVideogameStore()
const form = ref(null)
import fs from "fs";

const token = localStorage.getItem('token')
const newVideogame = reactive({
    name: '',
    genre: [],
    description: '',
    price: null,
    image: ''
})


const requiredField = (value) => !!value || "Este campo es obligatorio";

const emit = defineEmits(['change-dialog-value'])
const file = ref()
const emitValue = (value) => {
    emit("change-dialog-value", value);
}

const onChange = (e) => {
    file.value = e.target.files[0];
    console.log(file.value);

    newVideogame.image = file.value
};

const uploadVideogame = async (e) => {
    e.preventDefault();
    if (!file.value) {
        return;
    }

    const data = new FormData();
    data.append("name", newVideogame.name)
    data.append("description", newVideogame.description)
    data.append("price", newVideogame.price)
    data.append("genre", newVideogame.genre)
    data.append("image", file.value);

 
    try {
        const videogame = await videogameStore.newVideogame(data)
        console.log(videogame);
        form.value.reset();
        emitValue(false)
    } catch (error) {
        console.log(error);
    }
};

</script>

<style lang="css" scoped>
.title {
    background-image: url('../assets/images/mario4.jpg');
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: cover;
    /* clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%); */
    zoom: 2.5;
    height: 50px;
}

.button1:hover {
    background-color: #fff !important;
    color: #C62828 !important;
}

.button2:hover {
    background-color: #fff !important;
    color: #0D47A1 !important;
}
</style>
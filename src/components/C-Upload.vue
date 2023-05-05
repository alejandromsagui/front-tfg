<template>
    <v-card>
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
                            <v-text-field label="Título" required variant="underlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-select multiple chips variant="underlined" :items="['Acción', 'Carrera', 'Deportes', 'Exploración', 'Guerra', 'Lucha', 'Online', 'Rompecabezas', 'Simulador',
                                'Violento', 'Anime', 'Casual', 'Fantasía', 'Indie', 'Multijugador', 'Plataforma', 'Sandbox', 'Supervivencia', 'Zombies',
                                'Aventura', 'Cooperativo', 'Estrategia', 'FPS', 'JRPG', 'Mundo Abierto', 'Rol', 'Shooter', 'Terror'
                            ]" label="Género" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Precio" required variant="underlined" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                </div>
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-file-input label="Portada" variant="underlined" required prepend-icon="fa-solid fa-camera-retro"
                            name="image"></v-file-input>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-textarea label="Descripción" variant="underlined" clearable></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions class="justify-center mx-auto">
            <v-spacer></v-spacer>
            <v-btn variant="outlined" @click="emitValue(false)" class="bg-red-darken-3 text-white font-weight-bold button1">
                Cerrar
            </v-btn>
            <v-btn variant="outlined" @click="emitValue(false)"
                class="bg-blue-darken-4 text-white font-weight-bold button2">
                Subir videojuego
            </v-btn>

        </v-card-actions>
    </v-card>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(['change-dialog-value'])

const emitValue = (value) => {
    emit("change-dialog-value", value);
}

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
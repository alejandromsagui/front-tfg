<template>
    <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="link" text><i class="fa-solid fa-upload mr-1"></i>Subir</v-btn>
        </template>
        <v-card>
            <v-card-title class="bg-red-darken-3 py-5">
                <span class="text-h5 ml-10 font-weight-bold">Sube un nuevo videojuego</span>
            </v-card-title>
            <v-card-text>
                <v-container fluid>
                    <div class="container">
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Título" required variant="underlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select multiple chips variant="underlined" :items="['Acción', 'Carrera', 'Deportes', 'Exploración', 'Guerra', 'Lucha', 'Online', 'Rompecabezas', 'Simulador',
                                        'Violento', 'Anime', 'Casual', 'Fantasía', 'Indie', 'Multijugador', 'Plataforma', 'Sandbox', 'Supervivencia', 'Zombies',
                                        'Aventura', 'Cooperativo', 'Estrategia', 'FPS', 'JRPG', 'Mundo Abierto', 'Rol', 'Shooter', 'Terror'
                                    ]" label="Género" required></v-select>
                            </v-col>
                        </v-row>
                    </div>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Precio" required variant="underlined" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-file-input label="Portada" variant="underlined" required></v-file-input>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-textarea label="Descripción" variant="underlined" clearable style="width: 880px;"
                                class="ml-6"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-3 text-white font-weight-bold" text @click="dialog = false">
                    Cerrar
                </v-btn>
                <v-btn color="blue-darken-3 text-white font-weight-bold" variant="text" @click="dialog = false">
                    Subir
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref();
const radio = ref();
</script>

<style lang="css" scoped>
.link {
    font-size: 12px;
    font-weight: 600;
}

.link::before {
    background-color: transparent !important;
}

.link:hover {
    color: rgb(248, 8, 8);
    transition: 0.3s;
}
.container{
border: red solid;
display: flex;
justify-content: center;
}
</style>

 <!-- <v-btn color="primary" v-bind="props">testp</v-btn> -->
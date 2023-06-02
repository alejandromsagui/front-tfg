<template>
    <v-card elevation="10">
        <v-row align="center">
            <v-col cols="auto">
                <v-sheet class="bg-red-darken-3 d-flex justify-center" width="70" height="70" style="align-items: center;"
                    rounded elevation="10">
                    <v-icon icon="fa-solid fa-gamepad"></v-icon>
                </v-sheet>
            </v-col>
            <v-col cols="auto" style="padding: 0" class="p-0">
                <v-card-title class="font-italic text-start mr-7 pa-0">Lista de videojuegos denunciados</v-card-title>
            </v-col>
            <v-col class="ml-auto d-flex" cols="3" style="flex-grow: 1; flex-shrink: 1;">
                <v-text-field hide-details label="Buscar..." placeholder="Usuario o correo"
                    append-inner-icon="fa-solid fa-search" filled rounded dense single-line class="shrink mt-2 mr-7"
                    v-model="searchQuery" variant="outlined">
                </v-text-field>
            </v-col>
        </v-row>
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="12" sm="12">
                    <v-table v-auto-animate>
                        <thead>
                            <tr>
                                <th class="text-left">Nombre del videojuego</th>
                                <th class="text-left">Usuario</th>
                                <th class="text-center">Número de denuncias</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TransitionGroup name="list">
                                <tr v-for="(user, index) in videogames" :key="user._id">
                                    <td>{{ user.nameVideogame }}</td>
                                    <td>{{ user.owner }}</td>
                                    <td class="text-center">{{ user.maxTimes }}</td>

                                    <td align="center">
                                        <v-tooltip text="Ver detalles">
                                            <template v-slot:activator="{ props }">
                                                <i class="fa-regular fa-folder-open fa-lg icons text-blue-accent-4"
                                                    v-bind="props" @click="getVideogameById(user.videogame);dialog = true; nuevoJuego = true"></i>
                                            </template>


                                        </v-tooltip>
                                        <v-tooltip text="Bloquear">
                                            <template v-slot:activator="{ props }">
                                                <i class="fa-solid fa-hand fa-lg ml-4 icons" v-bind="props"
                                                    style="color: #FFAB00" @click="blockUser(index)"></i>
                                            </template>
                                        </v-tooltip>

                                        <v-tooltip text="Eliminar">
                                            <template v-slot:activator="{ props }">
                                                <i v-bind="props" class="fa-solid fa-trash fa-lg ml-4 text-red icons"
                                                    @click="deleteVideogame(user.videogame); animationDelete(user)"></i>
                                            </template>
                                        </v-tooltip>
                                    </td>
                                </tr>
                            </TransitionGroup>
                        </tbody>
                    </v-table>
                    <v-dialog v-model="dialog" width="600" v-if="nuevoJuego">
                        <v-card height=500>
                            <div class="d-inline">
                        <div class="d-flex justify-end mr-3 mt-5">
                            <v-icon icon="fa-solid fa-rectangle-xmark text-red-darken-3 fa-xl"
                                @click="dialog = false"></v-icon>
                        </div>
                    </div>
                            <v-card-title>Detalles del <span class="text-red-darken-3">videojuego</span></v-card-title>
                            <v-card-subtitle>Nombre</v-card-subtitle>
                            <p class="ml-5">{{ nuevoJuego.name }}</p>
                            <v-card-subtitle >Género</v-card-subtitle>
                            <p class="ml-5">{{ genre }}</p>
                            <v-card-subtitle class="mt-2">Name<span class="text-red-darken-3">koins</span></v-card-subtitle>
                            <p class="ml-5">{{ nuevoJuego.price }}</p>
                            <v-card-subtitle class="mt-2">Plataforma</v-card-subtitle>
                            <p class="ml-5"> {{ nuevoJuego.platform }}</p>
                            <v-card-subtitle class="mt-2">Imagen</v-card-subtitle>
                            <p class="ml-5">{{ nuevoJuego.image }}</p>
                            <v-card-subtitle>Descripción</v-card-subtitle>
                            <p class="ml-5">{{ nuevoJuego.description }}</p>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<script setup>
import { onBeforeMount, ref } from "vue"
import { reportStore } from "../stores/reportStore"
import { reviewStore } from "../stores/reviewStore";
import { useVideogameStore } from "../stores/videogames"
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const searchQuery = ref()
const dialog = ref(false)
const videogameStore = useVideogameStore()
const useReportStore = reportStore()
const useReviewStore = reviewStore()

const nuevoJuego = ref()
const videogames = ref([])

const genre = ref([])

onBeforeMount(async () => {
    const res = await useReportStore.getVideogamesReported();
    console.log(res);

    const uniqueVideogames = [];
    const videogameNames = [];

    res.forEach(user => {
        if (!videogameNames.includes(user.nameVideogame)) {
            videogameNames.push(user.nameVideogame);
            uniqueVideogames.push(user);
        }
    });

    videogames.value = uniqueVideogames.map(user => ({
        ...user,
        maxTimes: Math.max(...res.filter(u => u.nameVideogame === user.nameVideogame).map(u => u.times))
    }));
});


//Eliminar y bloquear
const blockUser = async (index) => {
    const nickname = videogames.value[index].owner;
    console.log('valor de nickname: ', nickname);
    await useReportStore.reportUser(nickname)

}


const deleteVideogame = async (id) => {
    console.log('Lo que le llega a id: ', id);

    await videogameStore.deleteVideogameByAdmin(id).then((r) => {
        if (r.status === 200) {
            toast.success(r.data.message, {
                theme: "colored",
                autoClose: 3000
            })
        }
    }).catch((e) => {
        toast.error(e.message, {
            autoClose: 2000,
            theme: 'colored'
        })
    })
}

const animationDelete = (toRemove) => {
    videogames.value = videogames.value.filter((game) => game !== toRemove)
}

const getVideogameById = async (id) => {
    console.log('lo que llega de id: ', id);
    const response = await videogameStore.getVideogameById(id)
    console.log(response.data);
    nuevoJuego.value = response.data;
    console.log('Genero: ', nuevoJuego.value.genre);
    genre.value = nuevoJuego.value.genre
    genre.value = genre.value.join(",").replaceAll(',', ', ')
}
//Bloquear

</script>
<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.icons {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.icons:hover {
    transform: scale(1.2);
}

</style>
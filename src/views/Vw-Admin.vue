<template>
    <v-navigation-drawer id="app-drawer" class="cyan lighten-1 d-none d-md-block" app permanent>
        <v-list density="compact">
            <v-list-item avatar class="text-center">
                <v-avatar size="80" class="mt-3">
                    <img src="../assets/images/avatar.jpg" style="width: 80px;" alt="avatar">
                </v-avatar>
                <v-list-item-title class="align-self-center text-white mt-3 font-weight-bold text-h6">{{ nickname
                }}</v-list-item-title>
            </v-list-item>
            <v-divider class="mt-3 mb-10"></v-divider>
            <v-list-item v-for="item in items" :key="item.title" link class="mt-2" @click="handleItemClick(item)"
                :class="{ 'item-selected': item.selected }">
                <v-row align="center">
                    <v-col cols="auto">
                        <v-icon :icon="item.icon"></v-icon>
                    </v-col>
                    <v-col cols="auto">
                        <v-list-item-title class="text-white py-3">{{ item.text }}</v-list-item-title>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-container fluid>
        <template v-if="!showUsers && !showAlerts">
            <v-row class="justify-center mt-5">
                <v-col cols="6">
                    <v-card rounded height="500">
                        <v-card-title>Namekians<span class="text-red-darken-3 font-weight-bold">Games</span>
                            dashboard</v-card-title>
                        <v-card-subtitle>Actividad reciente</v-card-subtitle>
                        <v-card-item class="text-center">
                                <CChart/>
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card rounded height="500">
                        <v-card-title>Usuarios <span
                                class="text-red-darken-3 font-weight-bold">conectados</span></v-card-title>
                        <v-card-subtitle>Usuarios en línea</v-card-subtitle>
                        <v-card-item class="text-center">
                            Gráfica
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col cols="12" sm="12" md="12">
                    <v-card rounded height="400">
                        <v-card-title class="mt-3">Valoraciones <span
                                class="text-red-darken-3 font-weight-bold">globales</span></v-card-title>
                        <v-card-subtitle>Últimas valoraciones</v-card-subtitle>
                        <v-card-item class="text-center">
                            <v-table theme="dark">
                                <thead>
                                    <tr>
                                        <th class="text-left">Usuario</th>
                                        <th class="text-left">Usuario valorado</th>
                                        <th class="text-left">Puntuación</th>
                                        <th class="text-left">Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="user in ratings.values" :key="user.nickname" class="text-start">
                                        <td>{{ user.nickname }}</td>
                                        <td>
                                            {{ user.nicknameUserProfile }}
                                        </td>
                                        <td>
                                            <v-rating size="x-small" color="yellow-darken-1" disabled
                                                v-model="user.rating"></v-rating>
                                        </td>
                                        <td>
                                            {{ user.comment }}
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        <template v-if="showUsers">
            <v-card>
                <v-card-text>
                    <v-row class="d-flex justify-center">
                        <v-col cols="4" class="text-center font-weight-bold text-h6 mb-2">Nombre de usuario</v-col>
                        <v-col cols="4" class="text-center font-weight-bold text-h6 mb-2">Correo electrónico</v-col>
                        <v-col cols="4" class="text-center font-weight-bold text-h6 mb-2">Acciones</v-col>
                    </v-row>
                    <v-divider class="py-3"></v-divider>
                    <v-row v-for="user in users" :key="user._id" class="d-flex justify-center">
                        <v-col cols="4" class="text-center">
                            <a :href="'/perfil/' + user.nickname" target="_blank" class="text-red-darken-1">{{ user.nickname
                            }}</a>
                        </v-col>
                        <v-col cols="4" class="text-center">
                            <p> {{ user.email }}</p>
                        </v-col>
                        <v-col cols="4">
                            <v-card-actions>
                                <div class="d-flex mx-auto">
                                    <v-btn class="bg-amber-accent-4 text-white font-weight-bold" variant="outlined"
                                        @click="blockUser(user.nickname)">Bloquear</v-btn>
                                    <v-btn class="bg-red-darken-1 text-white font-weight-bold"
                                        variant="outlined">Borrar</v-btn>
                                </div>
                            </v-card-actions>
                        </v-col>
                        <v-divider class="py-3"></v-divider>
                    </v-row>
                </v-card-text>
            </v-card>
        </template>
        <template v-if="showAlerts">
            <v-card class="mb-10">
                <v-card-title class="pa-5 pb-5 bg-red-darken-3 text-white text-h6">Notificaciones</v-card-title>
                <v-card width="600" elevation="10" class="d-flex mx-auto mt-5">
                    <v-card-text class="mt-3">Notificación</v-card-text>

                </v-card>
            </v-card>
        </template>
    </v-container>
</template>

<script setup>
import { reactive, ref, onBeforeMount, onMounted } from "vue";
import { useLoginStore } from '../stores/login'
import { userData } from '../stores/userData'
import { reportStore } from "../stores/reportStore"
import { reviewStore } from "../stores/reviewStore"
import { socket } from "../services/socket"
import { router } from "../routes";
import { toast } from 'vue3-toastify';
import { CChart } from "../components"
import 'vue3-toastify/dist/index.css';

const authStore = useLoginStore();
const userDataStore = userData();
const useReportStore = reportStore();
const useReviewStore = reviewStore()
const nickname = ref()
const showUsers = ref(false);
const showAlerts = ref(false);
const showMain = ref(false)

const items = reactive([
    { text: 'Principal', action: 'main', icon: 'fa-sharp fa-solid fa-house' },
    { text: 'Lista de usuarios', action: 'users', icon: 'fa-solid fa-user' },
    { text: 'Panel de alertas', action: 'alerts', icon: 'fa-sharp fa-solid fa-bell' },
    { text: 'Videojuegos', action: 'videogames', icon: 'fa-sharp fa-solid fa-gamepad' },
    { text: 'Transacciones', action: 'transactions', icon: 'fa-solid fa-shop' },
]);

const ratings = reactive([])
const users = ref([])

onBeforeMount(() => {
    console.log('Nickname de admin: ' + authStore.getNickname);
    nickname.value = authStore.getNickname;
})


const notification = ref()
onMounted(() => {
    socket.on('adminNotification', (message) => {
        console.log('Mensaje del servidor:', message);
        notification.value = message;

        toast.warning(notification.value, {
            theme: "colored",
            autoClose: 3000
        })
    });
})


onMounted(async () => {

    const res = await useReviewStore.getAllReviews();
    ratings.values = res.dataRating;
    ratings.values.reverse()
    console.log('Ratings values ', ratings.values);
})

const lineChart = ref()





const handleItemClick = async (item) => {
    // quita la seleccion anterior
    items.forEach((i) => i.selected = false);

    // selecciona el item actual
    item.selected = true;

    // cambia las secciones
    if (item.action === 'users') {
        showUsers.value = true;
        showAlerts.value = false;

        const getUsers = await userDataStore.getUsers()
        console.log(Array.isArray(getUsers));
        users.value.push(...getUsers)
        console.log(users);
    } else if (item.action === 'alerts') {
        showAlerts.value = true;
        showUsers.value = false;
    } else if (item.action === 'main') {
        showAlerts.value = false;
        showUsers.value = false;
    }
}

const blockUser = async (nickname) => {
    await useReportStore.reportUser(nickname)
}




</script>

<style scoped>
.item-selected {
    background-color: #C62828;
    color: white;
    transition: 0.3s;
}

canvas {
  max-width: 600px;
  margin: 0 auto;
}
</style>

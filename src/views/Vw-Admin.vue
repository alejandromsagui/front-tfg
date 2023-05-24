<template>
    <v-navigation-drawer id="app-drawer" class="cyan lighten-1" app permanent v-if="!isMobile">
        <v-list dense>
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
                <v-col cols="12" md="6">
                    <v-card rounded>
                        <v-card-title>Namekians<span class="text-red-darken-3 font-weight-bold">Games</span>
                            dashboard</v-card-title>
                        <v-card-subtitle>Actividad reciente</v-card-subtitle>
                        <v-card-item class="text-center">
                            <CChart />
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card rounded>
                        <v-card-title>Usuarios <span
                                class="text-red-darken-3 font-weight-bold">conectados</span></v-card-title>
                        <v-card-subtitle>Concurrencia de usuarios en tiempo real</v-card-subtitle>
                        <v-card-item class="text-center">
                            <CChartConnection />
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
            <v-card elevation="10">
                <v-row align="center">
                    <v-col cols="auto">
                        <v-sheet class="bg-red-darken-3 d-flex justify-center" width="70" height="70"
                            style="align-items: center;" rounded elevation="10">
                            <v-icon icon="fa-solid fa-user"></v-icon>
                        </v-sheet>
                    </v-col>
                    <v-col cols="auto" style="padding: 0" class="p-0">
                        <v-card-title class="font-italic text-start mr-7 pa-0">Lista de usuarios</v-card-title>
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
                                        <th class="text-left">Nombre de usuario</th>
                                        <th class="text-left">Correo electrónico</th>
                                        <th class="text-left">Estado</th>
                                        <th class="text-left"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <TransitionGroup name="list">
                                        <tr v-for="user in filteredUsers" :key="user.nickname">
                                            <td>{{ user.nickname }}</td>
                                            <td>{{ user.email }}</td>
                                            <td>{{ user.blocked ? 'Bloqueado' : 'Activo' }}</td>
                                            <td>
                                                <div class="d-flex justify-end">
                                                    <v-btn v-if="user.blocked == false"
                                                        class="bg-amber-accent-4 text-white font-weight-bold mr-3"
                                                        variant="outlined" @click="blockUser(user.nickname)">
                                                        Bloquear
                                                    </v-btn>
                                                    <v-btn v-if="user.blocked == true">DESBLOQUEAR</v-btn>
                                                    <v-btn class="bg-red-darken-1 text-white font-weight-bold"
                                                        variant="outlined"
                                                        @click="deleteUser(user.nickname); animationDelete(user)">
                                                        Borrar
                                                    </v-btn>
                                                </div>
                                            </td>
                                        </tr>
                                    </TransitionGroup>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </template>
        <template v-if="showAlerts">
            <CNotifications />
        </template>
    </v-container>
</template>

<script setup>
import { reactive, ref, onBeforeMount, onMounted, computed, watch } from "vue";
import { CChart, CChartConnection, CNotifications } from "../components"
import { useLoginStore } from '../stores/login'
import { userData } from '../stores/userData'
import { reportStore } from "../stores/reportStore"
import { reviewStore } from "../stores/reviewStore"
import { socket } from "../services/socket"
import { router } from "../routes";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const authStore = useLoginStore();
const userDataStore = userData();
const useReportStore = reportStore();
const useReviewStore = reviewStore()
const nickname = ref()
const showUsers = ref(false);
const showAlerts = ref(false);
const showMain = ref(false)
const searchQuery = ref()



const isMobile = computed(() => window.innerWidth <= 960)

const items = reactive([
    { text: 'Principal', action: 'main', icon: 'fa-sharp fa-solid fa-house', selected: true },
    { text: 'Lista de usuarios', action: 'users', icon: 'fa-solid fa-user' },
    { text: 'Panel de alertas', action: 'alerts', icon: 'fa-sharp fa-solid fa-bell' },
    { text: 'Videojuegos', action: 'videogames', icon: 'fa-sharp fa-solid fa-gamepad' },
    { text: 'Transacciones', action: 'transactions', icon: 'fa-solid fa-shop' },
]);

const ratings = reactive([])
const users = ref([])



const filteredUsers = computed(() => {
    if (!searchQuery.value) {
        return users.value;
    } else {
        const query = searchQuery.value.toLowerCase().replace(/\s/g, '');
        return users.value.filter(user =>
            user.nickname.toLowerCase().replace(/\s/g, '').includes(query) ||
            user.email.toLowerCase().replace(/\s/g, '').includes(query)
        );
    }
});

onBeforeMount(() => {
    // if (!users.value) userDataStore.getUsers().then(r => {
    //     if (r.status === 200) {
    //         showUsers.value = true;
    //     }
    // })

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
        users.value = [];
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

const deleteUser = async (nickname) => {
    await userDataStore.deleteUserByAdmin(nickname)
}

const animationDelete = (toRemove) => {
    users.value = users.value.filter((user) => user !== toRemove)
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

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>

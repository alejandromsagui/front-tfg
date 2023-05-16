<template>
    <v-navigation-drawer id="app-drawer" class="cyan lighten-1" app permanent>
        <v-list>
            <v-list-item avatar class="text-center">
                <v-avatar size="80" class="mt-3">
                    <img src="../assets/images/avatar.jpg" style="width: 80px;" alt="avatar">
                </v-avatar>
                <v-list-item-title class="align-self-center text-white mt-3 font-weight-bold text-h6">{{ nickname
                }}</v-list-item-title>
            </v-list-item>
            <v-divider class="mt-3 mb-10"></v-divider>
            <v-list-item v-for="item in items" :key="item.title" link class="mt-2" @click="handleItemClick(item)">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title class="text-white py-3">{{ item.text }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-container fluid>
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
                            <a :href="'/perfil/' + user.nickname" target="_blank" class="text-red-darken-1">{{ user.nickname }}</a>
                        </v-col>
                        <v-col cols="4" class="text-center">
                            <p> {{ user.email }}</p>
                        </v-col>
                        <v-col cols="4">
                            <v-card-actions>
                                <div class="d-flex mx-auto">
                                    <v-btn class="bg-amber-accent-4 text-white font-weight-bold"
                                        variant="outlined">Bloquear</v-btn>
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
            <h2>Adios</h2>
        </template>
    </v-container>
</template>

<script setup>
import { reactive, ref, onBeforeMount, onMounted } from "vue";
import { useLoginStore } from '../stores/login'
import { userData } from '../stores/userData'
import { router } from "../routes";

const authStore = useLoginStore();
const userDataStore = userData();
const nickname = ref()
const showUsers = ref(false);
const showAlerts = ref(false);

const items = reactive([
    { text: 'Lista de usuarios', action: 'users', icon: 'fa-solid fa-user' },
    { text: 'Panel de alertas', action: 'alerts', icon: 'fa-sharp fa-solid fa-bell' },
    { text: 'Videojuegos', action: 'videogames', icon: 'fa-sharp fa-solid fa-gamepad' },
    { text: 'Transacciones', action: 'transactions', icon: 'fa-solid fa-shop' },
]);

const users = reactive([])
console.log(users);

onBeforeMount(() => {
    console.log('Nickname de admin: '+authStore.getNickname);
    nickname.value = authStore.getNickname;
})

const handleItemClick = async (item) => {
    if (item.action === 'users') {
        showUsers.value = true;
        showAlerts.value = false;

        const getUsers = await userDataStore.getUsers()
        console.log(Array.isArray(getUsers));
        users.push(...getUsers)
        console.log(users);
    } else {
        showAlerts.value = true;
        showUsers.value = false;
    }
}
</script>

<style scoped></style>

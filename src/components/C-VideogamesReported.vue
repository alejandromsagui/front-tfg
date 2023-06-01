<template>
                <v-card elevation="10">
                <v-row align="center">
                    <v-col cols="auto">
                        <v-sheet class="bg-red-darken-3 d-flex justify-center" width="70" height="70"
                            style="align-items: center;" rounded elevation="10">
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
                                        <th class="text-left">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <TransitionGroup name="list">
                                        <!-- <tr v-for="(user, index) in filteredUsers" :key="user.nickname">
                                            <td>{{ user.nickname }}</td>
                                            <td>{{ user.email }}</td>
                                            <td>{{ user.blocked ? 'Bloqueado' : 'Activo' }}</td>
                                            <td>
                                                <div class="d-flex justify-end">
                                                    <v-btn v-if="user.blocked == false"
                                                        class="text-white font-weight-bold mr-3 btn-block"
                                                        variant="outlined" @click="blockUser(index)" prepend-icon="fa-solid fa-hand">
                                                        Bloquear
                                                    </v-btn>
                                                    <v-btn v-if="user.blocked == true" class="text-white mr-3 btn btn-unblock" prepend-icon="fa-solid fa-unlock" variant="outlined" @click="unblockUser(index)">DESBLOQUEAR</v-btn>
                                                    <v-btn class="text-white font-weight-bold btn-delete"
                                                        variant="outlined"
                                                        @click="deleteUser(user.nickname); animationDelete(user)" prepend-icon="fa-solid fa-user-slash">
                                                        Borrar
                                                    </v-btn>
                                                </div>
                                            </td>
                                        </tr> -->
                                    </TransitionGroup>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
</template>
<script setup>
import { ref } from "vue"
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
</style>
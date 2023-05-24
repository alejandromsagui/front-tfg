<template>
    <v-row class="justify-center">
        <v-col cols="12" sm="12" md="12">
            <v-card rounded height="auto">
                <v-card-title class="mt-3">Panel de <span
                        class="text-red-darken-3 font-weight-bold">alertas</span></v-card-title>
                <v-card-subtitle>Notificaciones</v-card-subtitle>
                <v-table theme="dark">
                    <thead>
                        <tr>
                            <th class="text-left">Usuario</th>
                            <th class="text-left">Fecha</th>
                            <th class="text-left">Tipo</th>
                            <th class="text-left">Motivo</th>
                            <th class="text-left">Acciones</th>
                            <th class="text-left">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in useReportStore.notifications.getAllReports" :key="user.nickname">
                            <td class="text-left">
                                <router-link :to="`/perfil/${user.user}`" class="text-red-darken-1" target="_blank">
                                    {{ user.user }}
                                </router-link>
                            </td>
                            <td class="text-left">
                                {{ user.date }}
                            </td>
                            <td class="text-left">
                                {{ user.type }}
                            </td>
                            <td class="pa-1 text-left" v-if="user.type === 'Reporte'">
                                <v-alert variant="outlined" type="error" max-width="250" max-height="150">
                                    {{ user.message }}
                                </v-alert>
                            </td>
                            <td class="pa-1 text-left" v-else>
                                <v-alert variant="outlined" type="warning" max-width="250" max-height="150">
                                    {{ user.message }}
                                </v-alert>
                            </td>
                            <td class="text-left">
                                <v-tooltip text="Marcar como leído">
                                    <template v-slot:activator="{ props }">
                                        <i v-bind="props" class="fas fa-check-circle fa-lg ml-3 text-green icons"></i>
                                    </template>
                                </v-tooltip>

                                <v-tooltip text="Eliminar">
                                    <template v-slot:activator="{ props }">
                                        <i v-bind="props" class="fa-solid fa-trash fa-lg ml-4 text-red icons"></i>
                                    </template>
                                </v-tooltip>

                            </td>
                            <td class="text-left">
                                Ver más
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-col>
    </v-row>
</template>
  
<script setup>
import { onBeforeMount } from "vue";
import { reportStore } from "../stores/reportStore"

const useReportStore = reportStore()
onBeforeMount(async () => {
    await useReportStore.getReports()
})

</script>
  
<style lang="css" scoped>
.icons {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.icons:hover {
    transform: scale(1.2);
}
</style>
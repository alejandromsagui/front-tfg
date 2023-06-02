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
                            <th class="text-center">Usuario</th>
                            <th class="text-center">Fecha</th>
                            <th class="text-center">Tipo</th>
                            <th class="text-center">Motivo</th>
                            <th class="text-center">Acciones</th>
                            <th class="text-center">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TransitionGroup name="list">
                        <tr v-for="(user, index) in allReports" :key="user.id">
                            <td class="text-center">
                                <router-link :to="`/perfil/${user.user}`" class="text-red-darken-1" target="_blank">
                                    {{ user.user }}
                                </router-link>
                            </td>
                            <td class="text-center">
                                {{ user.date }}
                            </td>
                            <td class="text-center">
                                {{ user.type }}
                            </td>
                            <td class="pa-1 text-center" v-if="user.type === 'Reporte'">
                                <v-alert variant="outlined" type="error" max-width="250" max-height="150" class="d-flex mx-auto">
                                    {{ user.message }}
                                </v-alert>
                            </td>
                            <td class="pa-1 text-center justify-center align-center" v-else>
                                <v-alert variant="outlined" type="warning" max-width="250" max-height="150" class="d-flex mx-auto">
                                    {{ user.message }}
                                </v-alert>
                            </td>
                            <td class="text-center">
                                <v-tooltip text="Marcar como leído" v-if="user.type !== 'Reporte'">
                                    <template v-slot:activator="{ props }">
                                        <i v-bind="props" class="fas fa-check-circle fa-lg ml-3 text-green icons" @click="markAsRead(index)"></i>
                                    </template>
                                </v-tooltip>

                                <v-tooltip text="Eliminar">
                                    <template v-slot:activator="{ props }">
                                        <i v-bind="props" class="fa-solid fa-trash fa-lg ml-4 text-red icons" @click="deleteNotification(user.id); deleteAnimation(user)"></i>
                                    </template>
                                </v-tooltip>

                            </td>
                            <td class="text-center" v-if="user.type === 'Recomendación'">
                                Ver más
                            </td>
                            <td class="text-center text-red-darken-3" v-else>
                                No disponible
                            </td>
                        </tr>
                    </TransitionGroup>
                    </tbody>
                </v-table>
            </v-card>
        </v-col>
    </v-row>
</template>
  
<script setup>
import { onBeforeMount, ref, computed } from "vue";
import { reportStore } from "../stores/reportStore"
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";


const useReportStore = reportStore()
const allReports = ref([])

onBeforeMount(async () => {
  try {
    const response = await useReportStore.getReports();
    allReports.value = response.data.getAllReports;
    console.log('Valor de allReports después de la asignación:', allReports.value);
  } catch (error) {
    console.log(error);
    // Maneja el error de manera apropiada
  }
});

const deleteNotification = async(id) => {
    await useReportStore.deleteNotification(id).then((r) => {
        if(r.status === 200){
            console.log('res', r);
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

const deleteAnimation = (toRemove) => {
    allReports.value = allReports.value.filter((report) => report !== toRemove)
}

const markAsRead = async (index) => {
  try {
    const selectedReport = allReports.value[index];
    const response = await useReportStore.changeReaded(selectedReport.id);
    
    selectedReport.readed = true;

    // Reordenar la notificación al final de la lista
    allReports.value.splice(index, 1);
    allReports.value.push(selectedReport);
  } catch (error) {
    console.log(error);
    // Maneja el error de manera apropiada
  }
};

</script>
  
<style lang="css" scoped>
.icons {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

.icons:hover {
    transform: scale(1.2);
}
.item-selected {
    background-color: #C62828;
    color: white;
    transition: 0.3s;
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
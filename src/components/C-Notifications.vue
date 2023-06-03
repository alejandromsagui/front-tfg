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
                            <tr v-for="(user, index) in allReports" :key="user.id" :class="{ 'readed': user.readed }">
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
                                <td class="pa-1 text-center justify-center align-center" v-if="user.type === 'Recomendación'">
                                    <v-alert variant="outlined" type="warning" max-width="250" max-height="150" v-if="user.readed === false"
                                        class="d-flex mx-auto">
                                        {{ user.message }}
                                    </v-alert>
                                    <p class="text-red-darken-3" v-else>Leído</p>
                                </td>
                                <td class="pa-1 text-center" v-if="user.type === 'Reporte'">
                                    <v-alert variant="outlined" type="error" max-width="250" max-height="150"
                                        class="d-flex mx-auto">
                                        {{ user.message }}
                                    </v-alert>
                                </td>
                                <td class="text-center">
                                    <v-tooltip text="Marcar como leído" v-if="user.type !== 'Reporte' && user.readed === false">
                                        <template v-slot:activator="{ props }">
                                            <i v-bind="props" class="fas fa-check-circle fa-lg ml-3 text-green icons"
                                                @click="markAsRead(index)"></i>
                                        </template>
                                    </v-tooltip>
                                    
                                    <v-tooltip text="Leído" v-if="user.type !== 'Reporte' && user.readed === true">
                                        <template v-slot:activator="{ props }">
                                            <i class="fas fa-envelope-open icons fa-lg" v-bind="props"></i>
                                        </template>
                                    </v-tooltip>
                                    


                                    <v-tooltip text="Eliminar">
                                        <template v-slot:activator="{ props }">
                                            <i v-bind="props" class="fa-solid fa-trash fa-lg ml-4 text-red icons"
                                                @click="deleteNotification(user.id); deleteAnimation(user)"></i>
                                        </template>
                                    </v-tooltip>

                                </td>
                                <td class="text-center text-decoration-underline" v-if="user.type === 'Recomendación'"
                                    @click="dialog = true; message(user)" style="cursor: pointer;">
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
            
            <v-dialog v-model="dialog" width="500" v-if="seeMessage">
                <v-card heigth="500">
                    <div class="d-inline">
                        <div class="d-flex justify-end mr-3 mt-5">
                            <v-icon icon="fa-solid fa-rectangle-xmark text-red-darken-3 fa-xl"
                                @click="dialog = false"></v-icon>
                        </div>
                    </div>
                    <v-card-title class="ml-3 mb-2 text-center">Mensaje de <span
                            class="text-red-darken-3 font-weight-bold">recomendación</span></v-card-title>
                    <v-textarea class="mt-3 ml-4 mr-4" v-model="messageText"></v-textarea>
                    <v-card-actions class="justify-center">
                        <v-btn variant="outlined" class="text-white bg-red-darken-3 font-weight-bold button"
                            @click="editNotificationDetails(notificationId, messageText)">Editar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>
  
<script setup>
import { onBeforeMount, ref, computed, watch } from "vue";
import { reportStore } from "../stores/reportStore"
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";


const useReportStore = reportStore()
const allReports = ref([])
const dialog = ref(false)
const seeMessage = ref()

onBeforeMount(async () => {
    try {
        const response = await useReportStore.getReports();
        allReports.value = response.data.getAllReports;
        console.log('Valor de allReports después de la asignación:', allReports.value);
    } catch (error) {
        console.log(error);
    }
    // Ordenar el array allReports
allReports.value.sort((a, b) => {
  // Comparar la propiedad user.readed de cada objeto
  if (a.readed && !b.readed) {
    return 1; // a viene después de b
  } else if (!a.readed && b.readed) {
    return -1; // a viene antes de b
  } else {
    return 0; // No se cambia el orden
  }
});

    
});
let messageText = ref()
const notificationId = ref()

const message = (user) => {
    console.log('esto es user: ', user);
    seeMessage.value = true;
    messageText.value = user.details;
    notificationId.value = user.id;
}
const deleteNotification = async (id) => {
    await useReportStore.deleteNotification(id).then((r) => {
        if (r.status === 200) {
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

const editNotificationDetails = async (id) => {
  console.log('lo que da id: ', id);
  const details = messageText.value;
  
  // Buscar el objeto correspondiente en la matriz allReports
  const user = allReports.value.find(user => user.id === id);

  if (user) {
    // Actualizar el valor de messageText en el objeto user
    user.details = details;

    await useReportStore.editNotificationDetail(id, details).then((r) => {
      if (r.status === 200) {
        console.log('res', r);
        console.log('valor de details: ', details);

        toast.success(r.data.message, {
          theme: "colored",
          autoClose: 3000
        });
      }

      dialog.value = false;
    }).catch((e) => {
      toast.error(e.message, {
        autoClose: 2000,
        theme: 'colored'
      });
    });
  } else {
    console.log('No se encontró el objeto con el id:', id);
  }
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
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
    font-family: "Roboto", sans-serif;
}

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

.button {
    flex: 0 0 auto !important;
    background: linear-gradient(to left, #F80808 50%, #fff 50%) right !important;
    background-size: 200% !important;
    transition: .3s ease-out !important;
    font-weight: bold;
}

.button:hover {
    background-position: left !important;
    color: red !important;
}
.readed {
  /* Estilo que deseas aplicar cuando user.readed es true */
  /* Por ejemplo, cambiar el color de fondo de la fila a gris */
    color: gray;
}
</style>
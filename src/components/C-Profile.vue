<template>
    <div style="background-color: #212121; width: 100%; height: 15%;"></div>
    <v-container class=" mt-4" fluid>
        <div class="d-flex align-items-center" style="margin-left: 50px;">
            <v-avatar size="100" style="margin-top: -50px;" align="center" justify="center">
                <img src="../assets/images/avatar.jpg" alt="Profile Picture" style="width: 100px">
            </v-avatar>
            <div>
                <h4 class="ml-4">{{ data.nickname }}</h4>
            </div>
        </div>
        <v-row class="mt-4 ml-10">
            <div style="display: inline-block; max-width: 450px; width: 450px;">
                <v-col cols="12" sm="6" md="8">
                    <v-list class="bg-transparent">
                        <v-list-subheader class="font-weight-bold text-white">PERFIL</v-list-subheader>
                        <v-list-item v-for="(item, i) in items.slice(0, 4)" :key="i" :value="item" active-color="#F80808"
                            variant="plain" @click="handleItemClick(item)">
                            <v-list-item-title>{{item.text}}</v-list-item-title>
                        </v-list-item>
                        <v-list-subheader class="font-weight-bold text-white">TRANSACCIONES</v-list-subheader>
                        <v-list-item v-for="(item, i) in items.slice(4, 6)" :key="i" :value="item" active-color="#F80808"
                            variant="plain">
                            <v-list-item-title>{{item.text}}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-btn class="font-weight-bold bg-red-darken-3 mt-10" variant="outlined">ELIMINAR CUENTA

                                <v-dialog v-model="dialog" activator="parent" max-width="500">
                                    <v-card>
                                        <div class="bg-white text-black d-flex align-center pa-2">
                                            <v-card-title class="text-left flex-grow-1 font-weight-bold text-h6">Confirmar</v-card-title>
                                            <div class="d-flex mr-3">
                                                <v-icon icon="fa-solid fa-rectangle-xmark text-red-darken-3"
                                                    @click="dialog = false"></v-icon>
                                            </div>
                                        </div>
                                        <v-card-text class="text-h5 text-center">
                                            ¿Estás seguro de que quieres eliminar tu cuenta? Una vez realizada esta acción,
                                            no la podrás
                                            <span class="text-red-darken-3 font-weight-bold">recuperar</span>
                                        </v-card-text>
                                        <v-card-actions class="justify-center mt-5">
                                            <v-btn class="text-white bg-red-darken-3 font-weight-bold" variant="outlined" @click="deleteUser()">Eliminar de todas
                                                formas</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-btn>
                        </v-list-item>
                    </v-list>
                </v-col>
            </div>
            <v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showNickname">
                <v-col cols="12" md="8" xl="6" class="pa-0">
                    <v-sheet :height="450" max-width="900" class="mb-16 d-flex justify-center align-center d-none" rounded>
                        <div style="text-align: center; width: 400px;">
                            <h2 class="text-center text-white font-weight-bold mb-10">Cambiar nombre de usuario</h2>
                            <p class="text-center text-subtitle-2 mb-10 text-grey">Selecciona un nuevo nombre de usuario</p>
                            <div class="text-start mb-4">
                                <p class="text-subtitle-2 text-grey">Nombre de usuario actual</p>
                                <p>{{ data.nickname }}</p>
                            </div>
                            <slot name="username"></slot>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showEmail">
                <v-col cols="12" md="8" xl="6" xs="3" sm="3" class="pa-0">
                    <v-sheet :height="450" max-width="900" class="mb-16 d-flex justify-center align-center d-none" rounded>
                        <div style="text-align: center; width: 400px;">
                            <h2 class="text-center text-white font-weight-bold mb-10">Cambiar correo de la cuenta</h2>
                            <p class="text-center text-subtitle-2 mb-10 text-grey">Selecciona un nuevo correo para acceder a
                                tu cuenta</p>
                            <div class="text-start mb-4">
                                <p class="text-subtitle-2 text-grey">Correo actual</p>
                                <p>{{ data.email }}</p>
                            </div>
                            <slot name="email"></slot>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showPassword">
                <v-col cols="12" md="8" xl="6" class="pa-0">
                    <v-sheet :height="480" max-width="900" class="mb-16 d-flex justify-center align-center d-none" rounded>
                        <div style="text-align: center; width: 400px;">
                            <h2 class="text-center text-white font-weight-bold mb-10">Cambiar contraseña de la cuenta</h2>
                            <p class="text-center text-subtitle-2 mb-10 text-grey">Escoge una contraseña robusta para
                                mantener la seguridad de tu cuenta</p>
                            <slot name="password"></slot>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showRecommendations">
                <v-col cols="12" md="8" xl="6" class="pa-0">
                    <v-sheet :height="480" max-width="900" class="mb-16 d-flex justify-center align-center d-none" rounded>
                        <div style="text-align: center; width: 400px;">
                            <h2 class="text-center text-white font-weight-bold mb-10">Envíanos una recomendación</h2>
                            <p class="text-center text-subtitle-2 mb-10 text-grey">Si tienes alguna sugerencia para mejorar la plataforma,
                                escríbela aquí y lo tendremos en cuenta
                            </p>
                            <v-textarea label="Recomendación" clearable 
                            no-resize v-model="message" variant="outlined"></v-textarea>

                            <v-btn class="font-weight-bold bg-red-darken-3" variant="outlined" @click="newRecommendation(message)">ENVIAR</v-btn>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, reactive, onBeforeMount, watchEffect, watch, onMounted } from 'vue';
import { useLoginStore } from "../stores/login"
import { userData } from "../stores/userData";
import { Buffer } from 'buffer';

const showNickname = ref(false);
const showEmail = ref(false);
const showPassword = ref(false);
const showRecommendations = ref(false);
const userDataStore = userData();
const useAuthStore = useLoginStore();
const dialog = ref()
const data = reactive({
    nickname: '',
    email: ''
});

const message = ref()
const getData = async () => {
    const token = localStorage.getItem('token');
    const [header, payload, signature] = token.split(".");
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));
    return decodedPayload;
}

const newRecommendation = (message) => {
    userDataStore.newRecommendation(message)
}
onBeforeMount(async () => {
    const tokenData = await getData()
    data.nickname = tokenData.nickname;
    data.email = tokenData.email;
});

const deleteUser = async() => {
    await userDataStore.deleteUser()
}

// watch(() => data.nickname, async (newNickname, oldNickname) => {
//    if (newNickname !== oldNickname) {
//        console.log('Valor de nickname: ' + data.nickname);
//        await userDataStore.updateTokenByNickname(newNickname);
//        console.log('El nombre ha sido cambiado por: ' + newNickname);
//        data.nickname = newNickname;
//    }
// });

// watch(() => getData.getEmail, async (newEmail, oldEmail) => {
//     if(newEmail !== oldEmail){
//         console.log('Valor de getEmail: '+getData.getEmail);
//         await getData.updateTokenByEmail(newEmail)
//         console.log('El correo ha sido cambiado por: '+getData.getEmail);
//         data.email = newEmail;
//     }
// })
// watchEffect( async () => {
//     const { getNickname, getEmail } = getData;
//     data.nickname = getNickname;
//     data.email = getEmail;
//     console.log('Token desde whatchEffect: '+getData.newToken);

// });

const items = reactive([
    { text: 'Modificar nombre de usuario', action: 'username' },
    { text: 'Modificar email', action: 'email' },
    { text: 'Modificar contraseña', action: 'password' },
    { text: 'Recomendaciones', action: 'recommendation' },
    { text: 'Historial de compras' },
    { text: 'Exportar datos' },
]);

const handleItemClick = (item) => {
    if (item.action === 'username') {
        showNickname.value = true;
        showEmail.value = false;
        showPassword.value = false;
        showRecommendations.value = false;

    } else if (item.action === 'email') {
        showNickname.value = false;
        showEmail.value = true;
        showPassword.value = false;
        showRecommendations.value = false;
    } else if (item.action === 'password') {
        showNickname.value = false;
        showEmail.value = false;
        showPassword.value = true;
        showRecommendations.value = false;
    } else if (item.action === 'recommendation'){
        showNickname.value = false;
        showEmail.value = false;
        showPassword.value = false;
        showRecommendations.value = true;
    }
};

</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
    font-family: "Roboto", sans-serif;
}

.d-flex {
    display: flex;
}

.justify-center {
    justify-content: center;
}

.align-center {
    align-items: center;
}

.d-none.d-md-block.pa-0 {
    margin-left: -50px;
}
</style>
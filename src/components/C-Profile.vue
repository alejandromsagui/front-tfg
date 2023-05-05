<template>
    <div style="background-color: #212121; width: 100%; height: 15%;"></div>
    <v-container class=" mt-4" fluid>
        <div class="d-flex align-items-center" style="margin-left: 50px;">
            <v-avatar size="100" style="margin-top: -50px;" align="center" justify="center">
                <img src="../assets/images/avatar.jpg" alt="Profile Picture" style="width: 100px">
            </v-avatar>
            <div>
                <h4 class="ml-4">{{ nickname }}</h4>
            </div>
        </div>
        <v-row class="mt-4 ml-10">
            <div style="display: inline-block; max-width: 450px; width: 450px;">
                <v-col cols="12" sm="6" md="8">
                    <v-list class="bg-transparent">
                        <v-list-subheader class="font-weight-bold text-white">PERFIL</v-list-subheader>
                        <v-list-item v-for="(item, i) in items.slice(0, 3)" :key="i" :value="item" active-color="#F80808"
                            variant="plain" @click="handleItemClick(item)">
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>
                        <v-list-subheader class="font-weight-bold text-white">TRANSACCIONES</v-list-subheader>
                        <v-list-item v-for="(item, i) in items.slice(3, 6)" :key="i" :value="item" active-color="#F80808"
                            variant="plain">
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-btn block class="font-weight-bold bg-red-darken-3">ELIMINAR CUENTA</v-btn>
                        </v-list-item>
                    </v-list>
                </v-col>
            </div>
            <v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showNickname">
                <v-col cols="12" md="8" xl="6" class="pa-0">
                    <v-sheet :height="450" max-width="900"
                        class="mb-16 d-flex justify-center align-center d-none" rounded>
                        <div style="text-align: center; width: 400px;">
                            <h2 class="text-center text-white font-weight-bold mb-10">Cambiar nombre de usuario</h2>
                            <p class="text-center text-subtitle-2 mb-10 text-grey">Selecciona un nuevo nombre de usuario</p>
                            <div class="text-start mb-4">
                                <p class="text-subtitle-2 text-grey">Nombre de usuario actual</p>
                                <p>{{ nickname }}</p>
                            </div>
                            <slot name="username"></slot>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showEmail">
                <v-col cols="12" md="8" xl="6" xs="3" sm="3" class="pa-0">
                    <v-sheet :height="450" max-width="900"
                        class="mb-16 d-flex justify-center align-center d-none" rounded>
                        <div style="text-align: center; width: 400px;">
                            <h2 class="text-center text-white font-weight-bold mb-10">Cambiar correo de la cuenta</h2>
                            <p class="text-center text-subtitle-2 mb-10 text-grey">Selecciona un nuevo correo para acceder a tu cuenta</p>
                            <div class="text-start mb-4">
                                <p class="text-subtitle-2 text-grey">Correo actual</p>
                                <p>{{ email }}</p>
                            </div>
                            <slot name="email"></slot>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center align-center" style="height: 60vh" v-if="showPassword">
                <v-col cols="12" md="8" xl="6" class="pa-0">
                    <v-sheet :height="480" max-width="900"
                        class="mb-16 d-flex justify-center align-center d-none" rounded>
                        <div style="text-align: center; width: 400px;">
                            <h2 class="text-center text-white font-weight-bold mb-10">Cambiar contraseña de la cuenta</h2>
                            <p class="text-center text-subtitle-2 mb-10 text-grey">Escoge una contraseña robusta para mantener la seguridad de tu cuenta</p>
                            <slot name="password"></slot>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
const fullName = ref('Juan Pérez');

const showNickname = ref(false);
const showEmail = ref(false);
const showPassword = ref(false);

import { userData } from "../stores/userData";
const getData = userData();
const nickname = ref()
const email = ref()

onBeforeMount(async () => {
    await getData.getData()
    nickname.value = getData.getNickname
    email.value = getData.getEmail
    console.log(nickname.value);
    console.log(email.value);
})

const isValidEmailRule = (val) => {
    const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || "El email no es válido";
};

const items = reactive([
    { text: 'Modificar nombre de usuario', action: 'username' },
    { text: 'Modificar email', action: 'email' },
    { text: 'Modificar contraseña', action: 'password' },
    { text: 'Saldo' },
    { text: 'Historial de compras' },
    { text: 'Exportar datos' },
]);

const handleItemClick = (item) => {
    if (item.action === 'username') {
        showNickname.value = true;
        showEmail.value = false;
        showPassword.value = false;

    } else if (item.action === 'email') {
        showNickname.value = false;
        showEmail.value = true;
        showPassword.value = false;

    } else if (item.action === 'password') {
        showNickname.value = false;
        showEmail.value = false;
        showPassword.value = true;
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
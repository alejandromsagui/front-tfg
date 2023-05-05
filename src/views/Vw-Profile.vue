<template>
    <CProfile>
        <template #username>
            <v-form>
                <v-text-field label="Nuevo nombre de usuario" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;"
                    :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"></v-text-field>
                <v-text-field label="Contraseña actual" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" type="password"
                    :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"></v-text-field>
                <div style="width: 300px; margin-top: 20px; margin-left: auto; margin-right: auto;">
                    <v-btn block class="text-white text-center font-weight-bold bg-red-darken-3">CAMBIAR
                        NOMBRE DE USUARIO</v-btn>
                </div>
            </v-form>
        </template>
        <template #email>
            <v-form>
                <v-text-field label="Nuevo email" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio',
                        isValidEmailRule]"></v-text-field>
                <v-text-field label="Contraseña actual" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" type="password"
                    :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"></v-text-field>
                <div style="width: 300px; margin-top: 20px; margin-left: auto; margin-right: auto;">
                    <v-btn block class="text-white text-center font-weight-bold bg-red-darken-3">CAMBIAR
                        EMAIL</v-btn>
                </div>
            </v-form>
        </template>
        <template #password>
            <v-form>
                <v-text-field label="Contraseña actual" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" type="password"
                    :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"></v-text-field>
                <v-text-field label="Nueva contraseña" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" type="password" :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio',
                    (val) => (val && val.length > 5 || 'La contraseña debe ser superior a 5 caracteres')
                    ]"></v-text-field>
                <v-text-field label="Repite la nueva contraseña" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" type="password" :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio',
                    (val) => (val && val.length > 5 || 'La contraseña debe ser superior a 5 caracteres')
                    ]"></v-text-field>
                <div style="width: 300px; margin-top: 20px; margin-left: auto; margin-right: auto;">
                    <v-btn block class="text-white text-center font-weight-bold bg-red-darken-3">CAMBIAR
                        CONTRASEÑA</v-btn>
                </div>
            </v-form>
        </template>
    </CProfile>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { CProfile } from "../components"



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
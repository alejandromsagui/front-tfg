<template>
    <CProfile>
        <template #username>
            <v-form ref="form" @submit.prevent="changeNickname">
                <v-text-field label="Nuevo nombre de usuario" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" :rules="[requiredField]" v-model="userModifier.nickname"
                    @blur="onChange"></v-text-field>
                <v-text-field label="Contraseña actual" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" type="password" :rules="[requiredField, passwordLength]"
                    v-model="userModifier.password"></v-text-field>
                <div style="width: 300px; margin-top: 20px; margin-left: auto; margin-right: auto;">
                    <v-btn block class="text-white text-center font-weight-bold bg-red-darken-3" type="submit"
                        variant="outlined">CAMBIAR
                        NOMBRE DE USUARIO</v-btn>
                </div>
            </v-form>
        </template>
        <template #email>
            <v-form ref="form" @submit.prevent="changeEmail">
                <v-text-field label="Nuevo email" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" :rules="[requiredField, isValidEmailRule]"
                    v-model="userModifier.email"></v-text-field>
                <v-text-field label="Contraseña actual" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" type="password" :rules="[requiredField, passwordLength]"
                    v-model="userModifier.password"></v-text-field>
                <div style="width: 300px; margin-top: 20px; margin-left: auto; margin-right: auto;">
                    <v-btn block class="text-white text-center font-weight-bold bg-red-darken-3" type="submit"
                        variant="outlined">CAMBIAR
                        EMAIL</v-btn>
                </div>
            </v-form>
        </template>
        <template #password>
            <v-form ref="form" @submit.prevent="changePassword">
                <v-text-field label="Contraseña actual" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" type="password" :rules="[requiredField, passwordLength]"
                    v-model="userModifier.oldPassword"></v-text-field>
                <v-text-field label="Nueva contraseña" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" type="password" :rules="[requiredField, passwordLength, passwordMatch]"
                    v-model="userModifier.newPassword"></v-text-field>
                <v-text-field label="Repite la nueva contraseña" variant="outlined" class="align-items-center mx-auto"
                    style="width: 400px;" type="password" :rules="[requiredField, passwordLength, passwordMatch]"
                    v-model="userModifier.confirmPassword"></v-text-field>
                <div style="width: 300px; margin-top: 20px; margin-left: auto; margin-right: auto;">
                    <v-btn variant="outlined" class="text-white text-center font-weight-bold bg-red-darken-3" type="submit"
                        block>CAMBIAR
                        CONTRASEÑA</v-btn>
                </div>
            </v-form>
        </template>
    </CProfile>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { CProfile } from "../components"
import { userData } from '../stores/userData';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const useModifierStore = userData()
const form = ref(null);
const userModifier = reactive({
    nickname: '',
    email: '',
    password: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const onChange = (e) => {
    console.log(e.target.value)
}
const requiredField = (value) => !!value || "Este campo es obligatorio";

const passwordLength = (value) =>
    value && value.length >= 6 || "La contraseña debe ser superior a 5 caracteres";

const passwordMatch = (value) =>
    value === userModifier.newPassword || "Las contraseñas no coinciden"

const isValidEmailRule = (val) => {
    const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || "El email no es válido";
};

const changeNickname = () => {
    useModifierStore.changeNickname(userModifier.nickname, userModifier.password).then(r => {
        if (r.status === 200) form.value.reset()
    })
}

const changeEmail = () => {
    useModifierStore.changeEmail(userModifier.email, userModifier.password).then(r => {
        if (r.status === 200) {
            toast.success(r.data.message, {
                theme: "colored",
                autoClose: 3000
            })
            form.value.reset()
        }
    }).catch((e) => {
        toast.error(e.message, {
            theme: "colored",
            autoClose: 3000
        })
    })
}

const changePassword =  () => {
    if(userModifier.newPassword === userModifier.confirmPassword){
        useModifierStore.changePassword(userModifier.oldPassword, userModifier.confirmPassword).then(r => {
            if(r.status === 200){
                toast.success(r.data.message, {
                    theme: "colored",
                    autoClose: 3000
                })

                form.value.reset()
            }
        }).catch((e) => {
            toast.error(e.message, {
                theme: "colored",
                autoClose: 3000
            })
        })
    }else {
        toast.error('Las contraseñas no coinciden', {
                theme: "colored",
                autoClose: 3000
            })
    }

}

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
}</style>
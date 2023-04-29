<template>
    <div class="background"></div>
    <div class="dark-layer"></div>
    <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-row>
                    <v-col cols="12" md="8" sm="12" xs="12" class="text-center mx-auto" style="z-index: 1;">
                        <h3 class="text-white mb-10">
                            Introduce el código que has recibido por <span style="color: #F80808;">correo electrónico</span>
                        </h3>
                        <v-form>
                            <v-text-field label="Código" name="codigo" prepend-icon="fa-sharp fa-solid fa-keyboard"
                                type="text" class="user-data text-center text-white mr-3" placeholder="Ejemplo: 48B536"/>
                                <v-btn rounded color="#F80808" dark class="button mb-6 mt-2" @click="authUser()">Enviar</v-btn>
                        </v-form>
                        <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" @click="transition = 3"
                                class="password-recovery">¿No has recibido el código? Pulsa aquí</v-btn></h3>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed, reactive } from "vue"
import { useLoginStore } from '../stores/login'
import { useRegister } from "../stores/register";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { storeToRefs } from "pinia";

const authStore = useLoginStore();
const registerStore = useRegister();
const { nicknameExists } = storeToRefs(registerStore)


const transition = ref(1)
const form = ref(null);
const isEmail = ref(false)

const userLogin = reactive({
    nickname: '',
    email: '',
    password: ''
})

const isMobile = computed(() => window.innerWidth <= 960)

const isValidEmailRule = (val) => {
    const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || "El email no es válido";
};

const isValidEmail = (val) => {
    const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val);
};


const authUser = async () => {

    const usuarioField = document.querySelector('.user-data input[type="text"]');
    const usuarioValue = usuarioField.value;

    console.log(usuarioValue);
    if (isValidEmail(usuarioValue)) {
        isEmail.value = true
        await authStore.loginEmail(usuarioValue, userLogin.password)
    } else {
        isEmail.value = false
        console.log('No es email');
        await authStore.loginUser(usuarioValue, userLogin.password)
        console.log('No es email nickname: ' + userLogin.nickname);
        console.log('Passwd no es email:' + userLogin.password);
    }

}

// const sendEmailUser =  () => {
//     const usuarioField = document.querySelector('.user-data input[type="text"]');
//     const usuarioValue = usuarioField.value;

//     if(isValidEmail(usuarioValue)){
//         isEmail.value = true
//         sendEmail.sendMailByEmail(userLogin.email);
//     }else{
//         isEmail.value = false;
//         sendEmail.sendMailByUser(userLogin.nickname);
//     }
// }


const registerUser = async () => {

    let formIsValid = await form.value.validate();

    if (formIsValid.valid) {

        const userExists = await registerStore.getNickname(userLogin.nickname);
        const emailExists = await registerStore.getEmail(userLogin.email);

        console.log('Codigo de estado usuario: ' + userExists);
        console.log('Codigo de estado email:' + emailExists);
        if (userExists === 200) {
            toast.error('Ese nombre de usuario ya existe', {
                autoClose: 2000,
                theme: 'colored'
            });
        }

        if (emailExists === 200) {
            toast.error('Ese email ya existe', {
                autoClose: 2000,
                theme: 'colored'
            });
        }

        if (userExists === 404 && emailExists === 404) {
            await registerStore.signIn(userLogin.nickname, userLogin.email, userLogin.password)
            transition.value = 1;
            form.value.reset();
        }
    }
}


</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
    font-family: "Roboto", sans-serif;
}

.background {
    background-image: url(../assets/images/horizon-recover.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
    background-position: center center;
}

.dark-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
}

.button {
    color: #fff;
    font-weight: bold;
}

.button:hover {
    background-color: #fff !important;
    color: #F80808;
    font-weight: bold;
}

.password-recovery {
    color: #fff;
    font-weight: bold;
}

.password-recovery:hover {
    color: #F80808;
}

.background-mobile {
    background-image: url(../assets/images/god-of-war.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
}

.background-register {
    background-image: url(../assets/images/spiderman-register.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
}

.background-register-mobile {
    background-image: url(../assets/images/god-of-war2.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
}

.background-recovery {
    background-image: url(../assets/images/horizon.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
}
</style>
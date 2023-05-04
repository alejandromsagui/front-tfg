<template>
    <div class="background" v-if="!isMobile"></div>
    <div class="background-mobile" v-else></div>
    <div class="background-register" v-if="transition == 2 && !isMobile"></div>
    <div class="background-register-mobile" v-if="transition == 2 && isMobile"></div>
    <div class="background-recovery" v-if="transition == 3"></div>
    <div class="dark-layer"></div>
    <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-window v-model="transition">
                    <v-window-item :value="1">
                        <v-row v-if="!isMobile">
                            <v-col cols="12" md="8" sm="12" xs="12" class="text-center mx-auto">
                                <h2 class="text-white mb-15">
                                    Inicia sesión en Namekians<span style="color:#F80808;">Games</span>
                                </h2>
                                <v-form>
                                    <v-text-field label="Email o nombre de usuario" name="usuario"
                                        prepend-icon="fa-solid fa-user" type="text"
                                        class="user-data text-center text-white mr-3" />
                                    <v-text-field id="contraseña" label="Contraseña" name="Contraseña"
                                        prepend-icon="fa-solid fa-key" type="password" class="text-center text-white mr-3"
                                        v-model="userLogin.password" />
                                </v-form>
                                <div class="text-center mt-3">
                                    <v-btn rounded color="#F80808" dark class="button mb-6 mt-2" @click="authUser()">Iniciar
                                        sesión</v-btn>
                                </div>
                                <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" @click="transition = 3"
                                        class="password-recovery">¿Has olvidado tu contraseña?</v-btn></h3>
                                <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" class="password-recovery"
                                        @click="transition++">Registrate aquí</v-btn></h3>
                            </v-col>
                        </v-row>

                        <v-row v-else justify="center" align="center">
                            <v-col cols="12" md="8" class="text-center mx-auto">
                                <h2 class="text-center text-white mb-15">
                                    Inicia sesión en Namekians<span style="color:red;">Games</span>
                                </h2>
                                <v-form class="mx-auto">
                                    <v-text-field label="Email o nombre de usuario" name="usuario"
                                        prepend-icon="fa-solid fa-user" type="text"
                                        class="user-data text-center text-white mr-3" v-model="userLogin.email"
                                        v-if="!isEmail" />
                                    <v-text-field label="Email o nombre de usuario" name="usuario"
                                        prepend-icon="fa-solid fa-user" type="text"
                                        class="user-data text-center text-white mr-3" v-else v-model="userLogin.email" />
                                    <v-text-field id="contraseña" label="Contraseña" name="Contraseña"
                                        prepend-icon="fa-solid fa-key" class="text-center text-white mr-3" type="password"
                                        v-model="userLogin.password" />

                                    <div class="text-center mt-3">
                                        <v-btn rounded color="#F80808" dark class="button mb-6" @click="authUser()">Iniciar
                                            sesión</v-btn>
                                    </div>
                                    <h3 class="text-center mt-3 text-white"><v-btn variant="plain" @click="transition = 3"
                                            class="password-recovery">¿Has olvidado tu contraseña?</v-btn></h3>
                                    <h3 class="text-center mt-3 text-white"><v-btn variant="plain" class="password-recovery"
                                            @click="transition++">Registrate aquí</v-btn></h3>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-window-item>
                    <v-window-item :value="2">
                        <v-row v-if="!isMobile">
                            <v-col cols="12" md="8" class="text-center mx-auto">
                                <h2 class="text-white mb-15 text-center">Crea una nueva <span
                                        style="color: #F80808;">cuenta</span></h2>
                                <div>
                                    <v-form ref="form" @submit.prevent="registerUser">
                                        <v-text-field label="Usuario" prepend-icon="fa-solid fa-user" type="text"
                                            class="text-white" v-model="userLogin.nickname"
                                            :rules="[(val) => (val && val.length > 0 || 'Este campo es obligatorio')]" />

                                        <v-text-field label="Email" prepend-icon="fa-solid fa-envelope" type="text"
                                            class="text-white" v-model="userLogin.email" :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio',
                                                    isValidEmailRule]" />
                                        <v-text-field label="Contraseña" prepend-icon="fa-solid fa-key" type="password"
                                            class="text-white" v-model="userLogin.password" :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio',
                                                (val) => (val && val.length > 5 || 'La contraseña debe ser superior a 5 caracteres')
                                                ]" />
                                        <div class="text-center mt-3">
                                            <v-btn rounded color="#F80808" dark class="button mb-6 mt-2"
                                                type="submit">Registro</v-btn>
                                        </div>
                                        <h3 class=" text-center mt-3 text-white"><v-btn variant="plain"
                                                class="password-recovery" @click="transition--">Inicia sesión aquí</v-btn>
                                        </h3>
                                    </v-form>

                                </div>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col cols="12" md="8" class="text-center mx-auto">
                                <h2 class="text-white mb-15 text-center">Crea una nueva <span
                                        style="color: #F80808;">cuenta</span></h2>
                                <div>
                                    <v-form ref="form" @submit.prevent="registerUser">
                                        <v-text-field label="Usuario" prepend-icon="fa-solid fa-user" type="text"
                                            class="text-white" v-model="userLogin.nickname"
                                            :rules="[(val) => (val && val.length > 0 || 'Este campo es obligatorio')]" />

                                        <v-text-field label="Email" prepend-icon="fa-solid fa-envelope" type="text"
                                            class="text-white" v-model="userLogin.email" :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio',
                                                    isValidEmailRule]" />
                                        <v-text-field label="Contraseña" prepend-icon="fa-solid fa-key" type="password"
                                            class="text-white" v-model="userLogin.password" :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio',
                                                (val) => (val && val.length > 5 || 'La contraseña debe ser superior a 5 caracteres')
                                                ]" />

                                        <div class="text-center mt-3">
                                            <v-btn rounded color="#F80808" dark class="button mb-6 mt-2"
                                                type="submit">Registro</v-btn>
                                        </div>
                                        <h3 class=" text-center mt-3 text-white"><v-btn variant="plain"
                                                class="password-recovery" @click="transition--">Inicia sesión aquí</v-btn>
                                        </h3>
                                    </v-form>

                                </div>
                            </v-col>
                        </v-row>
                    </v-window-item>
                    <v-window-item :value="3">
                        <v-row>
                            <v-col cols="12" md="8" sm="12" xs="12" class="text-center mx-auto">
                                <h2 class="text-white mb-15">
                                    Proporciona un <span style="color:red; font-weight: bold;">email</span> o un <span
                                        style="color:red;font-weight: bold;">usuario</span>
                                    y te enviaremos un correo electrónico de recuperación
                                </h2>
                                <v-form>
                                    <v-text-field label="Email o nombre de usuario" name="user-data"
                                        prepend-icon="fa-solid fa-user" type="text"
                                        class="data-user text-center text-white mr-3"
                                        :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']" />
                                </v-form>
                                <div class="text-center mt-3">
                                    <v-btn rounded color="#F80808" dark class="button mb-6 mt-2"
                                        @click="sendEmailUser()">Enviar
                                    </v-btn>
                                </div>

                                <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" @click="transition = 1"
                                        class="password-recovery">Inicia sesión aquí</v-btn></h3>
                                <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" class="password-recovery"
                                        @click="transition = 2">Registrate aquí</v-btn></h3>
                            </v-col>

                        </v-row>
                    </v-window-item>
                </v-window>
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
import { useEmailStore } from "../stores/sendEmail";

const authStore = useLoginStore();
const registerStore = useRegister();
const emailStore = useEmailStore();
const { code } = storeToRefs(useEmailStore);
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
        console.log('Es email');
        isEmail.value = true
        await authStore.loginEmail(usuarioValue, userLogin.password)
    } else {
        console.log('No es email');
        isEmail.value = false
        console.log('No es email');
        await authStore.loginUser(usuarioValue, userLogin.password)
        console.log('No es email nickname: ' + userLogin.nickname);
        console.log('Passwd no es email:' + userLogin.password);
    }

}

const sendEmailUser = async () => {
    const usuarioField = document.querySelector('.data-user input[type="text"]');
    const usuarioValue = usuarioField.value;

    console.log(isValidEmail(usuarioValue))

    if (isValidEmail(usuarioValue)) {
        console.log('Es email');
        isEmail.value = true
        await emailStore.sendMailByEmail(usuarioValue)
    } else {
        console.log('No es email');
        isEmail.value = false
        await emailStore.sendMailByUser(usuarioValue)

    }
}


const registerUser = async () => {

    let formIsValid = await form.value.validate();

    if (formIsValid.valid) {

        const userExists = await registerStore.getNickname(userLogin.nickname);
        console.log('Nickname existe?: ' + userLogin.nickname);
        const emailExists = await registerStore.getEmail(userLogin.email);
        console.log('Nickname existe?: ' + userLogin.email);

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
    background-image: url(../assets/images/spiderman.jpg);
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
    background-position: center center;
}

.background-register {
    background-image: url(../assets/images/spiderman-register.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
    background-position: center center;
}

.background-register-mobile {
    background-image: url(../assets/images/god-of-war2.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
    background-position: center center;
}

.background-recovery {
    background-image: url(../assets/images/horizon.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
    background-position: center center;
}
</style>
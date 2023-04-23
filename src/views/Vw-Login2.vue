<template>
    <div class="background" v-if="!isMobile"></div>
    <div class="background-mobile" v-else></div>
    <div class="background-register" v-if="transition == 2 && !isMobile"></div>
    <div class="background-register-mobile" v-if="transition == 2 && isMobile"></div>
    <div class="dark-layer"></div>
    <v-container fluid class="fill-height">
        <v-row align="start" justify="start">
            <v-col cols="12" sm="8" md="6">
                <v-window v-model="transition">
                    <v-window-item :value="1">
                        <v-row v-if="!isMobile">
                            <v-col cols="12" md="8" sm="12" xs="12" class="text-center ml-6">
                                <h2 class="text-white mb-15">
                                    Inicia sesión en Namekians<span style="color:#F80808;">Games</span>
                                </h2>
                                <v-form>
                                    <v-text-field label="Usuario" name="usuario" prepend-icon="fa-solid fa-user" type="text"
                                        class="text-center text-white mr-3" v-model="userLogin.nickname"/>
                                    <v-text-field id="contraseña" label="Contraseña" name="Contraseña"
                                        prepend-icon="fa-solid fa-key" type="password"
                                        class="text-center text-white mr-3" v-model="userLogin.password"/>
                                </v-form>
                                <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" href="/"
                                        class="password-recovery">¿Has olvidado tu contraseña?</v-btn></h3>
                                <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" class="password-recovery"
                                        @click="transition++">Registrate aquí</v-btn></h3>
                                <div class="text-center mt-3">
                                    <v-btn rounded color="#F80808" dark class="button mb-6 mt-2" @click="sendData()">Iniciar sesión</v-btn>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row v-else justify="center" align="center">
                            <v-col cols="12" md="8" class="text-center mx-auto">
                                <h2 class="text-center text-white mb-15">
                                    Inicia sesión en Namekians<span style="color:red;">Games</span>
                                </h2>
                                <v-form class="mx-auto">
                                    <v-text-field label="Usuario" name="usuario" prepend-icon="fa-solid fa-user" type="text"
                                        class="text-center text-white mr-3" v-model="userLogin.nickname"/>
                                    <v-text-field id="contraseña" label="Contraseña" name="Contraseña"
                                        prepend-icon="fa-solid fa-key" class="text-center text-white mr-3" type="password" v-model="userLogin.password"/>
                                </v-form>
                                <h3 class="text-center mt-3 text-white"><v-btn variant="plain" href="/"
                                        class="password-recovery">¿Has olvidado tu contraseña?</v-btn></h3>
                                <h3 class="text-center mt-3 text-white"><v-btn variant="plain" class="password-recovery"
                                        @click="transition++">Registrate aquí</v-btn></h3>
                                <div class="text-center mt-3">
                                    <v-btn rounded color="#F80808" dark class="button mb-6" @click="sendData()">Iniciar sesión</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-window-item>
                    <v-window-item :value="2">
                        <v-row v-if="!isMobile">
                            <v-col cols="12" md="8" class="ml-6">
                                    <h2 class="text-white mb-15 text-center">Crea una nueva <span style="color: #F80808;">cuenta</span></h2>
                                    <v-form>
                                        <v-text-field label="Usuario" name="Usuario" prepend-icon="fa-solid fa-user"
                                            type="text" class="text-white"/>
                                        <v-text-field label="Email" name="email" prepend-icon="fa-solid fa-envelope"
                                            type="text" class="text-white"/>
                                        <v-text-field label="Contraseña" name="contraseña" prepend-icon="fa-solid fa-key"
                                            type="password" class="text-white"/>
                                    </v-form>
                                    <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" class="password-recovery"
                                        @click="transition--">Inicia sesión aquí</v-btn></h3>
                                <div class="text-center mt-3">
                                    <v-btn rounded color="#F80808" dark class="button mb-6 mt-2">Registro</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col cols="12" md="8">
                                    <h2 class="text-white mb-15 text-center">Crea una nueva <span style="color: #F80808;">cuenta</span></h2>
                                    <v-form>
                                        <v-text-field label="Usuario" name="Usuario" prepend-icon="fa-solid fa-user"
                                            type="text" class="text-white"/>
                                        <v-text-field label="Email" name="email" prepend-icon="fa-solid fa-envelope"
                                            type="text" class="text-white"/>
                                        <v-text-field label="Contraseña" name="contraseña" prepend-icon="fa-solid fa-key"
                                            type="password" class="text-white"/>
                                    </v-form>
                                    <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" class="password-recovery"
                                        @click="transition--">Inicia sesión aquí</v-btn></h3>
                                <div class="text-center mt-3">
                                    <v-btn rounded color="#F80808" dark class="button mb-6 mt-2">Registro</v-btn>
                                </div>
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

const authStore = useLoginStore();
const transition = ref(1)

const isMobile = computed(() => window.innerWidth <= 960)

const userLogin = reactive({
  nickname: '',
  password: ''
})

const sendData = async () => {
  await authStore.login(userLogin.nickname, userLogin.password);
};


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
.background-mobile{
    background-image: url(../assets/images/god-of-war.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
}
.background-register{
    background-image: url(../assets/images/spiderman-register.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
}

.background-register-mobile{
    background-image: url(../assets/images/god-of-war2.jpg);
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    background-size: cover;
}

</style>
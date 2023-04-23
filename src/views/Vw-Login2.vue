<template>
    <div class="background"></div>
        <div class="dark-layer"></div>
    <v-container fluid class="fill-height">
        <v-row align="start" justify="start">
            <v-col cols="12" sm="8" md="6">
                    <v-window v-model="transition">
                        <v-window-item :value="1">
                            <v-row v-if="!isMobile">
                                <v-col cols="12" md="8" sm="12" xs="12" class="text-center">
                                        <h2 class="text-white mb-15">
                                            Inicia sesión en Namekians<span style="color:#F80808;">Games</span>
                                        </h2>
                                        <v-form>
                                            <v-text-field label="Usuario" name="usuario" prepend-icon="fa-solid fa-user"
                                                type="text" class="text-center text-white mr-3"/>
                                            <v-text-field id="contraseña" label="Contraseña" name="Contraseña"
                                                prepend-icon="fa-solid fa-key" type="password" class="text-center text-white mr-3"/>
                                        </v-form>
                                        <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" href="/" class="password-recovery">¿Has olvidado tu contraseña?</v-btn></h3>
                                        <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" class="password-recovery" @click="transition++">Registrate aquí</v-btn></h3>
                                    <div class="text-center mt-3">
                                        <v-btn rounded color="#F80808" dark class="button mb-6 mt-2">Iniciar sesión</v-btn>
                                    </div>
                                </v-col>
                            </v-row> 
                          
                            <v-row v-else justify="center" align="center">
                                <v-col cols="12" md="8" class="text-center mx-auto">
                                        <h2 class="text-center text-white mb-15">
                                            Inicia sesión en Namekians<span style="color:red;">Games</span>
                                        </h2>
                                        <v-form class="mx-auto">
                                            <v-text-field label="Usuario" name="usuario" prepend-icon="fa-solid fa-user"
                                                type="text" class="text-center text-white mr-3"/>
                                            <v-text-field id="contraseña" label="Contraseña" name="Contraseña"
                                                prepend-icon="fa-solid fa-key" class="text-center text-white mr-3"/>
                                        </v-form>
                                        <h3 class="text-center mt-3 text-white"><v-btn variant="plain" href="/" class="password-recovery">¿Has olvidado tu contraseña?</v-btn></h3>
                                        <h3 class="text-center mt-3 text-white"><v-btn variant="plain" class="password-recovery" @click="transition++">Registrate aquí</v-btn></h3>
                                    <div class="text-center mt-3">
                                        <v-btn rounded color="#F80808" dark class="button mb-6">Iniciar sesión</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-window-item>
                        <v-window-item :value="2">
                            <v-row class="fill-height">
                                <v-col cols="12" md="4" class="bg-teal accent-3">
                                    <v-card-text class="white--text mt-12">
                                        <h1 class="text-center display-1">Bienvenido de nuevo!</h1>
                                        <h5 class="text-center">Logueate!</h5>
                                    </v-card-text>
                                    <div class="text-center">
                                        <v-btn rounded variant="outlined" dark @click="transition--">INICIAR SESIÓN</v-btn>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="8">
                                    <v-card-text class="mt-12">
                                        <h1 class="text--center display-2 teal--text text--accent-3">Crear una nueva cuenta
                                        </h1>
                                        <div class="text-center mt-4">
                                            <v-btn class="mx-2" fab color="black" variant="outlined" rounded>
                                                <v-icon icon="fab fa-facebook-f"></v-icon>
                                            </v-btn>
                                            <v-btn class="mx-2" fab color="black" variant="outlined" rounded>
                                                <v-icon icon="fab fa-google-plus-g"></v-icon>
                                            </v-btn>
                                            <v-btn class="mx-2" fab color="black" variant="outlined" rounded>
                                                <v-icon icon="fab fa-linkedin-in"></v-icon>
                                            </v-btn>
                                        </div>
                                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                                        <v-form>
                                            <v-text-field label="Usuario" name="Usuario" prepend-icon="fa-solid fa-user"
                                                type="text" color="teal accent-3" />
                                            <v-text-field label="Email" name="email" prepend-icon="fa-solid fa-envelope"
                                                type="text" color="teal accent-3" />
                                            <v-text-field label="Contraseña" name="contraseña"
                                                prepend-icon="fa-solid fa-key" type="password" color="teal accent-3" />
                                        </v-form>
                                    </v-card-text>
                                    <div class="text-center mt-n5">
                                        <v-btn rounded color="teal accent-3" dark>Registro</v-btn>
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
import { ref, computed } from "vue"

const transition = ref(1)

const isMobile = computed(() => window.innerWidth <= 960)

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
    font-family: "Roboto", sans-serif;
}

.background{
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
.button{
    color: #fff;
    font-weight: bold;
}
.button:hover{
    background-color: #fff !important;
    color: #F80808;
    font-weight: bold;
}
.password-recovery{
    color: #fff;
    font-weight: bold;
}
.password-recovery:hover{
    color: #F80808;
}
</style>
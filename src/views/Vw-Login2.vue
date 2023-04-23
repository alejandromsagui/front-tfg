<template>
    <div class="background">
        <div class="dark-layer"></div>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card elevation="12">
                    <v-window v-model="transition">
                        <v-window-item :value="1">
                            <v-row v-if="!isMobile">
                                <v-col cols="12" md="4" class="bg-red-darken-1">
                                    <v-card-text class="white--text mt-12">
                                        <h1 class="text-center">Hola, gamers</h1>
                                        <h4 class="text-center mt-5">¿Te atreves a unirte a nuestra comunidad?
                                        </h4>
                                    </v-card-text>
                                    <div class="text-center mx-4">
                                        <v-btn rounded variant="outlined"  @click="transition++" class="button mt-16">Registro</v-btn>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="8" class="text-center">
                                    <v-card-text class="mt-12" align="center" justify="center">
                                        <h2 class="text-center mb-15">
                                            Inicia sesión en Namekians<span style="color:#F80808;">Games</span>
                                        </h2>
                                        <v-form>
                                            <v-text-field label="Usuario" name="usuario" prepend-icon="fa-solid fa-user"
                                                type="text" class="text-center mr-3"/>
                                            <v-text-field id="contraseña" label="Contraseña" name="Contraseña"
                                                prepend-icon="fa-solid fa-key" type="password" class="text-center mr-3"/>
                                        </v-form>
                                        <h3 class="password-recovery text-center mt-3"><v-btn variant="plain" href="/">¿Has olvidado tu contraseña?</v-btn></h3>
                                    </v-card-text>
                                    <div class="text-center mt-3">
                                        <v-btn rounded color="#F80808" dark class="button mb-6">Iniciar sesión</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row v-else>
                                <v-col cols="12" md="8" class="text-center">
                                    <v-card-text class="mt-12" align="center" justify="center">
                                        <h2 class="text-center mb-15">
                                            Inicia sesión en Namekians<span style="color:red;">Games</span>
                                        </h2>
                                        <v-form>
                                            <v-text-field label="Usuario" name="usuario" prepend-icon="fa-solid fa-user"
                                                type="text" class="text-center mr-3" />
                                            <v-text-field id="contraseña" label="Contraseña" name="Contraseña"
                                                prepend-icon="fa-solid fa-key" class="text-center mr-3"/>
                                        </v-form>
                                        <h3 class="text-center mt-3">¿Has olvidado tu contraseña?</h3>
                                        <h4 class="text-center mt-3">También puedes registrarte <span @click="transition++" style="color: #0074D9;">aquí</span></h4>
                                    </v-card-text>
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
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</div>
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
  background-color: rgba(0, 0, 0, 0.5);
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
    color: black;
}
.password-recovery:hover{
    color: red;
}
</style>
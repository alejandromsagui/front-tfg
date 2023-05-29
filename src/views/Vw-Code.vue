<template>
    <div class="background"></div>
    <div class="dark-layer"></div>
    <div v-if="emailStore.loading" class="d-flex justify-center align-center"
      style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
      <half-circle-spinner :animation-duration="1000" :size="60" color="#D50000">
      </half-circle-spinner>
    </div>
    <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-window v-model="transition">
                    <v-window-item :value="1">
                        <v-row>
                            <v-col cols="12" md="8" sm="12" xs="12" class="text-center mx-auto" style="z-index: 1;">
                                <h3 class="text-white mb-10">
                                    Introduce el código que has recibido por <span style="color: #F80808;">correo
                                        electrónico</span>
                                </h3>
                                <v-form @submit.prevent="confirmCode" ref="form">
                                    <v-text-field label="Código" name="codigo" prepend-icon="fa-sharp fa-solid fa-keyboard"
                                        type="text" class="user-data text-center text-white mr-3"
                                        placeholder="Ejemplo: 48B536" v-model="userCode.code"
                                        :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']" />
                                    <v-btn rounded color="#F80808" dark class="button mb-6 mt-2"
                                        type="submit">Enviar</v-btn>
                                </v-form>
                                <h3 class=" text-center mt-3 text-white"><v-btn variant="plain" @click="transition = 3"
                                        class="password-recovery">¿No has recibido el código? Pulsa aquí</v-btn></h3>
                            </v-col>
                        </v-row>
                    </v-window-item>
                    <v-window-item :value="2" v-if="isCorrect">
                        <v-row>
                            <v-col cols="12" md="8" sm="12" xs="12" class="text-center mx-auto" style="z-index: 1;">
                                <h3 class="text-white mb-10">
                                    Configura una <span style="color: #F80808;">contraseña robusta</span> para mantener la
                                    seguridad de tu cuenta
                                </h3>
                                <v-form ref="form" @submit.prevent="changePassword">
                                    <v-text-field label="Nueva contraseña" type="password" class="text-white mr-3" :rules="[
                                        (val) => (val && val.length > 0) || 'Este campo es obligatorio',
                                        (val) => (val && val.length > 5) || 'La contraseña debe tener al menos 6 caracteres'
                                    ]" v-model="userData.newPassword"></v-text-field>

                                    <v-text-field label="Repite la contraseña" type="password" class="text-white mr-3"
                                        :rules="[
                                            (val) => (val && val.length > 0) || 'Este campo es obligatorio',
                                            (val) => (val && val.length > 5) || 'La contraseña debe tener al menos 6 caracteres'
                                        ]" v-model="userData.confirmPassword"></v-text-field>

                                    <v-btn rounded color="#F80808" dark class="button mb-6 mt-2"
                                        type="submit">Continuar</v-btn>
                                </v-form>


                            </v-col>
                        </v-row>
                    </v-window-item>
                </v-window>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { reactive, ref } from "vue"
import { toast } from 'vue3-toastify';
import { HalfCircleSpinner } from 'epic-spinners'
import 'vue3-toastify/dist/index.css';
import { useEmailStore } from "../stores/sendEmail";
import { router } from "../routes";
const emailStore = useEmailStore()


const userCode = reactive({ code: '' })
const userData = reactive({ newPassword: '', confirmPassword: '' })
const form = ref(null)
const transition = ref(1)
const isCorrect = ref(false)

const confirmCode = () => {
    let formIsValid = form.value.validate();

    if (formIsValid) {
        const nickname = emailStore.nickname;
        const email = emailStore.email;
        console.log('valor de user code code: ', userCode.code);

        emailStore
            .confirmCode(nickname, email, userCode.code)
            .then((response) => {
                if (response) {
                    toast.success(response, {
                        theme: "colored",
                        autoClose: 3000
                    });

                    isCorrect.value = true;
                    transition.value = 2
                }

            })
            .catch((error) => {
                toast.error(error.message, {
                    theme: "colored",
                    autoClose: 3000
                });
            });
    }
};



const changePassword = () => {
  let formIsValid = form.value.validate();
  const nickname = emailStore.nickname;
  const email = emailStore.email;
  const code = emailStore.code;

  if (formIsValid) {
    emailStore
      .changePassword(nickname, email, userData.newPassword, userData.confirmPassword, userCode.code)
      .then((response) => {

        console.log('Valor nickname: ', nickname);
        console.log('Valor newpasswd: ', userData.newPassword);
        console.log('Valor confirm: ', userData.confirmPassword);
        console.log('Valor code: ', userCode.code);


        if (response) {
          toast.success(response.message, {
            theme: "colored",
            autoClose: 3000
          });

          router.push({ path: '/acceso' })
        }
      })
      .catch((error) => {
     // Imprime el objeto de error completo en la consola
        toast.error(error || "Ha ocurrido un error");
      });
  }
};


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
</style>
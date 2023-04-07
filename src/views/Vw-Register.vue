<template>
  <v-container fluid class="background">
    <div class="background-image"></div>

    <div class="center">
      <v-sheet
        class="d-flex align-center justify-center text-center"
        color="transparent"
        rounded
        :width="900"
      >
        <div class="center2">
          <v-card width="900px" height="540">
            <v-row align-content="center">
              <v-col align-self="center" cols="8">
                <div class="image-container">
                  <div class="color-overlay">
                    <div id="center">
                      <v-card-text class="card-text"
                        >¿Te atreves a unirte a nuestra</v-card-text
                      >
                      <span id="space-word">comunidad</span
                      ><span class="card-text">?</span>
                    </div>
                  </div>

                  <v-img
                    src="../src/assets/images/register.jpg"
                    cover
                    height="100%"
                  ></v-img>
                </div>
                <v-alert
                  type="success"
                  style="margin-bottom: 350px;"
                  class="v-alert"
                  v-if="dataIsValid"
                  closable
                  text="¡Bienvenido/a a nuestra comunidad de gamers!"
                ></v-alert>
                <v-alert
                  type="error"
                  style="margin-bottom: 350px;"
                  class="v-alert"
                  v-if="dataIsNotValid"
                  closable
                  :text="test"
                ></v-alert>
              </v-col>

              <v-col align-self="center" class="my-10" cols="4">
                <div id="form">
                  <v-form ref="form" fast-fail>
                    <v-avatar
                      image="../src/assets/images/avatar.jpg"
                      size="80"
                      class="mb-12"
                    ></v-avatar>
                    <v-text-field
                      clearable
                      label="Usuario"
                      type="text"
                      prepend-icon="fa-solid fa-user"
                      variant="underlined"
                      class="input"
                      v-model="userForm.nickname"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Este campo es obligatorio',
                        (val) =>
                          (val && val.length > 4) ||
                          'El nombre de usuario debe ser superior a 4 caracteres',
                      ]"
                    ></v-text-field>
                    <v-text-field
                      clearable
                      label="Email"
                      type="email"
                      prepend-icon="fa-solid fa-envelope"
                      variant="underlined"
                      class="input"
                      v-model="userForm.email"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Este campo es obligatorio',
                        isValidEmail,
                      ]"
                    ></v-text-field>
                    <v-text-field
                      clearable
                      label="Contraseña"
                      type="password"
                      prepend-icon="fa-sharp fa-solid fa-key"
                      variant="underlined"
                      class="input"
                      v-model="userForm.password"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Este campo es obligatorio',
                        (val) =>
                          (val && val.length > 5) ||
                          'La contraseña debe ser superior a 5 caracteres',
                      ]"
                    ></v-text-field>
                    <v-file-input
                      clearable
                      label="Escoge tu avatar"
                      variant="underlined"
                      class="input"
                    ></v-file-input>

                    <v-btn
                      color="#F80808"
                      class="mt-5"
                      variant="elevated"
                      id="button"
                      type="button"
                      @click= "onSubmit()"
                      >Registro</v-btn
                    >
                  </v-form>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-sheet>
    </div>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

const form = ref(null);
const dataIsValid = ref(false);
const dataIsNotValid = ref(false);

const userForm = reactive({
  nickname: "",
  email: "",
  password: "",
  // avatar: "",
});


const onSubmit = async () => {

  let formIsValid = await form.value.validate();
  console.log('¿Datos válidos?: '+formIsValid);
  if (formIsValid.valid) {
    dataIsValid.value = true;

    try {

      console.log('Datos añadidos: '+userForm);
      await axios.post('http://localhost:3000/newUser', 
      userForm
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

      form.value.reset();
    } catch (error) {
      console.log(error);
      dataIsNotValid = true;
    }
  } else {
    console.log("Formulario no válido");
    dataIsNotValid.value = true;
    
  }
};

const isValidEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || "El email no es válido";
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
  font-family: "Roboto", sans-serif;
}

.center {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.input {
  width: 230px;
  padding: 3px;
  color: black !important;
}

.background {
  width: 100%;
  height: 100%;
  position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.background-image {
  background-image: url(../assets/images/test.png);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  filter: blur(4px);
  transform: scale(1.1);
}
#button {
  color: #fff;
  font-weight: bold;
}
#button:hover {
  background-color: #fff !important;
  color: #f80808;
  transition: 0.3s;
}
.image-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 67%;
  height: 100%;
}

.color-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.5);
  z-index: 1;
  opacity: 60%;
}
.card-text {
  color: #fff;
  font-weight: bold;
  font-size: 2em;
  font-display: initial;
}

#space-word {
  color: #fff;
  font-weight: bold;
  font-size: 2em;
  font-display: initial;
}
#center {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#form {
  margin: 0 auto;
  display: block;
  margin-bottom: 50px;
}
.v-alert{
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>

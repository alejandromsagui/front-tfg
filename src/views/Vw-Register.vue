<template>
  <v-container fluid class="background">
    <div class="background-image"></div>
    <v-sheet
        class="d-flex align-center justify-center flex-wrap text-center mt-10 ml-12"
        elevation="8"
        rounded
        color="#F80808"
        :width="370"
        height="370"
        style="margin-bottom: 10%"
      >
        <v-card width="350px" height="350" elevation="8">
            <v-card-title id="title">Registro</v-card-title>
            <v-form id="center-form">
                <v-text-field
                  clearable
                  label="Usuario"
                  type="text"
                  prepend-icon="fa-solid fa-user"
                  variant="underlined"
                  class="input"
                ></v-text-field>
                <v-text-field
                  clearable
                  label="Email"
                  type="text"
                  prepend-icon="fa-solid fa-envelope"
                  variant="underlined"
                  class="input"
                ></v-text-field>
                <v-text-field
                  clearable
                  label="Contraseña"
                  type="password"
                  prepend-icon="fa-sharp fa-solid fa-key"
                  variant="underlined"
                  class="input"
                ></v-text-field>
                <v-btn color="#F80808" class="mt-5" variant="elevated" id="button">Iniciar sesión</v-btn>
              </v-form>
        </v-card>
    </v-sheet>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
  font-family: "Roboto", sans-serif;
}

.background {
  background-image: url(../assets/images/treasure-map.jpg);
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  max-height: 100%;
  height: 100%;
}
.background-image{
  background-color: black;
  position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  filter: blur(2px);
  transform: scale(1.1);
  opacity: 30%;
}
#title{
    font-weight: bold !important;
}
#center-form{
    margin-top: 10px;
}
.input{
    width: 70%;
    margin: 0 auto;
}
#button{
  color: #fff;
  font-weight: bold;
}
#button:hover{
  background-color: #fff !important;
  color: #F80808;
  transition: 0.3s;
}
</style>
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
                  <v-card-text class="card-text">¿Te atreves a unirte a nuestra</v-card-text>
                    <span id="space-word">comunidad</span><span class="card-text">?</span>
                    </div>
                  </div>
              <v-img
                src="../src/assets/images/register.jpg"
                width="100%"
                cover
                height="540"
                style="margin-bottom: 80px;"
              ></v-img>
              </div>
            </v-col>
            <v-col align-self="center" class="my-10" cols="4">
              <div id="form">
              <v-form>
                <v-avatar image="../src/assets/images/avatar.jpg" size="80" class="mb-12"></v-avatar>
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
                  type="email"
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
                <v-file-input clearable label="Escoge tu avatar" variant="underlined" class="input"></v-file-input>
                <v-btn color="#F80808" class="mt-5" variant="elevated" id="button">Registro</v-btn>
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
#button{
  color: #fff;
  font-weight: bold;
}
#button:hover{
  background-color: #fff !important;
  color: #F80808;
  transition: 0.3s;
}
.image-container {
  position: relative;
  margin-right: 20px;
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
.card-text{
color: #fff;
font-weight: bold;
font-size: 2em;
font-display: initial;
}

#space-word{
  color: #fff;
font-weight: bold;
font-size: 2em;
font-display: initial;
}
#center{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#form{
  margin: 0 auto;
  display: block;
  margin-bottom: 50px;
}

</style>

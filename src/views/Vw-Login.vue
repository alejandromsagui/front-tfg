<template>
  <v-container fluid class="background">
    <div class="background-image"></div>
    <div class="center">
      <v-sheet
        class="d-flex align-center justify-center flex-wrap text-center"
        elevation="4"
        rounded
        :width="800"
        style="margin-bottom: 10%"
      >
        <v-card width="800px" height="400">
          <v-row align-content="center">
            <v-col align-self="center" cols="8">
              <v-img
                src="../src/assets/images/gif.gif"
                width="100%"
                cover
                height="400"
              ></v-img>
            </v-col>
            <v-col align-self="center" class="my-10" cols="4">
              <v-form>
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
                  label="Contraseña"
                  type="password"
                  prepend-icon="fa-sharp fa-solid fa-key"
                  variant="underlined"
                  class="input"
                ></v-text-field>
                <v-btn color="#F80808" class="mt-5" variant="elevated" id="button">Iniciar sesión</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.input {
  width: 230px;
  margin-right: 20px !important;
  padding: 3px;
  color: rgb(248, 8, 8);
  text-align: center;
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
  position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  filter: blur(2px);
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
</style>

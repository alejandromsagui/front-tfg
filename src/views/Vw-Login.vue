<template>
  <div class="background">
    <div class="blur"></div>
    <div class="card-center">
      <div class="card">
        <v-card width="800" height="400">
          <div class="div1">
              <img src="../assets/images/gif.gif" alt="">
          </div>
          <div class="div2">
            <v-card-text>
              <v-form>
                  <v-text-field label="Usuario">

                  </v-text-field>
                  <v-text-field label="Contraseña" type="password">

                  </v-text-field>
              </v-form>
            </v-card-text>
            <v-btn color="orange">Iniciar sesión</v-btn>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

*{
    font-family: 'Roboto', sans-serif;
}
.div1 img{
  width: 50%;
  float:left;  
  background-image: url();
  width: 450px;
  height: 400px;
  position: fixed;
}   
.div2{
  float: right;
  width: 50%;
  width: 300px;
  margin-top: 70px;
  align-items: center;
}
.card-center{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
.background{
  width: 100%;
  height: 100%;
  position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.blur{
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
</style>

 <template>
    <v-app-bar class="app-bar">
    <v-toolbar color="black" density="comfortable" class="toolbar">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <h4 class="logo">Logo</h4>
      <v-toolbar-title class="title"
        >Namekians<span>Games</span></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items class="items">
        <v-btn class="link" text>Home</v-btn>
        <v-btn class="link" text>Login</v-btn>
        <v-btn class="link" text>Registro</v-btn>
        <v-btn class="link" text>Contacto</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </v-app-bar>

</template>

<script setup>


</script>

<style lang="css">
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}
.app-bar{
  background-color: black !important;
}
.items{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    color: #fff;

}
.logo{
    color: white;
    width: 140px;
    margin-left: 10px;
}
.items {
  display: none;
  line-height: 30px;
  margin: 50px 0;
  transition: all 0.5s;
}
.link {
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
}
.link:hover {
  color: rgb(248, 8, 8);
  transition: 0.3s;
}

 .title span {
  color: rgb(248, 8, 8);;
  font-size: 1.1em;
}
</style>
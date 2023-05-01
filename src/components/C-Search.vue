<template>
    <v-icon @click="toggleSearchBar()" class="link fas fa-search mr-5"></v-icon>
    <v-row v-if="showSearchBar">
        <!-- <v-col cols="12">
            <v-text-field v-model="searchText" placeholder="Buscar..." solo hide-details></v-text-field>
            <v-btn @click="search()" color="primary">Buscar</v-btn>
        </v-col> -->
        <h2 style="color: white;">Hola</h2>
    </v-row>
</template>
  
  
<script setup>
import { ref } from "vue";

const searchText = ref();
const showSearchBar = ref(false);

const toggleSearchBar = () => {
    console.log(showSearchBar.value);
    showSearchBar.value = !showSearchBar.value
}

const search = () => {
    console.log('En proceso');
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@700&display=swap');

* {
    padding: 0;
    margin: 0;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
    font-family: 'Alegreya Sans SC', sans-serif;
}

.link {
    font-size: 12px;
    font-weight: 600;
}

.link::before {
    background-color: transparent !important;
}

.link:hover {
    color: rgb(248, 8, 8);
    transition: 0.3s;
}
</style>

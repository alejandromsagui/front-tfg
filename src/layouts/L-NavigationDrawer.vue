<template>
    <div>
      <CHeader>
        <template #navigation>
          <!-- Contenido que deseas mostrar en el navigation drawer -->
          <h2>Hola</h2>
          <h2>Hola</h2>
          <h2>Hola</h2>
          <h2>Hola</h2>
        </template>
      </CHeader>
    </div>
  </template>
<script setup>
import { ref, onMounted, watch } from "vue"
import { useLoginStore } from '../stores/login';
import { storeToRefs } from 'pinia';
import { CHeader } from "../components";

const userStore = useLoginStore()
const { authenticated } = storeToRefs(userStore)

onMounted(async () => {
    if (token) {
        authenticated.value = true

    } else {
        authenticated.value = false
    }
})

const drawer = ref(false)
const group = ref(null)

const items = [

    {
        title: 'Acceder',
        value: 'Acceder',
        icon: 'fa-solid fa-right-to-bracket',
        action: "login"
    }
]


const itemsLogged = [{
    title: 'Perfil',
    value: 'perfil',
    icon: 'fa-solid fa-user',
    action: "profile"
},
{
    title: 'Subir juego',
    value: 'subir',
    icon: 'fa-solid fa-upload',
    action: '#'
},
{
    title: 'Saldo',
    value: 'saldo',
    icon: 'fa-solid fa-coins',
    action: '#'
},
{
    title: 'Historial de compras',
    value: 'historial de compras',
    icon: 'fa-sharp fa-solid fa-shop',
    action: '#'
}
]
watch(group, () => {
    drawer.value = false
})
</script>
<style lang="css"></style>
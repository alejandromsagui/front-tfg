<template>
    <v-dialog v-model="videogameStore.dialog" persistent width="1024" @click="emitValueToUpload">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="link" text><i class="fa-solid fa-upload mr-1"></i>Subir</v-btn>
        </template>
        <CUpload :value="valueToComponentUpload" @change-dialog-value=" videogameStore.dialog = $event"></CUpload>
    </v-dialog>
</template>

<script setup>
import { ref, watchEffect, defineEmits } from "vue";
import { useVideogameStore } from "../stores/videogames"
import  CUpload  from "../components/C-Upload.vue";

const videogameStore = useVideogameStore()
// const dialog = ref();
const valueToComponentUpload = ref('')

const  emit  = defineEmits(['pass-value']);

watchEffect(() => {
    valueToComponentUpload.value = videogameStore.dialog;
})

const emitValueToUpload = () => {
    emit('pass-value', videogameStore.dialog)
}
</script>

<style lang="css" scoped>
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
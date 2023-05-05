<template>
    <v-dialog v-model="dialog" persistent width="1024" @click="emitValueToUpload">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="link" text><i class="fa-solid fa-upload mr-1"></i>Subir</v-btn>
        </template>
        <CUpload :value="valueToComponentUpload" @change-dialog-value="dialog = $event"></CUpload>
    </v-dialog>
</template>

<script setup>
import { ref, watchEffect, defineEmits } from "vue";
import  CUpload  from "../components/C-Upload.vue";


const dialog = ref();
const valueToComponentUpload = ref('')

const  emit  = defineEmits(['pass-value']);

watchEffect(() => {
    valueToComponentUpload.value = dialog.value;
})

const emitValueToUpload = () => {
    emit('pass-value', dialog.value)
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
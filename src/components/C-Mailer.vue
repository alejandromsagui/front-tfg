<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
            <v-window v-model="transition">
                <v-window-item :value="updateValue">
                    <v-row>
                        <v-col cols="12" md="8" sm="12" xs="12" class="text-center mx-auto">
                            <v-slot name="data"></v-slot>
                        </v-col>
                    </v-row>
                </v-window-item>
            </v-window>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from "vue";

const value = ref(1)

const updateValue = (newValue) => {
    value.value = newValue;
}
</script>

<style lang="scss" scoped></style>
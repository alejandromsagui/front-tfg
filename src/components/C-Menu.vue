<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" width="1024">
            <template v-slot:activator="{ props }">
                <v-btn class="link" v-bind="props" text><i class="fa-solid fa-coins"></i> Saldo</v-btn>
            </template>
            <CHeader :value="viewBalance"></CHeader>

            <v-card min-width="300">
                <v-list>
                    <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" title="John Leider"
                        subtitle="Founder of Vuetify">
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item>
                        <v-switch v-model="message" color="purple" label="Enable messages" hide-details></v-switch>
                    </v-list-item>

                    <v-list-item>
                        <v-switch v-model="hints" color="purple" label="Enable hints" hide-details></v-switch>
                    </v-list-item>
                </v-list>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn variant="text" @click="menu = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" variant="text" @click="menu = false">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </div>

</template>

<script setup>
import { ref, watchEffect } from "vue"
import { CHeader } from "../components"

const menu = ref()

const viewBalance = ref('')

const  emit  = defineEmits(['pass-value']);

watchEffect(() => {
    viewBalance.value = menu.value;
})

const emitValueToUpload = () => {
    emit('pass-value', menu.value)
}
</script>
<style scoped>
.link {
    font-size: 12px;
    font-weight: 600;
}

.link::before {
  background-color: transparent !important;
}

.link:hover {
  color: rgb(248, 8, 8);
  transition: color 0.3s ease;
}

</style>
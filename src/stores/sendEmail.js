import { defineStore } from 'pinia'
import { router } from '../routes';
import { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRegister } from './register';

export const sendEmail = defineStore({
    id: 'email',

    state: () => ({
        sent: false
    }),

    actions: {
        async sendEmail(email) {
            await instance_axios.post('/recovery')
        }
    }
})
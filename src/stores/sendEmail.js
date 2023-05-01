import { defineStore } from 'pinia'
import { router } from '../routes';
import { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRegister } from './register';

export const useEmailStore = defineStore({
    id: 'email',

    state: () => ({
        code: '',
        nickname: ''
    }),
    getters: {
        getCode() {
            return this.code;
        },
        getNickname(){
            return this.nickname;
        }
    },
    actions: {
        async sendMailByEmail(email) {
            try {
                const response = await instance_axios.post('/recovery', { email })
                router.push({ path: '/codigo' })
                this.code = response.data.code
                this.nickname = response.data.nickname
            } catch (error) {
                toast.error("Ha ocurrido un error al enviar el correo electrónico", {
                    autoClose: 2000,
                    theme: 'colored'
                })
            }
        },

        async sendMailByUser(nickname) {
            try {
                const response = await instance_axios.post('/recovery', { nickname })
                router.push({ path: '/codigo' })
                this.code = response.data.code
                this.nickname = response.data.nickname
            } catch (error) {
                toast.error("Ha ocurrido un error al enviar el correo electrónico", {
                    autoClose: 2000,
                    theme: 'colored'
                })
            }
        }
    }
})
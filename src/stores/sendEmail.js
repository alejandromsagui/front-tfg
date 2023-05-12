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
        nickname: '',
        sent: false
    }),
    getters: {
        getCode() {
            return this.code;
        },
        getNickname() {
            return this.nickname;
        }
    },
    actions: {
        async sendMailByEmail(email) {

            if (!email) {
                console.log('Mal email');
            } else {
                const response = await instance_axios.post('/recovery', { email })
                router.push({ path: '/codigo' })
                this.code = response.data.code
                this.nickname = response.data.nickname

                toast.success("En el caso de que exista, recibirás un correo electrónico con el código para recuperar tu contraseña", {
                    autoClose: 2000,
                    theme: 'colored'
                })
                this.sent = true
            }
        },

        async sendMailByUser(nickname) {

            if (!nickname) {
                console.log('Mal nickname');
            } else {
                const response = await instance_axios.post('/recovery', { nickname })
                router.push({ path: '/codigo' })
                this.code = response.data.code
                this.nickname = response.data.nickname

                toast.success("En el caso de que exista, recibirás un correo electrónico con el código para recuperar tu contraseña", {
                    autoClose: 2000,
                    theme: 'colored'
                })
                this.sent = true;
            }
        }
    }
})
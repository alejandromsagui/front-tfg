import { defineStore } from 'pinia'
import { router } from '../routes';
import { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useLoginStore = defineStore({
    id: 'login',

    state: () => ({
        token: JSON.parse(localStorage.getItem("token")),
        returnUrl: null,
        authenticated: false
    }),
    getters: {
        isAuthenticated() {
            return this.authenticated;
        }
    },
    actions: {

        async login(nickname, password) {

            try {
                const user = await instance_axios.post('/login', { nickname, password });
                //Se actualiza el estado del usuario (no es necesario mutations)
                this.user = user;
                localStorage.setItem('token', JSON.stringify(user.data.data.token));
                this.authenticated = true

                toast.success("¡Bienvenido de nuevo, " + nickname + "!", {
                    autoClose: 2000,
                    theme: 'colored'
                });
                router.push('/')
            } catch (error) {
                this.authenticated = false
                toast.error("Nombre de usuario o contraseña incorrectos", {
                    autoClose: 2000,
                    theme: 'colored'
                });
            }
        },

        logout() {
            this.user = null;
            localStorage.removeItem('token')
            this.authenticated = false
            router.push('/login')
        },

    }

})
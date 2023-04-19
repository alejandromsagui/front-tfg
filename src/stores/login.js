import { defineStore } from 'pinia'
import { router } from '../routes';
import { instance_axios } from '../middlewares/axios';

export const useLoginStore = defineStore({
    id: 'user',

    state: () => ({
        token: JSON.parse(localStorage.getItem("token")),
        returnUrl: null,
        authenticated: false
    }),

    actions: {

        async login(nickname, password) {

            try {
                const user = await instance_axios.post('/login', { nickname, password });
                //Se actualiza el estado del usuario (no es necesario mutations)
                this.user = user;
                localStorage.setItem('token', JSON.stringify(user.data.data.token));
                this.authenticated = true
                router.push('/')
            } catch (error) {
                console.log(error);
                this.authenticated = false
            }
        },

        logout() {
            this.user = null;
            localStorage.removeItem('token')
            this.authenticated = false
            router.push('/login')
        }
    }

})
import { defineStore } from "pinia";
import { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { router } from '../routes';
import  form  from "../views/Vw-Access.vue"
export const useRegister = defineStore({
    id: 'register',
    state: () => ({
        user: null,
        nicknameExists: false,
    }),

    actions: {

        async getNickname(nickname) {
            try {
                const response = await instance_axios.get(`/getNickname/${nickname}`);
                return response.status;
            } catch (error) {
                return error.response.status;
            }
        },
        async getEmail(email) {
            try {
                const response = await instance_axios.get(`/getEmail/${email}`);
                return response.status;
            } catch (error) {
                return error.response.status;
            }
        },

        //Registro del usuario
        async signIn(nickname, email, password) {
            try {
                const user = await instance_axios.post('/register', { nickname, email, password })
                this.user = user;

                toast.success(user.data.message, {
                    autoClose: 2000,
                    theme: 'colored'
                })
            } catch (error) {
                if (error.response && error.response.status === 500 || error.response.status === 400) {
                    toast.error(error.response.data.message, {
                        autoClose: 2000,
                        theme: 'colored'
                    });
                }
            }
        }
    }
})
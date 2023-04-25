import { defineStore } from "pinia";
import { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { router } from '../routes';


export const useRegister = defineStore({
    id: 'register',
    state: () => ({
        user: null,
        nicknameExists: false
    }),

    actions: {

        async getNickname(nickname) {
            try {
                const response = await instance_axios.get(`/getNickname/${nickname}`);
                return response.status;
            } catch (error) {
                if (error.response) {
                    return error.response.status;
                } else {
                    console.log(error);
                    return 500;
                }
            }
        },
        async getEmail(email) {
            try {
                const response = await instance_axios.get(`/getEmail/${email}`);
                return response.status;
            } catch (error) {
                if (error.response) {
                    return error.response.status;
                } else {
                    console.log(error);
                    return 500;
                }
            }
        },

        async signIn(nickname, email, password) {
            try {
                const user = await instance_axios.post('/register', { nickname, email, password })
                this.user = user;

                toast.success("Te has registrado correctamente", {
                    autoClose: 2000,
                    theme: 'colored'
                })
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    toast.error("Ha ocurrido un error", {
                        autoClose: 2000,
                        theme: 'colored'
                    });
                }
            }
        }
    }
})
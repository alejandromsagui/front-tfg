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
                const nicknameExists = await instance_axios.get('/getNickname/' + nickname);
                return nicknameExists.status
            } catch (error) {
                console.error(error)
                return error.response.status
            }
        },
        async signIn(nickname, email, password) {

            const getNickname = await this.getNickname(nickname)
            
            if (getNickname === 200) {
                this.nicknameExists = true
               
            }
            
            if(getNickname !== 200){
                nicknameExists = false
                try {
                    const user = await instance_axios.post('/register', { nickname, email, password })
                    this.user = user;

                    toast.success("Te has registrado correctamente", {
                        autoClose: 2000,
                        theme: 'colored'
                    })
                } catch (error) {
                    toast.error("Ha ocurrido un error", {
                        autoClose: 2000,
                        theme: 'colored'
                    });
                }
            }
        },
    }
})
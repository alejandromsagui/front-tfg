import { defineStore } from "pinia";
import { instance_axios } from "../middlewares/axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const userData = defineStore({
    id: 'data',

    state: () => ({
        token: '',
        email: '',
        nickname: '',
        newToken: ''
    }),

    getters: {
        getNickname() {
            return this.nickname;
        },
        getEmail() {
            return this.email;
        },
        getToken() {
            return this.token;
        },
        getNewToken() {
            return this.newToken
        }
    },
    actions: {

        async decodeToken() {
            const res = await instance_axios.get('/decode');
            console.log('Email desde Pinia: ' + res.data.email);
            console.log('Nickname desde Pinia: ' + res.data.nickname);
            this.email = res.data.email;
            this.nickname = res.data.nickname;
        },

        async getData() {

            if (localStorage.getItem('token')) {
                instance_axios.defaults.headers.common['token'] = JSON.parse(localStorage.getItem('token'));
            }
            await this.decodeToken()
        },

        async updateTokenByNickname(nickname) {
            const res = await instance_axios.put('/updateToken', { nickname })
            console.log('Token actualizado: ' + res.data.data.token);
            localStorage.setItem('token', JSON.stringify(res.data.data.token))
        },

        async updateTokenByEmail(email) {
            const res = await instance_axios.put('/updateToken', { email })
            console.log('Token actualizado: ' + res.data.data.token);
            localStorage.setItem('token', JSON.stringify(res.data.data.token))
        },
        async changeNickname(nickname, password) {

            let res; 
            try {
                res = await instance_axios.put('/updateNickname/' + this.nickname, { nickname, password })

                console.log('Token: ' + res.data.token);
                console.log('Respuesta bien: ' + res.data.message);

                if (res.data.message === "El nombre de usuario debe ser diferente al actual" || res.data.message === "La contraseña no es válida"
                    || res.data.message === "Debe proporcionar un nombre de usuario válido" || res.data.message === "El nombre de usuario ya está en uso") {
                    toast.error(res.data.message, {
                        autoClose: 2000,
                        theme: 'colored'
                    });
                } else {
                    toast.success("Nombre actualizado a, " + nickname, {
                        autoClose: 2000,
                        theme: 'colored'
                    });

                    await this.getData()
                    this.nickname = nickname

                    console.log('Valor de nickname desde changeNickname: ' + this.nickname);
                }

            } catch (error) {
                console.log('Error: ' + res.data.message);
                toast.error(res.data.message, {
                    autoClose: 2000,
                    theme: 'colored'
                });
            }
        },
        async changeEmail(email, password) {
            try {
                const res = await instance_axios.put('/updateEmail/' + this.email, { email, password })

                if (res.data.message === "Debe proporcionar un correo válido" || res.data.message === "El correo debe ser diferente al actual"
                    || res.data.message === "La contraseña no es válida" || res.data.message === "El correo proporcionado ya está en uso") {
                    toast.error(res.data.message, {
                        autoClose: 2000,
                        theme: 'colored'
                    });
                } else {
                    toast.success("Correo actualizado a, " + email, {
                        autoClose: 2000,
                        theme: 'colored'
                    });

                    this.email = email
                    console.log('Valor de email desde changeEmail: ' + this.email);
                }

            } catch (error) {
                toast.error("Ha ocurrido un error al actualizar el correo", {
                    autoClose: 2000,
                    theme: 'colored'
                });
            }
        },
        async changePassword(oldPassword, newPassword) {
            try {
                const res = await instance_axios.put('/updatePassword/' + this.nickname, { oldPassword, newPassword })

                if (res.data.message === "La contraseña antigua no es válida" || res.data.message === "La contraseña nueva no puede coincidir con la antigua") {
                    toast.error(res.data.message, {
                        autoClose: 2000,
                        theme: 'colored'
                    });
                } else {
                    toast.success("¡Contraseña actualizada!", {
                        autoClose: 2000,
                        theme: 'colored'
                    });
                }
            } catch (error) {
                if (res.data.message === "Error en el servidor") {
                    toast.error(res.data.message, {
                        autoClose: 2000,
                        theme: 'colored'
                    });
                }
            }
        }
    }
})
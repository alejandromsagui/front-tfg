import { defineStore } from "pinia";
import { instance_axios } from "../middlewares/axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useLoginStore } from "./login"

export const userData = defineStore({
    id: 'data',

    state: () => ({
        token: '',
        email: '',
        nickname: '',
        newToken: ''
    }),

    actions: {
        async updateTokenByNickname(nickname) {
            const res = await instance_axios.put('/updateToken', { nickname })
            console.log('Token actualizado: ' + res.data.data.token);
            localStorage.setItem('token', res.data.data.token);
        },

        async updateTokenByEmail(email) {
            const res = await instance_axios.put('/updateToken', { email })
            console.log('Token actualizado: ' + res.data.data.token);
            localStorage.setItem('Authorization', res.data.data.token)
        },
        async changeNickname(nickname, password) {
            try {

                const response = await instance_axios.put(`/updateNickname/${nickname}`, { nickname, password });
                
                console.log('Response: ', response.data);
                if (
                    response.data.message === "El nombre de usuario debe ser diferente al actual" ||
                    response.data.message === "La contraseña no es válida" ||
                    response.data.message === "Debe proporcionar un nombre de usuario válido" ||
                    response.data.message === "El nombre de usuario ya está en uso"
                ) {
                    toast.error(response.data.message, {
                        autoClose: 2000,
                        theme: 'colored'
                    });
                } else {
                    toast.success(`Nombre actualizado a, ${nickname}`, {
                        autoClose: 2000,
                        theme: 'colored'
                    });
        
                    console.log(`Valor de nickname desde changeNickname: ${nickname}`);
                }
            } catch (error) {
                console.log(`Error: ${error.message}`);
                toast.error(error.message, {
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
    },

})
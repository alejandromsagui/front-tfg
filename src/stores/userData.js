import { defineStore } from "pinia";
import { instance_axios } from "../middlewares/axios";
import { useLoginStore } from "./login"
import { Buffer } from "buffer"
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



export const userData = defineStore({
    id: 'data',

    state: () => ({
        token: '',
        email: '',
        nickname: '',
        newToken: '',
        admin: false,
        form: '',
        loading: false,
        numRegister: null,
        position: null
    }),
    getters: {
        getNumRegisters(){
            return this.numRegister;
        }
    },
    actions: {

        async changeNickname(nickname, password) {
            try {
                const response = await instance_axios.put('/updateNickname', { nickname, password })

                toast.success(response.data.message, {
                    autoClose: 3000,
                    theme: "colored"
                })

                localStorage.setItem('token', response.data.data.token)

                return response;
            } catch (error) {
                console.log('error: ', error);
                toast.error(error.response.data.message, {
                    autoClose: 3000,
                    theme: "colored"
                })

                return error.response;
            }
        },
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


        async changeEmail(email, password) {
            try {
                const response = await instance_axios.put('/updateEmail', { email, password });
                localStorage.setItem('token', response.data.data.token)
                return response;
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : 'Ha ocurrido un error');
            }
        },
        async changePassword(oldPassword, newPassword) {
            try {
                const response = await instance_axios.put('/updatePassword/', { oldPassword, newPassword })
                return response;
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : 'Ha ocurrido un error');
            }
        },


        async getUsers() {
            try {
                const response = await instance_axios.get('/getUsersDetails');
                console.log(response.data.users);
                return response.data.users;
            } catch (error) {
                console.log(error);
            }
        },

        async getUserByNickname() {

            const token = localStorage.getItem('token');
            const [header, payload, signature] = token.split(".");
            const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));

            try {
                const response = await instance_axios.get(`/getNamekoins/${decodedPayload.nickname}`)
                console.log(response.data);
                console.log(response.data.coins);
                return response.data.coins
            } catch (error) {
                console.log(error);
            }
        },
        async getPermission() {

            const token = localStorage.getItem('token');
            const [header, payload, signature] = token.split(".");
            const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));

            try {
                const response = await instance_axios.get(`/getPermission/${decodedPayload.nickname}`)
                console.log(response);

                if (response.data.isAdmin === true) {
                    this.admin = true;
                }

                return this.admin;
            } catch (error) {
                console.log(error);
            }
        },
        async deleteUser() {

            const loginStore = useLoginStore()
            const token = localStorage.getItem('token');
            const [header, payload, signature] = token.split(".");
            const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));

            try {
                const response = await instance_axios.delete(`deleteUser/${decodedPayload.id}`)
                loginStore.logout()

                toast.success(response.data.message, {
                    theme: "colored",
                    autoClose: 3000
                })
            } catch (error) {
                toast.error(error.response.data.message, {
                    theme: "colored",
                    autoClose: 3000
                })
            }
        },

        async deleteUserByAdmin(id) {
            try {
                const response = await instance_axios.delete(`deleteUserByAdmin/${id}`)
                toast.success(response.data.message, {
                    theme: "colored",
                    autoClose: 3000
                })
            } catch (error) {
                toast.error(error.response.data.message, {
                    theme: "colored",
                    autoClose: 3000
                })
            }
        },

        async newRecommendation(details) {
            try {
                const response = await instance_axios.post('/newRecommendation', { details })
                toast.success(response.data.message, {
                    theme: "colored",
                    autoClose: 3000
                })

                return response;
            } catch (error) {
                toast.error(error.response.data.message, {
                    theme: "colored",
                    autoClose: 3000
                })
            }
        },

        async exportData() {
            this.loading = true
            try {
                const response = await instance_axios.get('/export', {
                    responseType: 'blob',
                });
                this.loading = false
                return response;
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : 'Ha ocurrido un error');
            }
        },

        getRanking(nickname) {
            instance_axios
                .get(`/findRanking/${nickname}`)
                .then((response) => {
                    this.position = response.data.ranking.position;
                    console.log('Valor de position:', this.position);
                })
                .catch((error) => {
                    if (error.response && error.response.status === 500) {
                        toast.error(error.response.data.message, {
                            theme: "colored",
                            autoClose: 3000
                        })
                    }
                });
        }, 

          async getRegisters(){
            try {
                const response = await instance_axios.get('/countRegister')
                this.numRegister = response.data.numRegistros;
            } catch (error) {
                return error;
            }
          }
    },

})
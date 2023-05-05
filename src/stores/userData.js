import { defineStore } from "pinia";
import { instance_axios } from "../middlewares/axios";

export const userData = defineStore({
    id: 'data',

    state: () => ({
        token: JSON.parse(localStorage.getItem("token")),
        email: '',
        nickname: ''
    }),

    getters: {
        getNickname(){
            return this.nickname;
        },
        getEmail(){
            return this.email;
        }
    },
    actions: {
        async getData() {
            const token = localStorage.getItem('token');

            if(token){
                instance_axios.defaults.headers.common['token'] = JSON.parse(token);
            }
            const response = await instance_axios.get('/decode');
            console.log('Email desde Pinia: '+response.data.email);
            console.log('Nickname desde Pinia: '+response.data.nickname);
            this.email = response.data.email;
            this.nickname = response.data.nickname;
            return response.data.nickname;
        }
    }
})
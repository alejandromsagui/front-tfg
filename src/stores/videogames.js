import { defineStore } from "pinia";
import { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { router } from '../routes';

export const useVideogameStore = defineStore({
    id: 'videogame',

    state: () => ({
        res: ''
    }),
    actions: {

        async newVideogame(name, description, genre, price, userId, nickname) {
            try {

                console.log('estoy aqui');
                this.res = await instance_axios.post('/newVideogame', {name, description, genre, price, userId, nickname});
                console.log(this.res);
            } catch (error) {
                console.log(error);
            }
        },

        async getVideogames() {
            try {
                const response = await instance_axios.get('/videogames');
                console.log(response.data.videogames);
                return response.data.videogames;
            } catch (error) {
                console.log(error);
            }
        },
    }
})
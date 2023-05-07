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
        async newVideogame(name, genre, description, price) {
            try {
                this.res = await instance_axios.post('/newVideogame', { name, genre, description, price })
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
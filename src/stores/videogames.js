import { defineStore } from "pinia";
import headers, { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { router } from '../routes';


export const useVideogameStore = defineStore({
    id: 'videogame',

    state: () => ({
        res: ''
    }),
    actions: {
        async newVideogame(nvg) {
            try {
                console.log('estoy aqui');

                const options = {
                    headers: headers(true),
                  };

                const res = await instance_axios.post('/newVideogame', nvg, options)
                console.log(res.data);
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
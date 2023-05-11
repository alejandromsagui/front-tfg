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
                const options = {
                    headers: headers(true),
                  };
                const res = await instance_axios.post('/newVideogame', nvg, options)
                console.log(res.data);

                toast.success('¡Videojuego subido correctamente!', {
                    autoClose: 2000,
                    theme: 'colored'
                  })
            } catch (error) {
                console.log(error);
                toast.error('Ha ocurrido un error al subir el videojuego', {
                    autoClose: 2000,
                    theme: 'colored'
                  })
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
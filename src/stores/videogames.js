import { defineStore } from "pinia";
import headers, { instance_axios } from "../middlewares/axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { router } from "../routes";

export const useVideogameStore = defineStore({
  id: "videogame",

  state: () => ({
    res: "",
    videogames: [],
  }),

  getters: {
    // async getVideogames(){
    //     try {
    //         const response = await instance_axios.get('/videogames');
    //         console.log(response.data.videogames);
    //         this.videogames.push(...response.data.videogames)
    //         return this.videogames;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
  },
  actions: {
    async newVideogame(nvg) {
      try {
        const options = {
          headers: headers(true),
        };
        const res = await instance_axios.post("/newVideogame", nvg, options);

        this.getVideogames();

        toast.success("¡Videojuego subido correctamente!", {
          autoClose: 2000,
          theme: "colored",
        });
      } catch (error) {
        console.log(error);
        toast.error("Ha ocurrido un error al subir el videojuego", {
          autoClose: 2000,
          theme: "colored",
        });
      }
    },

    async getVideogames() {
      try {
        const response = await instance_axios.get("/videogames");
        console.log(response.data.videogames);
        this.videogames.splice(0, this.videogames.length); // Limpiar la lista antes de agregar los nuevos elementos
        this.videogames.push(...response.data.videogames);
        return this.videogames;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

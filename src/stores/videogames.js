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
    search: '', 
    dialog: false
  }),

  getters: {
    searchVideogame() {
      if (!this.search) {
        return this.videogames
      } else {
        const query = this.search.toLowerCase().replace(/\s/g, '');
        return this.videogames.filter(v =>
          v.name.toLowerCase().replace(/\s/g, '').includes(query) ||
          v.genre.some(g => g.toLowerCase().replace(/\s/g, '').includes(query))
        );
      }
    }
  },
  actions: {
    async newVideogame(nvg) {
      try {
        const options = {
          headers: headers(true),
        };
        const res = await instance_axios.post("/newVideogame", nvg, options);

        this.getVideogames();

        toast.success(res.data.message, {
          autoClose: 2000,
          theme: "colored",
        });

        this.dialog = false;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, {
          autoClose: 2000,
          theme: "colored",
        });
      }
    },

    async getVideogames() {
      try {
        const response = await instance_axios.get("/videogames");
        this.videogames = response.data.videogames;
        console.log(response.data.videogames);
        return this.videogames;
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: 2000,
          theme: "colored",
        });
      }
    },
  },
});

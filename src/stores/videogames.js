import { defineStore } from "pinia";
import headers, { instance_axios } from "../middlewares/axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { router } from "../routes";
import { Buffer } from "buffer";

export const useVideogameStore = defineStore({
  id: "videogame",

  state: () => ({
    res: "",
    videogames: [],
    search: "",
    dialog: false,
    loading: false,
    userVideogames: []
  }),

  getters: {
    searchVideogame() {
      this.loading = true;
      if (!this.search) {
        this.loading = false;
        return this.videogames;
      } else {
        this.loading = false;

        const query = this.search.toLowerCase().replace(/\s/g, "");
        return this.videogames.filter(
          (v) =>
            v.name.toLowerCase().replace(/\s/g, "").includes(query) ||
            v.genre.some((g) =>
              g.toLowerCase().replace(/\s/g, "").includes(query)
            )
        );
      }
    },
  },
  actions: {
    async getVideogames() {
      this.loading = true;

      try {
        const response = await instance_axios.get("/videogames");
        this.videogames = response.data.videogames;
        console.log(response.data.videogames);
        this.loading = false;
        return this.videogames;
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: 2000,
          theme: "colored",
        });
      }
    },

    async newVideogame(nvg) {
      this.loading = true;

      try {
        const options = {
          headers: headers(true),
        };
        const res = await instance_axios.post("/newVideogame", nvg, options);

        this.loading = false;

        // await this.getVideogames();

        const token = localStorage.getItem('token');
        const [header, payload, signature] = token.split(".");
        const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));

        console.log('Longitud videogames antes: ', this.videogames.length);
        this.videogames.push(res.data.videogame)
        console.log('Longitud videogames despues: ', this.videogames.length);

        // console.log(this.videogames.filter(v => v.userId === decodedPayload.id))

        console.log('Longitud user videogame antes: ', this.userVideogames.length);
        this.userVideogames = this.videogames.filter(v => v.userId === decodedPayload.id)
        console.log('Longitud user videogame despues: ', this.userVideogames.length);

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
      } finally {
        this.loading = false;
      }
    },

    

    async getVideogamesByUser(){
      this.loading = true;
      try {
        const response = await instance_axios.get('/getVideogames')
        this.loading = false;  
        this.userVideogames = response.data;
        return this.userVideogames;
      } catch (error) {
        
      }
      },

      async editVideogame(id, nvg) {
        this.loading = true;
        try {
          const options = {
            headers: headers(true),
          };

          const response = await instance_axios.put(`/updateVideogame/${id}`, nvg, options);
          this.loading = false;
          return response;
        } catch (error) {
          console.log(error);
          throw new Error(error.response ? error.response.data.message : 'Ha ocurrido un error');
        } finally {
          this.loading = false;
        }
      },
      async deleteVideogame(id){
        this.loading = true;

        try {
          const response = await instance_axios.delete(`/deleteVideogame/${id}`)
        this.loading = false;
        this.videogames= this.getVideogamesByUser() 
        return response.data;
        } catch (error) {
          console.log(error);
          throw new Error(error.response ? error.response.data.message : 'Ha ocurrido un error');
        } finally {
          this.loading = false;
        }
      },

      async updateState(id, status) {
        this.loading = true;
      
        try {
          const response = await instance_axios.put(`/updateState/${id}`, { status });
          this.loading = false;
          this.getVideogamesByUser();
          return response; 
      
        } catch (error) {
          throw new Error(
            error.response ? error.response.data.message : 'Ha ocurrido un error'
          );
      
        } finally {
          this.loading = false;
        }
      },

      async deleteVideogameByAdmin(id){
        this.loading = true;
        try {
          const response = await instance_axios.delete(`/deleteVideogameByAdmin/${id}`)
          this.loading = false;
          return response;
        } catch (error) {
          throw new Error(
            error.response ? error.response.data.message : 'Ha ocurrido un error'
          );
        } finally {
          this.loading = false;
        }
      },
      async getVideogameById(id){
        this.loading = true;
        try {
          const response = await instance_axios.get(`/getVideogameById/${id}`)
          this.loading = false;
          return response;
        } catch (error) {
          throw new Error(
            error.response ? error.response.data.message : 'Ha ocurrido un error'
          );
        } finally {
          this.loading = false;
        }
      }
      }      
    }
)

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
    async newVideogame(nvg) {
      this.loading = true;

      try {
        const options = {
          headers: headers(true),
        };
        const res = await instance_axios.post("/newVideogame", nvg, options);

        this.loading = false;

        this.getVideogames();
        this.userVideogames = this.getVideogamesByUser()
        
        console.log('Valor de user videogames ',);
        toast.success(res.data.message, {
          autoClose: 2000,
          theme: "colored",
        });

        // const token = localStorage.getItem('token');
        // const [header, payload, signature] = token.split(".");
        // const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));

        // console.log('Lo que trae this.videogames ',  this.videogames);
        // console.log(this.videogames.find(v => v.userId === decodedPayload.id));
        // this.videogames.push(res.videogame);
        // this.userVideogames = this.videogames.find(v => v.userId === decodedPayload.id)

        
        // console.log('Valor de videogames ', this.videogames);
        // console.log(this.videogames.length);
        // console.log('Valor de user videogames ', this.userVideogames);

        this.dialog = false;
        // return this.videogames;
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
      }
    
      }      
    }
)

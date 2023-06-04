import { defineStore } from "pinia";
import { instance_axios } from "../middlewares/axios";
import { toast } from "vue3-toastify";
import { useLoginStore } from "./login";
import "vue3-toastify/dist/index.css";

export const reportStore = defineStore({
  id: "report",

  state: () => ({
    notifications: '',
    loading: false
  }),

  actions: {
    async reportUser(nickname) {
      try {
        const response = await instance_axios.put(`/block/${nickname}`);
        toast.success(response.data.message, {
          autoClose: 3000,
          theme: "colored",
        });
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: 3000,
          theme: "colored",
        });
      }
    },

    async reportGame(id) {
        const loginStore = useLoginStore()
      try {
        const response = await instance_axios.put(`reportGame/${id}`);
        toast.success(response.data.message, {
          autoClose: 3000,
          theme: "colored",
        });
      } catch (error) {
        console.log(error);
        loginStore.logout()
        toast.error(error.response.data.message, {
          autoClose: 3000,
          theme: "colored",
        });
      }
    },

    async getReports(){
      try {
        const response = await instance_axios.get('/reports')
        console.log('response data de reports ', response.data);
        this.notifications = response.data;
        return response;
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: 3000,
          theme: "colored",
        });
      }
    },
    async unblockUser(nickname){
      try {
        const response = await instance_axios.put(`/unblock/${nickname}`);
        console.log('Response: ', response);
        toast.success(response.data.message, {
          autoClose: 3000,
          theme: "colored",
        });
      } catch (error) {
        console.log('Error: ', error);
        toast.error(error.response.data.message, {
          autoClose: 3000,
          theme: "colored",
        });
      }
    },

    async getVideogamesReported(){
      try {
        const res = await instance_axios.get('/videogamesReported')
        return res.data;
    } catch (error) {
        console.log(error);
    }
    },

    async deleteNotification(id){
      try {
        const response = instance_axios.delete(`/deleteNotification/${id}`)
        return response;
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Ha ocurrido un error');
      }
    },

    async changeReaded(id){
      try {
        const response = instance_axios.put(`/changeReaded/${id}`)
        return response;
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Ha ocurrido un error');
      }
    },

    async editNotificationDetail(id, details){
      try {
        const response = instance_axios.put(`/editDetailsNotification/${id}`, {details})
        return response;
      } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Ha ocurrido un error');
      }
    },

    async exportReports(){
      this.loading = true
      try {
          const response = await instance_axios.get('/exportReports', {
              responseType: 'blob',
          });
          this.loading = false
          return response;
      } catch (error) {
          throw new Error(error.response ? error.response.data.message : 'Ha ocurrido un error');
      }
    }
  },
});

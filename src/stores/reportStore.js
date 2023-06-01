import { defineStore } from "pinia";
import { instance_axios } from "../middlewares/axios";
import { toast } from "vue3-toastify";
import { useLoginStore } from "./login";
import "vue3-toastify/dist/index.css";

export const reportStore = defineStore({
  id: "report",

  state: () => ({
    notifications: ''
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
    }
  },
});

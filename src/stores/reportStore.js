import { defineStore } from "pinia";
import { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const reportStore = defineStore({
    id: 'report',

    state: () => {

    },

    actions: {
        async reportUser(nickname){
            try {
                const response = await instance_axios.put(`/block/${nickname}`)
                toast.success(response.data.message, {
                    autoClose: 3000,
                    theme: "colored"
                })
            } catch (error) {
                toast.error(error.response.data.message, {
                    autoClose: 3000,
                    theme: "colored"
                })
            }
        },

        async reportGame(id){
            try {
                const response = await instance_axios.put(`reportGame/${id}`)
                toast.success(response.data.message, {
                    autoClose: 3000,
                    theme: "colored"
                })
            } catch (error) {
                toast.error(error.response.data.message, {
                    autoClose: 3000,
                    theme: "colored"
                })
            }
        }
    }
})
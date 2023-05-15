import { defineStore } from "pinia";
import { instance_axios } from '../middlewares/axios';

export const paymentStore = defineStore({
    id: 'payment',
    state: () => ({
        user: null,
    }),
    actions: {
        async createOrder() {
            try {
                const response = await instance_axios.post('/create-order')
                console.log(response.data.links[1].href);
                window.location.href = response.data.links[1].href
            } catch (error) {
                console.log(error);
            }
        }
    }
})
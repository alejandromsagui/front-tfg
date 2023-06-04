import { defineStore } from "pinia";
import { instance_axios } from '../middlewares/axios';

export const paymentStore = defineStore({
    id: 'payment',
    state: () => ({
        user: null,
        loading: false
    }),
    actions: {
        async createOrder(quantity) {
            this.loading = true;
            try {
                const response = await instance_axios.post('/create-order', {quantity})
                this.loading = false;
                console.log('Response data: ', response.data);
                console.log(response.data.links[1].href);
                window.open(response.data.links[1].href)
                return response.data;
            } catch (error) {
                console.log(error);
                throw new Error(
                    error.response ? error.response.data.message : 'Ha ocurrido un error'
                  );
            } finally {
                this.loading = false;
            }
        },
        async getUser(user){
            try {
                const response = await instance_axios.get('/getUser/', user)
                console.log('Response desde getUser: '+response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async newTransaction(nt){
            this.loading = true;
            try {
                const response = await instance_axios.post('/newTransaction', nt)
                this.loading = false;
                console.log('Response desde el store de pago: ',response.data);
                return response;
            } catch (error) {
                throw new Error(
                  error.response ? error.response.data.message : "Ha ocurrido un error"
                );
        
                } finally {
                    this.loading = false;
                }
            },
        async getTransactions(nickname){
            try {
                const response = await instance_axios.get(`/findTransaction/${nickname}`)
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
})
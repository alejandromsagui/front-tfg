import { defineStore } from "pinia";
import { instance_axios } from '../middlewares/axios';

export const reviewStore = defineStore({
    id: 'review',

    state: () => ({

    }),
    actions: {
        async newReview(review){
            try {
                const res = await instance_axios.post('/newRating', review)
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        },

        async getReviews(nickname){
            try {
                const res = await instance_axios.get(`/ratings/${nickname}`)
                console.log(res.data);
                return res.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
})
import { defineStore } from "pinia";
import { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { router } from '../routes';

export const useEmailStore = defineStore({
    id: 'videogame',

    state: () => ({
        
    }),
    actions: {
    
    }
})
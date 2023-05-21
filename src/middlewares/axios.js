import axios from "axios";
import { useLoginStore } from '../stores/login'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const instance_axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token').replace(/"/g, '')}` : null
  }
});

instance_axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      const loginStore = useLoginStore();
      loginStore.logout();
      
      const errorMessage = error.response.data.error; // Obtener el mensaje de error del backend
      
      toast.error(errorMessage, {
        autoClose: 3000,
        theme: "colored"
      })
    }
    return Promise.reject(error);
  }
);

instance_axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default function headers(esArchivo) {
  return {
    'Content-Type': esArchivo ? 'application/octet-stream' : 'application/json',
    'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token').replace(/"/g, '')}` : null
  }
}
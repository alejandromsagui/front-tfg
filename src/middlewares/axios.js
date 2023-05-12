import axios from "axios";
import { useLoginStore } from '../stores/login'

const token = localStorage.getItem('token')

export const instance_axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Authorization': token ? `Bearer ${token.replace(/"/g, '')}` : null ,
        'Cache-Control': 'no-cache',
    }
    
})

export default function headers(esArchivo) {
    return {
        'Content-Type': esArchivo ? 'application/octet-stream' : 'application/json',
        'Authorization': token ? `Bearer ${token.replace(/"/g, '')}` : null 
    }
}
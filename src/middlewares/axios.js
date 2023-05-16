import axios from "axios";
// import { useLoginStore } from '../stores/login'


export const instance_axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token').replace(/"/g, '')}` : null
    }

})


// instance_axios.interceptors.response.use(response => {
//     return response
// }, error => {
//     if (error.response.status === 401) {
//         useLoginStore.authenticated = false;
//         useLoginStore().logout
//     }
//     return Promise.reject(error)
// })

instance_axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  
export default function headers(esArchivo) {
    return {
        'Content-Type': esArchivo ? 'application/octet-stream' : 'application/json',
        'Authorization': localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token').replace(/"/g, '')}` : null
    }
}
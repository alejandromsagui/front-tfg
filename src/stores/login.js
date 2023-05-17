import { defineStore, getActivePinia  } from 'pinia'
import { router } from '../routes';
import { instance_axios } from '../middlewares/axios';
import { Buffer } from 'buffer';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref } from 'vue';

export const useLoginStore = defineStore({
  id: 'login',

  state: () => ({
    token: '',
    returnUrl: null,
    authenticated: false,
    nickname: '',
    email: ''
  }),
  getters: {
    isAuthenticated() {
      return this.authenticated;
    },
    getNickname(){
      const token = localStorage.getItem('token')
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));
      return decodedPayload.nickname;
    }
  },
  actions: {

    async loginUser(nickname, password) {
      localStorage.removeItem('token')
      try {
        const response = await instance_axios.post('/login', { nickname, password })
        const tokenResponse = response.data.data.token
        const [header, payload, signature] = tokenResponse.split(".");
        const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));
        
        
        localStorage.setItem('token', tokenResponse)
        this.nickname = decodedPayload.nickname
        this.email = decodedPayload.email
        this.authenticated = true

        toast.success('¡Bienvenido de nuevo, ' + this.nickname + '!', {
          autoClose: 2000,
          theme: 'colored'
        })
        router.push('/')
      } catch (error) {
        toast.error('Nombre de usuario o contraseña incorrectos', {
          autoClose: 2000,
          theme: 'colored'
        })
      }
    },


    async loginEmail(email, password) {
      localStorage.removeItem('token')
      try {
        const response = await instance_axios.post('/login', { email, password })
        const tokenResponse = response.data.data.token
        const [header, payload, signature] = tokenResponse.split(".");
        const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));
        localStorage.setItem('token', tokenResponse)

        this.nickname = decodedPayload.nickname
        this.email = decodedPayload.email
        this.authenticated = true

        toast.success('¡Bienvenido de nuevo, ' + this.nickname + '!', {
          autoClose: 2000,
          theme: 'colored'
        })
        router.push('/')
      } catch (error) {
        toast.error('Nombre de usuario o contraseña incorrectos', {
          autoClose: 2000,
          theme: 'colored'
        })
      }
    },
    
    logout() {
      // map through that list and use the **$reset** fn to reset the state
      getActivePinia()._s.forEach(store => store.$reset());
      /* this.nickname = null;
      this.email = null; */
      localStorage.removeItem('token')
    //  delete instance_axios.defaults.headers.common['Authorization'];
     // this.authenticated = false
      router.push('/acceso')
    },

  }

})
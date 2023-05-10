import { defineStore } from 'pinia'
import { router } from '../routes';
import { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref } from 'vue';

export const useLoginStore = defineStore({
  id: 'login',

  state: () => ({
    token: JSON.parse(localStorage.getItem("Authentication")),
    returnUrl: null,
    authenticated: false,
    nickname: ''
  }),
  getters: {
    isAuthenticated() {
      return this.authenticated;
    }
  },
  actions: {

    async loginUser(nickname, password) {
      try {
        const user = await instance_axios.post('/login', { nickname, password });
        //Se actualiza el estado del usuario (no es necesario mutations)
        console.log('Respuesta user: '+user);
        localStorage.setItem('token', JSON.stringify(user.data.data.token));
        this.authenticated = true;

        this.nickname = nickname;
        toast.success("¡Bienvenido de nuevo, " + this.nickname + "!", {
          autoClose: 2000,
          theme: 'colored'
        });
        router.push('/');
      } catch (error) {
        this.authenticated = false;
        toast.error("Nombre de usuario o contraseña incorrectos", {
          autoClose: 2000,
          theme: 'colored'
        });
      }
    },

    async loginEmail(email, password) {
      localStorage.removeItem('token')
      try {
        const response = await instance_axios.post('/login', { email, password })
        const token = response.data.data.token
        localStorage.setItem('token', JSON.stringify(token))
        this.authenticated = true
    
        const userResponse = await instance_axios.get('/getEmail/'+email)

        console.log(userResponse.data.user.nickname);
        
        this.nickname = userResponse.data.user.nickname
    
        toast.success('¡Bienvenido de nuevo,' + this.nickname+'!', {
          autoClose: 2000,
          theme: 'colored'
        })
    
        router.push('/')
      } catch (error) {
        console.log(error)
        // handle error
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem('token')
      delete instance_axios.defaults.headers.common['Authorization'];
      this.authenticated = false
      router.push('/acceso')
    },

  }


})
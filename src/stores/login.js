import { defineStore } from 'pinia'
import { router } from '../routes';
import { instance_axios } from '../middlewares/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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
        this.user = user;
        localStorage.setItem('Authentication', JSON.stringify(user.data.data.token));
        this.authenticated = true;

        toast.success("¡Bienvenido de nuevo, " + nickname + "!", {
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

    async getTokenDecoded() {
      const token = localStorage.getItem('Authentication');

      if (token) {
        instance_axios.defaults.headers.common['Authentication'] = JSON.parse(token);
      }

      const res = await instance_axios.get('/decode');
      return res.data.nickname
    },

    async loginEmail(email, password) {
      localStorage.removeItem('Authentication')
      let user;
      try {
        user = await instance_axios.post('/login', { email, password });
        this.user = user;
        localStorage.setItem('Authentication', JSON.stringify(user.data.data.token));
        this.authenticated = true;

        const nickname = await this.getTokenDecoded()

        toast.success("¡Bienvenido de nuevo, " + nickname + "!", {
          autoClose: 2000,
          theme: 'colored'
        });
        router.push('/');
      } catch (error) {
        if (user.data.error === "Nombre de usuario o contraseña incorrectos") {
          this.authenticated = false;
          toast.error(user.data.error, {
            autoClose: 2000,
            theme: 'colored'
          });
        }
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem('Authentication')
      delete instance_axios.defaults.headers.common['Authentication'];
      this.authenticated = false
      router.push('/acceso')
    },

  }

})
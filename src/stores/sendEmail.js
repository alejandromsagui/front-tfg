import { defineStore } from "pinia";
import { router } from "../routes";
import { instance_axios } from "../middlewares/axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRegister } from "./register";

export const useEmailStore = defineStore({
  id: "email",

  state: () => ({
    code: "",
    nickname: "",
    email: "",
    sent: false,
    loading: false,
  }),
  getters: {},
  actions: {
    async sendMailByEmail(email) {
      try {
        this.loading = true;
        if (!email) {
          console.log("Mal email");
        } else {
          const response = await instance_axios.post("/recovery", { email });
          router.push({ path: "/codigo" });
          this.code = response.data.code;
          this.email = email;

          toast.success(
            "En el caso de que exista, recibirás un correo electrónico con el código para recuperar tu contraseña",
            {
              autoClose: 2000,
              theme: "colored",
            }
          );
          this.loading = false;
          this.sent = true;
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },

    async sendMailByUser(nickname) {
      try {
        this.loading = true;

        if (!nickname) {
          console.log("Mal nickname");
        } else {
          const response = await instance_axios.post("/recovery", { nickname });
          router.push({ path: "/codigo" });
          this.code = response.data.code;
          this.nickname = nickname;

          toast.success(
            "En el caso de que exista, recibirás un correo electrónico con el código para recuperar tu contraseña",
            {
              autoClose: 2000,
              theme: "colored",
            }
          );

          this.loading = false;
          this.sent = true;
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async confirmCode(nickname, email, recoveryCode) {
      this.loading = true;

      try {
        if (this.nickname !== "") {
          const response = await instance_axios.post("/checkCode", {
            nickname,
            recoveryCode,
          });
          this.code = recoveryCode;
          this.loading = false;
          return response.data;
        } else {
          const response = await instance_axios.post("/checkCode", {
            email,
            recoveryCode,
          });
          this.loading = false;
          this.code = recoveryCode;
          return response.data;
        }
      } catch (error) {
        throw new Error(
          error.response ? error.response.data : "Ha ocurrido un error"
        );
      } finally {
        this.loading = false;
      }
    },
    async changePassword(nickname, email, newPassword, confirmPassword, recoveryCode) {
      this.loading = true;
      try {
        if (this.nickname !== "") {
          const response = await instance_axios.put("/changePassword", {
            nickname,
            newPassword,
            confirmPassword,
            recoveryCode,
          });
          this.loading = false;
          return response.data;
        } else {
          const response = await instance_axios.put("/changePassword", {
            email,
            newPassword,
            confirmPassword,
            recoveryCode,
          });
          this.loading = false;
          return response;
        }
      } catch (error) {
        throw new Error(
          error.response ? error.response.data.message : "Ha ocurrido un error"
        );
      } finally {
        this.loading = false;
      }
    },
  },
});

import { router } from "../routes";
import { useLoginStore } from "../stores/login";

export default function authGuard ({to, from, next}){
    const userStore = useLoginStore();

    if(to.name === 'Login' && userStore.isAuthenticated) next({ name: 'Home'})
    else next()
}


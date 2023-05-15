import { createRouter, createWebHistory } from 'vue-router'
import { vwMain, vwLogin, vwCode, vwProfile, vwPublicProfile, vw404, vwAdmin, vwRecharge } from '../views'
import { instance_axios } from '../middlewares/axios';
import { useLoginStore } from "../stores/login";
import { useEmailStore } from '../stores/sendEmail';
import { userData } from '../stores/userData'


const routes = [
    { path: '/', name: 'Home', component: vwMain },
    { path: '/acceso', name: 'acceso', component: vwLogin },
    { path: '/codigo', name: 'codigo', component: vwCode },
    { path: '/perfil', name: 'perfil', component: vwProfile },
    { path: '/perfil/:nickname', name: 'perfilPublico', component: vwPublicProfile },
    { path: '/:pathMatch(.*)*', name: '404', component: vw404 },
    { path: '/admin', name: 'admin', component: vwAdmin, meta: { requiresAdmin: true } },
    { path: '/recarga', name: 'recarga', component: vwRecharge },
]

const router = createRouter({
    routes,
    linkActiveClass: "active",
    history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
    const userStore = useLoginStore();
    const emailStore = useEmailStore();
    const userDataStore = userData();

    if (to.meta.requiresAdmin) {
        try {
            const response = await instance_axios.get('/getPermission/'+userStore.getToken.nickname);
            if (!response.data.isAdmin) {
                next({ name: 'Home' });
            } else {
                next();
            }
        } catch (error) {
            console.log(userDataStore.nickname);
            console.log(error);
            next({ name: 'Home' });
        }
    } else if (to.name === 'acceso' && userStore.isAuthenticated) {
        next({ name: 'Home' });
    } else if (to.name === 'perfil' && !userStore.isAuthenticated) {
        next({ name: 'acceso' });
    } else if (to.name === 'codigo' && !emailStore.sent) {
        next({ name: 'acceso' });
    } else {
        next();
    }
});
export default router;

//meta: {auth: false} 
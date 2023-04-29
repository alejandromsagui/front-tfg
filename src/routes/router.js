import { createRouter, createWebHistory } from 'vue-router'
import { vwMain, vwLogin, vwCode } from '../views'
import { useLoginStore } from "../stores/login";
import { useEmailStore } from '../stores/sendEmail';

const routes = [
    { path: '/', name: 'Home', component: vwMain },
    { path: '/acceso', name: 'acceso', component: vwLogin },
    { path: '/codigo', name: 'codigo', component: vwCode },
]

const router = createRouter({
    routes,
    linkActiveClass: "active",
    history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
    const userStore = useLoginStore();
    const emailStore = useEmailStore();

    if(to.name === 'acceso' && userStore.isAuthenticated) next({ name: 'Home'})
    else next()

    // if(to.name === 'codigo' && !emailStore.sent) next({name: 'acceso'})
    // else next()
})

export default router;

//meta: {auth: false} 
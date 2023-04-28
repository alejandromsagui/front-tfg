import { createRouter, createWebHistory } from 'vue-router'
import { vwMain, vwLogin } from '../views'
import { useLoginStore } from "../stores/login";


const routes = [
    { path: '/', name: 'Home', component: vwMain },
    { path: '/acceso', name: 'acceso', component: vwLogin }
]

const router = createRouter({
    routes,
    linkActiveClass: "active",
    history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
    const userStore = useLoginStore();

    if(to.name === 'acceso' && userStore.isAuthenticated) next({ name: 'Home'})
    else next()
})

export default router;

//meta: {auth: false} 
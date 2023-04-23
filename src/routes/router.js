import { createRouter, createWebHistory } from 'vue-router'
import { vwMain, vwLogin, vwRegister, vwLogin2 } from '../views'
import { useLoginStore } from "../stores/login";


const routes = [
    { path: '/', name: 'Home', component: vwMain },
    { path: '/login', name: 'Login', component: vwLogin},
    { path: '/registro', name: 'Register', component: vwRegister },
    { path: '/segundoLogin', name: 'loogin', component: vwLogin2 }
]

const router = createRouter({
    routes,
    linkActiveClass: "active",
    history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
    const userStore = useLoginStore();

    if((to.name === 'Login' || to.name === 'Register') && userStore.isAuthenticated) next({ name: 'Home'})
    else next()
})

export default router;

//meta: {auth: false} 
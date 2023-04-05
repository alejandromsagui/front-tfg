import { createRouter, createWebHistory } from 'vue-router'
import { vwMain, vwLogin, vwRegister } from '../views'

const routes = [
    { path: '/', name: 'Home', component: vwMain },
    { path: '/login', name: 'Login', component: vwLogin },
    { path: '/registro', name: 'Register', component: vwRegister },
]
const router = createRouter({
    routes,
    linkActiveClass: "active",
    history: createWebHistory(),
});

export default router;
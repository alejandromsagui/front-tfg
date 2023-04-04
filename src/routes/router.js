import { createRouter, createWebHistory } from 'vue-router'
import { vwMain, vwLogin } from '../views'

const routes = [
    { path: '/', name: 'Home', component: vwMain },
    { path: '/login', name: 'Login', component: vwLogin }
]

const router = createRouter({
    routes,
    linkActiveClass: "active",
    history: createWebHistory(),
});

export default router;
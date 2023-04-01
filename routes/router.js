import { createRouter, createWebHistory } from 'vue-router'
import { vwMain } from '../views'

const routes = [
    { path: '/', name: 'Home', component: vwMain }
]

const router = createRouter({
    routes,
    linkActiveClass: "active",
    history: createWebHistory(),
});

export default router;
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import SettingsPage from '../components/SettingsPage';
import ConstructorPage from '../components/ConstructorPage';
import NotFound from '../components/NotFound';

const routes = [
    {
        path: '/',
        name: 'SettingsPage',
        component: SettingsPage
    },
    {
        path: '/constructor',
        name: 'Constructor',
        component: ConstructorPage
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },

]

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        return {
            top: 0,
            behavior: 'smooth',
        }
    },
    // history: createWebHistory('/poll'),
    history: createWebHashHistory(),
    routes,
})

export default router;

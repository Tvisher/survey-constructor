import { createRouter, createWebHashHistory } from "vue-router";
import SettingsPage from '../components/SettingsPage';
import ConstructorPage from '../components/ConstructorPage';

const routes = [
    {
        path: '/',
        component: SettingsPage
    },
    {
        path: '/constructor',
        component: ConstructorPage
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
    routes,
})

export default router;

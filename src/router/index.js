import {createRouter, createWebHashHistory} from 'vue-router'
import LoginV from '../views/LoginV/LoginV.vue'

const routes = [{
    path: '', name: 'LoginV', component: LoginV, meta: {isKeepAlive: true}
}, {
    path: '/zhuce', name: 'ZhuceV', component: () => import('../views/ZhuceV/ZhuceV.vue'), meta: {isKeepAlive: true}
}, {
    path: '/index', name: 'IndexV', component: () => import('../views/IndexV/IndexV.vue'), meta: {isKeepAlive: true}
}]

const router = createRouter({
    history: createWebHashHistory(), routes
})
//进度条
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//前置守卫
router.beforeEach((to, from, next) => {
    Nprogress.start();
    next();
})
//后置守卫
router.afterEach(() => {

    Nprogress.done();
})
export default router

import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import iView from 'iview'

Vue.use(Router)
const router = new Router({
    routes,
    base: process.env.BASE_URL,
})
export default router
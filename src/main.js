import Vue from 'vue'
import App from './App'
import router from './router'
import reset from '../reset/rest.css'
import iView from 'iview';
import store from './common/store'
import 'iview/dist/styles/iview.css';
import config from './common/config'
import {get, post } from './common/request';
import base from './common/base';
Vue.prototype.$base = base;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
    /**
     * @description 全局注册应用配置
     */
Vue.prototype.$config = config
Vue.use(iView)
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
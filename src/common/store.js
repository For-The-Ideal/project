import {
    setTagNavListInLocalstorage,
    getTagNavListFromLocalstorage,
    getHomeRoute,
    getBreadCrumbList,
    getRouteTitleHandled,
    routeHasExist,
    getNextRoute,
    routeEqual,
} from './function'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import routers from '../router/router'
import config from './config'
const { homeName } = config
const closePage = (state, route) => {
    const nextRoute = getNextRoute(state.tagNavList, route)
    state.tagNavList = state.tagNavList.filter(item => {
        return !routeEqual(item, route)
    })
    router.push(nextRoute)
}
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        token: window.sessionStorage.getItem('token'),
        tagNavList: [],
        homeRoute: {},
        breadCrumbList: [],
    },
    getters: {},
    mutations: {
        // 设置token
        setToken(state, token) {
            state.token = token
            //F5刷新后的保存读取
            window.sessionStorage.setItem('token', token)
        },
        setBreadCrumb(state, route) {
            state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
        },
        setHomeRoute(state, routes) {
            state.homeRoute = getHomeRoute(routes, homeName)
        },
        // 设置初始tag
        setTagNavList(state, list) {
            let tagList = []
            if (list) {
                tagList = [...list]
            } else tagList = getTagNavListFromLocalstorage() || []
            if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
            let homeTagIndex = tagList.findIndex(item => item.name === homeName)
            if (homeTagIndex > 0) {
                let homeTag = tagList.splice(homeTagIndex, 1)[0]
                tagList.unshift(homeTag)
            }
            state.tagNavList = tagList
            setTagNavListInLocalstorage([...tagList])
        },
        // 
        addTag(state, { route, type = 'unshift' }) {
            let router = getRouteTitleHandled(route)
            if (!routeHasExist(state.tagNavList, router)) {
                if (type === 'push') state.tagNavList.push(router)
                else {
                    if (router.name === homeName) state.tagNavList.unshift(router)
                    else state.tagNavList.splice(1, 0, router)
                }
                setTagNavListInLocalstorage([...state.tagNavList])
            }
        },
        closeTag(state, route) {
            let tag = state.tagNavList.filter(item => routeEqual(item, route))
            route = tag[0] ? tag[0] : null
            if (!route) return
            closePage(state, route)
        },
    },

})
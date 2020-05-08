import axios from 'axios'
import base from './base'
import { Message } from 'iview'

axios.defaults.baseURL = base.baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/form-data;charset=UTF-8';

//请求拦截
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token
        token && (config.headers.token = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })

//响应拦截
axios.interceptors.response.use(
    response => {
        if (response.data.code == 200) {
            return response;
        } else {
            Message.error(response.data.msg);
            return Promise.reject(new Error(response.data.msg || 'Error'))
        }
        return response;
    },
    error => {
        Message.error(error.message, 0);
        return Promise.reject(error);
    }
)

/**
 * get请求
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * post请求
 */
export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}
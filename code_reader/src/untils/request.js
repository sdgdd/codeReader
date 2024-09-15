import axios from 'axios';
import {logout} from './common'

// 创建一个 axios 实例
const axiosInstance = axios.create({
    baseURL: '/', // 基础 URL，可以根据需要修改
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 在发送请求之前添加认证信息，比如 JWT token
        const token = localStorage.getItem('token'); // 从 localStorage 中获取 token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 处理请求错误
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {

        // 通过loacalStorage保存token
        const token = response.headers['authorization'];
        if (token) {
            localStorage.setItem('token', token);
        }

        if(response.data.code === 401){
            logout();
        }

        // 对响应数据进行处理
        return response.data; // 直接返回响应数据
    },
    (error) => {
        // 处理响应错误
        if (error.response) {
            // 请求已发送，服务器返回状态码，但状态码非 2xx
            console.error('Response error:', error.response.status, error.response.data);
            switch (error.response.status) {
                case 401:
                    // 未授权，处理重新登录等逻辑
                    console.error('Unauthorized, please log in again.');
                    break;
                case 403:
                    // 无权限访问
                    console.error('Forbidden, you do not have permission to access this resource.');
                    break;
                case 500:
                    // 服务器错误
                    console.error('Server error, please try again later.');
                    break;
                default:
                    console.error('An error occurred:', error.response.status);
            }
        } else if (error.request) {
            // 请求已发送，但没有收到响应
            console.error('No response received:', error.request);
        } else {
            // 其他错误
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

// 封装的请求方法
export const request = (method, url, data = {}, config = {}) => {

    return axiosInstance({
        method,
        url,
        data,
        ...config,
    });
};

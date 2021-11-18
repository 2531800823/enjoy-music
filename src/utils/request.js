import axios from 'axios'
import { Toast } from 'vant'

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
})

service.interceptors.response.use(res => res.data, err => {
    Toast(err);
    return new Promise.reject(err)
})


export default service
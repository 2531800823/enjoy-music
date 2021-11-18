import request from '@/utils/request.js'


// 获取首页数据
export function getHomeList(id = 0) {

    return request({
        url: '/customize/info?id=' + id
    })
}

// 获取首页数据 显示抢购
export function getTimeList(params) {
    return request({
        url: '/customize/timePreference/productList',
        params
    })
}

// 获取首页数据 底部三个
export function getHotList(params) {
    return request({
        url: '/customize/products',
        params
    })
}

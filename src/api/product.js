import request from '@/utils/request.js'


// 获取 商品详情 数据
export function getProduct(id) {
    return request({
        url: '/product/detail?id=' + id
    })
}

// 获取 商品 加入乐园 数据
export function getClub(id) {
    return request({
        url: '/product/club/list?pid=' + id
    })
}

// 获取 商品 品牌音乐 数据
export function getTweets(id) {
    return request({
        url: '/product/tweets?id=' + id
    })
}

// 获取 商品 推荐轮播 数据
export function getRecommend(id) {
    return request({
        url: '/product/recommend?id=' + id
    })
}
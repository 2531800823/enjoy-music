import request from '@/utils/request.js'

// https://api.xlpai.com/product/category

// 获取 分类 数据
export function getCategroy() {
    return request({
        url: '/product/category'
    })
}



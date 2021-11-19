//  封装一个插件


import GunDong from './GunDong.vue'

const install = (vm) => {
    // 注册一个全局组件
    vm.component('GunDong', GunDong)
}


export default {
    install
}


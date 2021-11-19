import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入 vant
import Vant from 'vant';
import 'vant/lib/index.css';

// 引入 px 转 rem
import 'amfe-flexible'

// 引入重置样式
import 'normalize.css'

// 导入自定义插件
import component from '@/components/'


import { Toast } from 'vant';

// 注册自定义插件
Vue.use(component)

Vue.use(Toast);

Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

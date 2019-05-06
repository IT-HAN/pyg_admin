import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './http'
// 引入css静态资源
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.use(ElementUI, {size: 'small'})

Vue.config.productionTip = false

// 在全局下定义axios
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

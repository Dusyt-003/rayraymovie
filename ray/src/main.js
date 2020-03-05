import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import VueAxios from 'vue-axios'


Vue.use(VueAxios,axios)

import { 
  Dialog,
  Field,
  CellGroup,
  Button,
  Icon,
  Tabbar,
  TabbarItem,
  Tab, 
  Tabs,
  Toast,
  Swipe,
  SwipeItem,
  Search
} from 'vant'

import 'lib-flexible/flexible'

Vue
.use(Search)
.use(Swipe)
.use(SwipeItem)
.use(Toast)
.use(Tab)
.use(Tabs)
.use(Tabbar)
.use(TabbarItem)
.use(Dialog)
.use(Field)
.use(CellGroup)
.use(Button)
.use(Icon)

Vue.config.productionTip = false

// 全局前置路由守卫
router.beforeEach((to,from,next) => {
  window.onscroll = null
  next(true)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import '@babel/polyfill'
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/iconfont/iconfont.css'
import App from './App.vue';
import router from './router'
import axios from 'axios';
import store from './store'
import * as $http from './request/index'
import qs from 'qs';

Vue.config.productionTip = false

Vue.prototype.$qs = qs
Vue.prototype.$base64 = require("js-base64").Base64
Vue.prototype.$http = $http
Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.$fileServer=$http.baseUrl+"file/V01";
Vue.prototype.$baseUrlConfig=$http.baseUrl;
//登录认证配置
Vue.prototype.$Authentication = 'cms:cmsAuth'

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

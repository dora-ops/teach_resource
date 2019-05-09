// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import vuex from 'vuex'
import ElementUI from 'element-ui'
import CKEditor from '@ckeditor/ckeditor5-vue'

// import '../src/assets/icomoon/style.css'
// import '../src/assets/css/style.css'
// import '../src/assets/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/base/', // api 的 base_url
    
})
Vue.prototype.$http = instance;

Vue.use(vuex);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use( CKEditor );
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});



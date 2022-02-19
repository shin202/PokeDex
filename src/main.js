import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Bus from './components/index.js'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import Modal from './components/Modal.vue'

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('pacman-loader', PacmanLoader)

Vue.component('modal', Modal)

Vue.use(VueAxios, axios)

Vue.use(Bus)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

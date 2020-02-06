import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

export const rootInstance = new Vue({
  render: h => h(App),
  store
}).$mount('#app');

function sendFn(fn){
  console.info('in main.js')
  console.info(this)
  this.$store.commit('common/sendFn',{fn})
}
export const wrapFn = sendFn.bind(rootInstance);

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);
export const apolloClient = new ApolloClient({
  uri:'http://localhost:4000'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});


Vue.config.productionTip = false

export const rootInstance = new Vue({
  render: h => h(App),
  apolloProvider,
  store
}).$mount('#app');

function sendFn(fn){
  console.info('in main.js')
  console.info(this)
  this.$store.commit('common/sendFn',{fn})
}
export const wrapFn = sendFn.bind(rootInstance);

import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import getStore from './store.js'
import App from './App.vue'

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.config.devtools = true

const store = getStore();

import 'vuetify/dist/vuetify.min.css'
import ContactList from "./components/ContactList.vue"

const vueInstance = new Vue({
	el: "#app",
	store,
	components: { App },
	render: function(h) {
		return h(App);
	}
});
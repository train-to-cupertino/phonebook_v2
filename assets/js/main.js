import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import getStore from './store.js'

import App from './App.vue'

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.config.devtools = true

const store = getStore();

import 'vuetify/dist/vuetify.min.css'

import Main from "./Main.vue"
import CreateContact from "./components/CreateContact.vue"
import UpdateContact from "./components/UpdateContact.vue"

const router = new VueRouter({
	routes: [
		{ path: '/', 					name: 'Main', 			component: Main },
		{ path: '/create-contact', 		name: 'CreateContact', 	component: CreateContact },
		{ path: '/update-contact/:id', 	name: 'UpdateContact', 	component: UpdateContact },
	]
})

const vueInstance = new Vue({
	el: "#app",
	store,
	router,
	components: { App },
	render: function(h) {
		return h(App);
	}
});
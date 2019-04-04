import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

import getStore from './store.js'
import App from './App.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.config.devtools = true

const store = getStore();

import 'vuetify/dist/vuetify.min.css'
import ContactList from "./components/ContactList.vue"

const router = new VueRouter({
    routes: [
        { path: '/', component: ContactList },
        //{ path: '/addContact', component: AddContact },
        //{ path: '/editContact', component: EditContact },
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
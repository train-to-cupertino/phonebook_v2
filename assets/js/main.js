import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import getStore from './store.js'
import App from './App.vue'


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(VueRouter)


const store = getStore();

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
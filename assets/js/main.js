/**
	Структура приложения
	--------------------
	App (Приложение)
	 |_ Main (Главная страница со списком контактов)
	 |_ CreateContact (Страница создания контакта)
	 |_ UpdateContact (Страница редактирования контакта)
	 
*/
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import getStore from './store.js'

import App from './App.vue'	// Компонент "Приложение"

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.config.devtools = true

const store = getStore();

import 'vuetify/dist/vuetify.min.css'

import Main from "./Main.vue"								// Главная страница со списком контактов
import CreateContact from "./components/CreateContact.vue"	// Страница создания контакта
import UpdateContact from "./components/UpdateContact.vue"	// Страница редактирования контакта

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
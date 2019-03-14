<template>
	<div>
		<h1>Phonebook</h1>
		<router-view></router-view>
	</div>
</template>

<script>
import * as MUTATION from "./misc/mutation-types.js"
import ContactList from "./components/ContactList.vue"

export default {
	name: "App",

	components: {
		ContactList
    },

	data() {
	    return {

        }
	},

	created() {
		// Получаем список контактов
		this.$store.dispatch('getContactList');
	},

	methods: {

	}
}
</script>

<style>

</style>
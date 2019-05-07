<template>
	<ContactList />
</template>

<script>
import ContactList from "./components/ContactList.vue"
import Phones from "./components/Phones.vue"

export default {
	name: "App",

	components: {
		ContactList,
		Phones
	},

	data() {
		return {
			isAddContactFormShown: false,	// Отображать ли форму добавления контакта
			addedContactName: null,			// Имя добавляемого контакта
			addedContactPhone: null,		// Телефон добавляемого контакта
		}
	},
	
	computed: {
		rules: function() {
			return this.$store.state.rules
		}
	},
	
	created() {
		// Получаем список контактов
		//this.$store.dispatch('getContactList');
		
		let _this = this;
		
		// Прослушка события отображения формы добавления контакта
		this.$root.$on('showAddContactForm', function(contact_id) {
			_this.isAddContactFormShown = true;
		});
	},

	methods: {
		// Открыть форму добавления контакта
		showAddContactForm() {
			this.isAddContactFormShown = true
		},		
	},
}
</script>

<style>

</style>
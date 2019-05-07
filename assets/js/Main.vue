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
		// Правила валидации
		rules: function() {
			return this.$store.state.rules
		}
	},
	
	created() {
		let _this = this;
		
		// Слушаем событие отображения формы добавления контакта
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
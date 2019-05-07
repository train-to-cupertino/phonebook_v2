<template>
	<div class="text-xs-center" style="width: 165px;">
		<v-btn small flat icon color="green accent-4" @click="showAddPhoneForm">
			<v-icon small>phone</v-icon>
		</v-btn>
		<v-btn small flat icon color="orange accent-3" @click="editItem(id)">
			<v-icon small>edit</v-icon>
		</v-btn>
		<v-btn small flat icon color="red darken-1" @click="deleteContact(id)">
			<v-icon small>delete</v-icon>
		</v-btn>
	</div>
</template>

<script>
export default {
	name: "ContactActions",
	
	props: ["id"],	// ID контакта
	
	methods: {
		// Редактировать контакт
		editItem: function(item) {
			// Переходим на страницу редактирования
			this.$router.push({ path: `/update-contact/${item}` })
		},
		
		// Удалить контакт
		deleteContact: function(item) {
			if (confirm("Действительно удалить контакт?")) 
				// При подтверждении - выполняем действие "Удалить контакт". Параметр: ID
				this.$store.dispatch('deleteContact', this.id);
		},
		
		// Показать форму добавления телефона к контакту
		showAddPhoneForm: function() {
			this.$root.$emit('showAddPhoneForm', this.id);
		}
	}
}
</script>

<style>

</style>
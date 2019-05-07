<template>
	<span>
		<v-icon small class="ml-1" @click="enableEditMode">edit</v-icon>
		<v-icon small class="ml-1" @click="deletePhone">delete</v-icon>	
	</span>
</template>

<script>
export default {
	name: "PhoneActions",
	
	props: [
		"id", // ID телефона
		"phone_owner" // Контакт, которому принадлежит телефон
	],
	
	methods: {
		// Включить режим редактирования
		enableEditMode: function() {
			this.$root.$emit('enableEditMode', this.id);
		},
	
		// Удалить телефон
		deletePhone: function() {
			if (confirm("Действительно удалить телефон " + this.getPhone() + " контакта " + this.phone_owner.name + "? ")) 
				this.$store.dispatch('deletePhone', { phone_id: this.id, contact_id: this.phone_owner.id });
		},
		
		// Номер телефона
		getPhone() {
			if (!this.id)
				return
				
			return this.$store.getters.phoneById(this.id);
		}
	}
}
</script>

<style></style>
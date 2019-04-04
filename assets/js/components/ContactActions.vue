<template>
	<div style="width: 75px;">
		<v-icon small class="mr-2" @click="showAddPhoneForm">phone</v-icon>
		<v-icon small class="mr-2" @click="editItem(id)">edit</v-icon>
		<v-icon small @click="deleteContact(id)">delete</v-icon>
	</div>	
</template>

<script>
export default {
	name: "ContactActions",
	
	props: ["id"],
	
	methods: {
		editItem: function(item) {
			alert('editItem ' + JSON.stringify(item))
		},
		
		deleteContact: function(item) {
			// TODO: имя контакта в сообщении
			// TODO: модальное окно вместо confirm
			if (confirm("Действительно удалить контакт?")) 
				this.$store.dispatch('deleteContact', this.id);
		},
		
		showAddPhoneForm: function() {
			this.$root.$emit('showAddPhoneForm', this.id);
		}
	}	
}
</script>

<style>

</style>
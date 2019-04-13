<template>
	<span>
		<v-icon small class="ml-1" @click="enableEditMode">edit</v-icon>
		<v-icon small class="ml-1" @click="deletePhone">delete</v-icon>	
	</span>
</template>

<script>
export default {
	name: "PhoneActions",
	
	props: ["id", "phone_owner"],
	
	methods: {
		enableEditMode: function() {
			this.$root.$emit('enableEditMode', this.id);
		},
	
		deletePhone: function() {
			// TODO: модальное окно вместо confirm
			if (confirm("Действительно удалить телефон " + this.getPhone() + " контакта " + this.phone_owner.name + "? ")) 
				this.$store.dispatch('deletePhone', { phone_id: this.id, contact_id: this.phone_owner.id });
		},
		
		getPhone() {
			if (!this.id)
				return
				
			return this.$store.getters.phoneById(this.id);
		}
	}
}
</script>

<style>
div.delete_phone {
	color: #b00;
	cursor: pointer;
}
</style>
<template>
	<div>
		<span v-show="!isEditing" @click="!isLoading ? isEditing = true : 1">
			{{ data.name }}
		</span>
		<span v-show="isEditing">
			<v-text-field 
				:value="name" 
				@change="v => name = v"
				append-outer-icon="send" 
				@click:append-outer="isEditing = false" 
				@keyup.enter="isEditing = false"
			></v-text-field>
		</span>
		<v-progress-circular indeterminate v-if="data.isLoading" color="blue"></v-progress-circular>		
	</div>
</template>

<script>
import ContactActions from "./ContactActions.vue"

export default {
	name: "Contact",
	
	components: { ContactActions },
	
	props: ["data"],
	
	created() {
		let _this = this
	
		// При прослушивании события "Включить режим редактирования"
		this.$root.$on('enableEditingMode', function(id) {
			if (_this.data.id == id)
				_this.isEditing = true
		});
	},
	
	data() {
		return {
			isEditing: false, // Режим редактирования
		}
	},
	
	computed: {
		// Имя контакта
		name: {
			get() {
				if (this.data && this.data.id)
					if (this.$store.getters.contactById(this.data.id))
						return this.$store.getters.contactById(this.data.id).name;
				
				return null;
			},
			
			set(value) {
				if (this.data && this.data.id) {
					this.isEditing = false;
					this.$store.dispatch('changeContactName', { id: this.data.id, name: value });
				}
			}
		}
	},
}
</script>

<style>

</style>
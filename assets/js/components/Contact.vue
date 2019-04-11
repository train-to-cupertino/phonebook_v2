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
			></v-text-field>			
			<!--<v-btn small color="primary" @click="isEditing = false">OK</v-btn>-->
			<!-- TODO: выключать редактирование даже если не изменилась модель -->
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
	
	data() {
		return {
			isEditing: false,
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
	
	methods: {
		/*
		enableEdit: function() {
			this.$store.state.contacts.map(x => x.isEditing = false);		
		
			isEditing = true;
		}
		*/
	}
}
</script>

<style>

</style>
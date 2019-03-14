<template>
	<tr>
		<td>
			<span v-show="!isEditing" @click="!isLoading ? isEditing = true : 1 == 1">
				{{ data.name }}
			</span>
			<span v-show="isEditing">
				<input type="text" v-model.lazy="name" @blur="onBlur" /><input type="button" value="Отмена" @click="isEditing = false" />
			</span>
			<span v-if="data.isLoading">
				<img src="/img/ajax_loader.gif" />
			</span>
		</td>
		<td><ContactActions :id="data.id" /></td>
		<td><Phones :id="data.id" /></td>
	</tr>	
</template>

<script>
import ContactActions from "./ContactActions.vue"
import Phones from "./Phones.vue"

export default {
	name: "Contact",
	
	components: { ContactActions, Phones },
	
	props: ["data"],
	
	data() {
		return {
			isEditing: false,
		}
	},
	
	computed: {
		name: {
			get() {
				if (this.data && this.data.id)
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
		onBlur: function() {
			console.log('onBlur');
		}
	}
}
</script>

<style>

</style>
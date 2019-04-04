<template>
	<div class="phones">
		<Phone v-for="phone in owner.phones" :id="phone.id" />
		<div v-if="!owner.phones || Object.keys(owner.phones).length < 1">
			<v-btn dark small color="green" @click="showAddPhoneForm">
				<v-icon>add_circle</v-icon>
				<span class="ml-2">Добавить телефон</span>
			</v-btn>
		</div>
	</div>
</template>

<script>
import Phone from "./Phone.vue"

export default {
	name: "Phones",
	
	components: { Phone },
	
	props: ["id"],
	
	computed: {
		owner: {
			get() {
				return this.$store.getters.contactById(this.id);
			}
		}
	},
	
	methods: {
		showAddPhoneForm: function() {
			//alert(this.owner.id);
			this.$root.$emit('showAddPhoneForm', this.owner.id);
			//this.$store.dispatch('addPhone', { contact_id: owner.id, phone: "" });
		}
	}
}
</script>

<style>

</style>
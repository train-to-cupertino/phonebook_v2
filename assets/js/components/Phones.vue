<template>
	<div v-if="owner || !owner.phones || !Object.keys(owner.phones).length > 0">
		<Phone v-for="phone in owner.phones" :id="phone.id" :withActions="withActions" />
		<v-btn dark small color="green" @click="showAddPhoneForm" v-if="withActions">
			<v-icon>add_circle</v-icon>
			<span class="ml-2">Добавить телефон</span>
		</v-btn>
	</div>

</template>

<script>
import Phone from "./Phone.vue"

export default {
	name: "Phones",
	
	components: { Phone },
	
	props: ["id", "withActions"],
	
	created() {
		if (!this.owner)
			this.$router.push('/')
	},
	
	computed: {
		// Контакт, которому принадлежит данный телефон
		owner: {
			get() {
				return this.$store.getters.contactById(this.id);
			}
		}
	},
	
	methods: {
		// Показать форму добавления еще одного телефона к контакту
		showAddPhoneForm: function() {
			console.log('showAddPhoneForm', this.owner.id);
			this.$root.$emit('showAddPhoneForm', this.owner.id);
		}
	}
}
</script>

<style></style>
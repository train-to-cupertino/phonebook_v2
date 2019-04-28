<template>
	<div v-if="owner">
		<Phone v-if="owner.phones && Object.keys(owner.phones).length > 0" v-for="phone in owner.phones" :id="phone.id" :withActions="withActions" />
		<div v-if="Object.keys(owner.phones).length == 0 || withActions">
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
			this.$root.$emit('showAddPhoneForm', this.owner.id);
		}
	}
}
</script>

<style></style>
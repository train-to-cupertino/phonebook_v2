<template>
	<v-chip dark color="blue">
		<span>{{phone}}</span>
		<PhoneActions v-if="withActions" />
	</v-chip>
</template>

<script>
export default {
	name: "Phone",
	
	props: ["id", "withActions"],
	
	created() {
		let _this = this;
	},
	
	data() {
		return {
			
		}
	},
	
	computed: {
		phone: {
			get() {
				return this.$store.getters.phoneById(this.id);
			}
		},
		
		owner: {
			get() {
				return this.$store.getters.contactByPhoneId(this.id);
			}
		},
	}
}
</script>

<style>

</style>
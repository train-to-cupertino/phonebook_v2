<template>
	<div class="phone_container">
		<div class="phone">
			{{phone}}
		</div>
		<div>
			<PhoneActions :id="id"/>
		</div>
	</div>
</template>

<script>
import PhoneActions from "./PhoneActions.vue"

export default {
	name: "Phone",
	
	components: { PhoneActions },
	
	props: ["id"],
	
	computed: {
		phone: {
			get() {
				return this.$store.getters.phoneById(this.id);
			}
		}
	}
}
</script>

<style>
div.phone_container div {
	display: inline-block;
	margin: 0 2px;
}
</style>
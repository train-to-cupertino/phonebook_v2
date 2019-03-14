<template>
	<div class="phones">
		<Phone v-for="phone in owner.phones" :id="phone.id" />
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
	}
}
</script>

<style>

</style>
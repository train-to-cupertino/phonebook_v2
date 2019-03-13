<template>
	<div>
		{{contacts}}
	</div>
</template>

<script>
export default {
	name: "ContactList",

	computed: {
        contacts: {
			get() {
				return this.$store.state.contacts;
			}
        }
	},
}
</script>

<style>

</style>
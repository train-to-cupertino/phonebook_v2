<template>
	<div class="phone_actions">
		<div class="delete_phone">X</div>
	</div>
</template>

<script>
export default {
	name: "PhoneActions",
	
	props: ["id"],
}
</script>

<style>
div.delete_phone {
	color: #b00;
	cursor: pointer;
}
</style>
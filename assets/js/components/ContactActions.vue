<template>
	<div class="contact_actions">
		<div :data-id="id">Доб.тел.</div>
		<div>Ред.</div>
		<div>Уд.</div>
	</div>
</template>

<script>
export default {
	name: "ContactActions",
	
	props: ["id"],
}
</script>

<style>
div.contact_actions div {
	display: inline-block;
	border: 1px solid #1a2e06;
	margin: 0 2px;
	cursor: pointer;
}
</style>
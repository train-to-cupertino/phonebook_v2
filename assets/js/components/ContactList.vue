<template>
	<div>
		<div id="contacts_container">
			<table id="contacts_table">
				<tr>
					<th>Наименование</th>
					<th>Действия</th>
					<th>Телефоны</th>
				</tr>
				<Contact v-for="contact in contacts" :data="contact"/>
			</table>
		</div>		
		<div class="debug">
			{{contacts}}
		</div>
	</div>
</template>

<script>
import Contact from "./Contact.vue"

export default {
	name: "ContactList",
	
	components: {
		Contact
	},

	computed: {
        contacts: {
			get() {
				return this.$store.state.contacts;
			}
        }
	},
}
</script>

<style scoped>
.debug {
	font-size: 8px;
}
</style>
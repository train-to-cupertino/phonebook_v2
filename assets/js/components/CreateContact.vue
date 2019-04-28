<template>
	<div>
		<v-card>
			<v-card-title>
				Добавить контакт
			</v-card-title>
			<v-card-text>
				<v-text-field v-model="addedContactName" label="Имя" :rules="[rules.required]"></v-text-field>
				<v-text-field v-model="addedContactPhone" label="Телефон" mask="+7 (###) ### - ## - ##" :rules="[rules.required, rules.phone]"></v-text-field>
			</v-card-text>
			<v-card-actions>
				<v-btn color="primary" dark @click="addContact">Сохранить</v-btn>
				<v-btn color="primary" flat @click="cancelAddContact">Вернуться</v-btn>
			</v-card-actions>
		</v-card>		
	</div>
</template>

<script>
export default {
	data() {
		return {
			addedContactName: null,		// Имя добавляемого контакта
			addedContactPhone: null,	// Телефон добавляемого контакта
		}
	},
	
	computed: {
		rules: function() {
			return this.$store.state.rules
		}
	},

	methods: {
		// Отменить добавление контакта
		cancelAddContact: function() {
			this.addedContactName = null;
			this.addedContactPhone = null;
			this.$router.push('/')
		},
		
		
		// Добавить контакт
		addContact: function() {
			if (this.addedContactName && (this.rules.phone(this.addedContactPhone) === true) && this.addedContactPhone) {
				this.addedContactPhone = this.addedContactPhone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 - $4 - $5');
				this.$store.dispatch('addContact', { name: this.addedContactName, phone: this.addedContactPhone });
				this.addedContactName = null;
				this.addedContactPhone = null;
				this.$router.push('/');
			}
		},	
	},
}
</script>

<style>

</style>
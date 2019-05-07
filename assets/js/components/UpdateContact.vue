<template>
	<div>
		<v-card>
			<v-card-title>
				Редактировать контакт
			</v-card-title>
			<v-card-text>
				<v-text-field v-model="name" label="Имя" :rules="[rules.required]"></v-text-field>
				<Phones :withActions="true" :id="$route.params.id" />
			</v-card-text>
			<v-card-actions>
				<v-btn color="primary" dark @click="updateContact">Сохранить</v-btn>
				<v-btn color="primary" flat @click="cancelUpdateContact">Вернуться</v-btn>
			</v-card-actions>
		</v-card>		
	</div>
</template>

<script>
import Phones from "./Phones.vue"

export default {
	data() {
		return {
			updatedContactName: null,		// Имя добавляемого контакта
		}
	},
	
	components: { Phones },
	
	computed: {
		rules: function() {
			return this.$store.state.rules
		},
		
		// Имя контакта
		name: {
			get() {
				let id = this.$route.params.id;
				//alert(id);
				//console.log(id);
				//console.log(this.$store.state.contacts);
				if (id)
					if (this.$store.getters.contactById(id))
						return this.$store.getters.contactById(id).name;
				
				return null;
			},
			
			set(value) {
				let id = this.$route.params.id;
				
				if (id) {
					this.isEditing = false;
					this.$store.dispatch('changeContactName', { id: id, name: value });
				}
			}
		}
	},

	methods: {
		// Отменить обновл контакта
		cancelUpdateContact: function() {
			this.$router.push('/')
		},
		
		
		// Добавить контакт
		updateContact: function() {
			this.$router.push('/')
		},	
	},
}
</script>

<style>

</style>
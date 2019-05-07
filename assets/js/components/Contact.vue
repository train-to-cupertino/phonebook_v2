<template>
	<div>
		<span v-show="!isEditing" @click="!isLoading ? isEditing = true : 1">
			{{ data.name }}
		</span>
		<span v-show="isEditing">
			<v-text-field 
				:value="name" 
				@change="v => name = v"
				append-outer-icon="send" 
				@click:append-outer="isEditing = false" 
				@keyup.enter="isEditing = false"
			></v-text-field>
		</span>
		<v-progress-circular indeterminate v-if="data.isLoading" color="blue"></v-progress-circular>		
	</div>
</template>

<script>
import ContactActions from "./ContactActions.vue" // Операции с контактом (Добавить телефон, Редактировать, Удалить)

export default {
	name: "Contact",
	
	components: { ContactActions },
	
	props: ["data"],	// Данные контакта
	
	created() {
		let _this = this
	
		// При прослушивании события "Включить режим редактирования"
		this.$root.$on('enableEditingMode', function(id) {
			if (_this.data.id == id)
				_this.isEditing = true
		});
	},
	
	data() {
		return {
			isEditing: false, // Режим редактирования
		}
	},
	
	computed: {
		// Имя контакта
		name: {
			get() {
				// Если ID задан
				if (this.data && this.data.id)
					// Если найден контакт с заданным ID
					if (this.$store.getters.contactById(this.data.id))
						// Возвращаем имя контакта
						return this.$store.getters.contactById(this.data.id).name;
				
				return null;
			},
			
			set(value) {
				// Если ID задан
				if (this.data && this.data.id) {
					// Режим редактирования выкл.
					this.isEditing = false;
					
					// Выполнить действие "Изменить имя контакта". Параметры: ID, новое имя
					this.$store.dispatch('changeContactName', { id: this.data.id, name: value }); 
				}
			}
		}
	},
}
</script>

<style>

</style>
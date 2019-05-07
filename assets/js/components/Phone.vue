<template>
	<v-chip dark color="blue" v-if="!isEditing">
		<span>{{phone}}</span>
		
		<PhoneActions v-if="withActions" :id="id" :phone_owner="owner" />
	</v-chip>
	<span v-else>
		<v-text-field 
			:value="phone" 
			@change="v => phone = v" 
			append-outer-icon="send" 
			@click:append-outer="isEditing = false" 
			@keyup.enter="isEditing = false" 
			mask="+7 (###) ### - ## - ##" 
			:rules="[rules.required, rules.phone]" 
		></v-text-field>
	</span>
</template>

<script>
import PhoneActions from "./PhoneActions.vue" // Действия с телефоном: Редактировать, Удалить

export default {
	name: "Phone",
	
	components: { PhoneActions },
	
	props: ["id", "withActions"],
	
	created() {
		let _this = this;
	
		// Слушаем событие "Включение режима редактирования"
		this.$root.$on('enableEditMode', function(id) {
			if (id == _this.id)
				_this.isEditing = true;
		})
	},
	
	data() {
		return {
			isEditing: false, // Режим редактирования вкл./выкл.
		}
	},
	
	computed: {
		// Телефон
		phone: {
			get() {
				return this.$store.getters.phoneById(this.id);
			},
			set(value) {
				value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 - $4 - $5');
				this.$store.dispatch('editPhone', { id: this.id, phone: value, contact: this.owner })
			}
		},
		
		// Контакт, которому принадлежит телефон
		owner: {
			get() {
				return this.$store.getters.contactByPhoneId(this.id);
			}
		},
		
		// Правила валидации
		rules: function() {
			return this.$store.state.rules
		}
	},
}
</script>

<style>

</style>
<template>
	<v-chip dark color="blue" v-if="!isEditing">
		<span>{{phone}}</span>
		
		<PhoneActions :id="id" :phone_owner="owner" />
	</v-chip>
	<span v-else>
		<v-text-field :value="phone" @change="v => phone = v"></v-text-field>			
		<v-btn small color="primary" @click="isEditing = false">OK</v-btn> <!-- TODO: выключать редактирование даже если не изменилась модель -->
	</span>			
</template>

<script>
import PhoneActions from "./PhoneActions.vue"

export default {
	name: "Phone",
	
	components: { PhoneActions },
	
	props: ["id"],
	
	created() {
		let _this = this;
	
		this.$root.$on('enableEditMode', function(id) {
			//console.log(id, _this.id);
			if (id == _this.id)
				_this.isEditing = true;
		})
	},
	
	data() {
		return {
			isEditing: false,
		}
	},
	
	computed: {
		phone: {
			get() {
				return this.$store.getters.phoneById(this.id);
			},
			set(value) {
				this.$store.dispatch('editPhone', { id: this.id, phone: value, contact: this.owner })
			}
		},
		
		owner: {
			get() {
				return this.$store.getters.contactByPhoneId(this.id);
			}
		}
	},
	
	methods: {
		
	}
}
</script>

<style>

</style>
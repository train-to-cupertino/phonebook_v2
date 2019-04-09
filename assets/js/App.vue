<template>
	<v-app id="inspire">
		<v-dialog v-model="isAddPhoneFormShown" max-width="500px">
			<v-card>
				<v-card-title>
					{{ contactWhichPhoneIsEdited ? getContact(contactWhichPhoneIsEdited).name + " - ": "" }} Добавить телефон
				</v-card-title>
				<v-card-text>
					<v-text-field v-model="addedPhone" label="Телефон" mask="+7 (###) ### - ## - ##" :rules="[rules.required, rules.phone]"></v-text-field>
					<v-btn color="primary" dark @click="addPhone">Добавить</v-btn>
				</v-card-text>
				<v-card-actions>
					<v-btn color="primary" flat @click="cancelAddPhone">Отмена</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="isAddContactFormShown" max-width="500px">
			<v-card>
				<v-card-title>
					Добавить контакт
				</v-card-title>
				<v-card-text>
					<v-text-field v-model="addedContactName" label="Имя"></v-text-field>
					<v-text-field v-model="addedContactPhone" label="Телефон"></v-text-field>
					<v-btn color="primary" dark @click="addContact">Добавить</v-btn>
				</v-card-text>
				<v-card-actions>
					<v-btn color="primary" flat @click="cancelAddContact">Отмена</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>		
	
		<v-toolbar dark color="blue">
			<v-toolbar-side-icon @click.stop="showDrawer = !showDrawer"></v-toolbar-side-icon>		
			<v-toolbar-title class="mr-3">Контакты</v-toolbar-title>
			<!--<v-divider class="mx-2" inset vertical></v-divider>-->
			<v-btn dark small color="green" @click="showAddContactForm">
				<v-icon>add_circle</v-icon>
				<span class="ml-2">Добавить контакт</span>
			</v-btn>
			<v-spacer></v-spacer>			
			<v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details></v-text-field>
		</v-toolbar>
		
			<v-navigation-drawer v-model="showDrawer" fixed clipped app temporary>
	
				<v-list class="pa-1" dense>
					<v-list-tile :key="contacts" @click="">
						<v-list-tile-action>
							<v-icon>group</v-icon>
						</v-list-tile-action>
	
						<v-list-tile-content>
							<v-list-tile-title>Контакты</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
			
					<v-list-tile :key="contact_add" @click="showAddContactForm">
						<v-list-tile-action>
							<v-icon>person_add</v-icon>
						</v-list-tile-action>
	
						<v-list-tile-content>
							<v-list-tile-title>Добавить контакт</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>			
				</v-list>
			</v-navigation-drawer>		
	
		<v-container grid-list-md text-xs-center>
			<v-layout row wrap>
				<v-flex xs2>
				</v-flex>
				<v-flex xs8>

					<!--
					<v-dialog v-model="dialog" max-width="500px">
						<template v-slot:activator="{ on }">
						<v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
						</template>
						<v-card>
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>
				
						<v-card-text>
							<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12 sm6 md4>
								<v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md4>
								<v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md4>
								<v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md4>
								<v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md4>
								<v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
								</v-flex>
							</v-layout>
							</v-container>
						</v-card-text>
				
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
							<v-btn color="blue darken-1" flat @click="save">Save</v-btn>
						</v-card-actions>
						</v-card>
					</v-dialog>
					-->
					
					<ContactList :search="search" />
				</v-flex>
				<v-flex xs2>
				</v-flex>				
			</v-layout>
		</v-container>

		<div>
			Оформление: редактирование телефона<br/>
			Оформление: редактирование контакта<br/>
			Действие - Редактирование контакта (обработчик)<br/>
			Drawer под toolbar'ом<br/>
			Рефакторинг компонентов<br/>
			Обработка ошибок<br/>
		</div>
	</v-app>
<!--
	<div>
		<h1>Phonebook</h1>
		<router-view></router-view>
	</div>
-->
</template>

<script>
import * as MUTATION from "./misc/mutation-types.js"
import ContactList from "./components/ContactList.vue"
import Phones from "./components/Phones.vue"

export default {
	name: "App",

	components: {
		ContactList,
		Phones
	},

	data() {
		return {
			bottomNav: "contacts",
			showDrawer: false,
			
			// Контакт, к которому добавляется телефон (при открытой форме добавления телефона)
			contactWhichPhoneIsEdited: null,
			
			isAddContactFormShown: false,
			addedContactName: null,
			addedContactPhone: null,
			
			isAddPhoneFormShown: false,
			addedPhone: null,
			
			search: '',
			
			rules: {
				required: value => !!value || 'Поле не заполнено',
				phone: value => /^7\d{10}$/.test(value) || 'Введите 10 цифр телефона',
			}
		}
	},

	created() {
		// Получаем список контактов
		this.$store.dispatch('getContactList');
		
		let _this = this;
		
		this.$root.$on('showAddPhoneForm', function(contact_id) {
			_this.contactWhichPhoneIsEdited = contact_id;
			_this.isAddPhoneFormShown = true;
		});
		
		this.$root.$on('showAddContactForm', function(contact_id) {
			_this.isAddContactFormShown = true;
		});
	},

	methods: {
		cancelAddPhone: function() {
			this.contactWhichPhoneIsEdited = null;
			this.isAddPhoneFormShown = false;
		},
		
		addPhone: function() {
			//alert('addPhone');
			// TODO: addPhone method
			// contact = null, dispatch addPhone, isAddPhoneFormShown = false
			if (this.addedPhone && (this.rules.phone(this.addedPhone) === true) && this.contactWhichPhoneIsEdited) {
				this.addedPhone = this.addedPhone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 - $4 - $5');
				this.$store.dispatch('addPhone', { contact_id: this.contactWhichPhoneIsEdited, phone: this.addedPhone });
				this.contactWhichPhoneIsEdited = null;
				this.addedPhone = null;
				this.isAddPhoneFormShown = false;
			}
		},		
		
		
		cancelAddContact: function() {
			this.isAddContactFormShown = false;
			this.addedContactName = null;
			this.addedContactPhone = null;
		},
		
		addContact: function() {
			//alert('addPhone');
			// TODO: addPhone method
			// contact = null, dispatch addPhone, isAddPhoneFormShown = false
			if (this.addedContactName && this.addedContactPhone) {
				this.$store.dispatch('addContact', { name: this.addedContactName, phone: this.addedContactPhone });
				this.addedContactName = null;
				this.addedContactPhone = null;
				this.isAddContactFormShown = false;
			}
		},
		
		
		getContact(id) {
			return this.$store.getters.contactById(id);
		},
		
		showAddContactForm() {
			this.isAddContactFormShown = true
		}
	},
}
</script>

<style>

</style>
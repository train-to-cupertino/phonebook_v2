<template>
	<v-app id="phonebook_app">
	
		<v-toolbar dark color="blue">
			<v-toolbar-side-icon @click.stop="showDrawer = !showDrawer"></v-toolbar-side-icon>		
			<v-toolbar-title class="mr-3">Контакты</v-toolbar-title>
			<v-btn dark small color="green" @click="$router.push('/create-contact')">
				<v-icon>add_circle</v-icon>
				<span class="ml-2">Добавить контакт</span>
			</v-btn>
			<v-spacer></v-spacer>			
			<v-text-field v-model="search" append-icon="search" label="Поиск" single-line hide-details></v-text-field>
		</v-toolbar>
		
		<v-dialog v-model="isAddPhoneFormShown" max-width="500px">
			<v-card>
				<v-card-title>
					{{ getContact(contactWhichPhoneIsEdited) ? getContact(contactWhichPhoneIsEdited).name + " - ": "" }} Добавить телефон
				</v-card-title>
				<v-card-text>
					<v-text-field 
						v-model="addedPhone" 
						label="Телефон" 
						mask="+7 (###) ### - ## - ##" 
						:rules="[rules.required, rules.phone]" 
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-btn color="primary" dark @click="addPhone">Добавить</v-btn>
					<v-btn color="primary" flat @click="cancelAddPhone">Отмена</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		
		<v-navigation-drawer v-model="showDrawer" fixed clipped app temporary>
			<v-list class="pa-1" dense>
				<v-list-tile @click="$router.push('/')">
					<v-list-tile-action>
						<v-icon>group</v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title>Контакты</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
		
				<v-list-tile :key="contact_add" @click="$router.push('/create-contact')">
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
				<v-flex xs12>
					<router-view></router-view>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script>
import * as MUTATION from "./misc/mutation-types.js"

export default {
	name: "App",

	data() {
		return {
			showDrawer: false,		// Отображать боковое меню	
			
			// Контакт, к которому добавляется телефон (при открытой форме добавления телефона)
			contactWhichPhoneIsEdited: null,
			
			isAddPhoneFormShown: false,	// Отображать ли форму добавления телефона к контакту
			addedPhone: null, 			// Добавляемый к контакту телефон			
		}
	},
	
	created() {
		let _this = this;
	
		// Прослушка события отображения формы добавления телефона к контакту
		this.$root.$on('showAddPhoneForm', function(contact_id) {
			_this.contactWhichPhoneIsEdited = contact_id;
			_this.isAddPhoneFormShown = true;
		});	
	},
	
	computed: {
		search: {
			get() {
				return this.$store.state.search;
			},
			set(value) {
				// Изменение условия поиска
				this.$store.commit(MUTATION.SET_SEARCH_CONDITION, value)
			}
		},
		
		rules: {
			get() {
				return this.$store.state.rules
			}
		}
	},
	
	methods: {
		// Получить контакт по id
		getContact(id) {
			return this.$store.getters.contactById(id);
		},	
		
		// Отменить добавление телефона к контакту (закрыть форму)
		cancelAddPhone: function() {
			this.contactWhichPhoneIsEdited = null;
			this.isAddPhoneFormShown = false;
			this.addedPhone = false;
		},
		
		// Добавить телефон к контакту
		addPhone: function() {
			if (this.addedPhone && (this.rules.phone(this.addedPhone) === true) && this.contactWhichPhoneIsEdited) {
				this.addedPhone = this.addedPhone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 - $4 - $5');
				this.$store.dispatch('addPhone', { contact_id: this.contactWhichPhoneIsEdited, phone: this.addedPhone });
				this.contactWhichPhoneIsEdited = null;
				this.addedPhone = null;
				this.isAddPhoneFormShown = false;
			}
		},				
	}
	
	
}
</script>
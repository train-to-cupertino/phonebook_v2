import Vue from 'vue'
import Vuex from 'vuex'
import * as MUTATION from './misc/mutation-types.js'
//import * as APIURL from './misc/apiurls.js'
import API_URL from './misc/apiurls.js'

const Http = new Vue;

let storeInstance = null;

export default () => {
	if (!storeInstance) 
		storeInstance = new Vuex.Store({
			state: {
				contacts: {}
			},
			
			getters: {
				// Возвращает контакт по id
				contactById: state => index => state.contacts[index],
				
				// Возвращает телефон по id
				phoneById: state => index => {
					if (state.contacts) {
						for(let contact_id in state.contacts) {
							let contact = state.contacts[contact_id];
							
							if (contact.phones) {
								for(let phone_id in contact.phones) {
									let phone = contact.phones[phone_id];
									
									if (phone.id == index)
										return phone.phone;
								}						
							}
						}	
					}
					
					//return '---';
				},
			},


			mutations: {
				// Загрузка списка контактов с сервера
				[MUTATION.LOAD_CONTACT_LIST] (state, data) {
					state.contacts = data;
					
					// Добавляем состояния загрузки контактов и телефонов
					// и устанавливаем их в false
					for(let contact_id in state.contacts) {
						let contact = state.contacts[contact_id];
						
						state.contacts[contact_id].isLoading = false;
						//state.contacts[contact_id].isEditing = false;
						
						if (contact.phones) {
							for(let phone_id in contact.phones) {
								//let phone = contact.phones[phone_id];
								
								state.contacts[contact_id].phones[phone_id].isLoading = false;
								//state.contacts[contact_id].phones[phone_id].isEditing = false;
							}						
						}
					}
				},
				
				// Изменение имени контакта
				[MUTATION.CHANGE_CONTACT_NAME] (state, data) {
					state.contacts[data.id].name = data.name;
					
					state.contacts[data.id].isLoading = false;
				}
			},
			
			
			actions: {
				// Возвращает список контактов
				getContactList(context) {
					Http.$http.get(API_URL, { params: { action: "list" }}).then(response => {
						if (response.ok && response.status == 200) {
							if (response.body && response.body.result == "success") {
								context.commit(MUTATION.LOAD_CONTACT_LIST, response.body.data);
								return;
							}
						}
						
						//context.commit(MUTATION.SET_CONTACT_LIST_ERROR, response);
					});
				},
				
				// Изменяет имя контакта
				changeContactName(context, data) {
					context.state.contacts[data.id].isLoading = true;
				
					Http.$http.get(API_URL, { params: { action: "update_contact", contact_id: data.id, name: data.name }}).then(response => {
						if (response.ok && response.status == 200) {
							if (response.body && response.body.result == "success") {
								context.commit(MUTATION.CHANGE_CONTACT_NAME, data);
								return;
							}
						}
						
						//context.commit(MUTATION.CHANGE_CONTACT_NAME_ERROR, response);
					});
				}
			}
		});

	return storeInstance;
}
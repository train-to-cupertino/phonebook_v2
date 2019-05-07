import Vue from 'vue'
import Vuex from 'vuex'
import * as MUTATION from './misc/mutation-types.js'
import API_URL from './misc/apiurls.js'

const Http = new Vue;

let storeInstance = null;

export default () => {
	if (!storeInstance) 
		storeInstance = new Vuex.Store({
			state: {
				// Перечень контактов
				contacts: [],
				
				// Правила валидации
				rules: {
					// Поле должно быть заполнено
					required: value => !!value || 'Поле не заполнено',
					
					// Номер телефона
					phone: value => /^7\d{10}$/.test(value) || 'Введите 10 цифр телефона',
				},

				// Строка поиска
				search: '',
			},
			
			getters: {
				// Возвращает контакт по id
				contactById: state => index => state.contacts.find(x => x.id == index),
				
				// Возвращает контакт, которому принадлежит телефон с заданным id
				contactByPhoneId: state => index => {
					for(let contact_id in state.contacts) {
						let contact = state.contacts[contact_id];
						
						if (!contact.phones)
							continue;

						if (Object.keys(contact.phones).indexOf(index.toString()) != -1)
							return contact;
					}
					
					return null;
				},
				
				
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
						
						if (contact.phones) {
							for(let phone_id in contact.phones) {
								state.contacts[contact_id].phones[phone_id].isLoading = false;
							}						
						}
					}
				},
				
				// Изменение имени контакта
				[MUTATION.CHANGE_CONTACT_NAME] (state, data) {
					state.contacts.find(x => x.id == data.id).name = data.name;
					state.contacts.find(x => x.id == data.id).isLoading = false;
				},
				
				// Удаление контакта (соответственно со всеми его телефонами)
				[MUTATION.DELETE_CONTACT] (state, id) {
					state.contacts = state.contacts.filter(x => x.id != id);
				},				
				
				// Удаление телефона контакта
				[MUTATION.DELETE_PHONE] (state, data) {
					let contact = state.contacts.find(x => x.id == data.contact_id)
					
					let filteredPhones = {};
					
					for(let phone_id in contact.phones) {
						let phone = contact.phones[phone_id];
						
						if (phone_id != data.phone_id)
							filteredPhones[phone_id] = phone;
					}
					
					contact.phones = filteredPhones;
				},
				
				// Добавление телефона к контакту
				[MUTATION.ADD_PHONE] (state, data) {
					let contact = state.contacts.find(x => x.id == data.contact_id)
					
					if (!contact.phones)
						contact.phones = {};
						
					contact.phones = { ...contact.phones, [data.phone_id]: {
						id: data.phone_id,
						isLoading: false,
						phone: data.phone,
					}};
				},
				
				// Добавление телефона к контакту
				[MUTATION.ADD_CONTACT] (state, data) {
					let contact = {
						id: data.contact_id,
						name: data.name,
						phones: {
							[data.phone_id]: {
								id: data.phone_id,
								phone: data.phone,
								isLoading: false,
							}
						}
					}
					
					state.contacts.push(contact)
				},
			
				// Изменение номера телефона
				[MUTATION.UPDATE_PHONE] (state, data) {
					data.contact.phones[data.id].phone = data.phone;
				},

				// Изменение условия поиска
				[MUTATION.SET_SEARCH_CONDITION] (state, data) {
					state.search = data
				},				
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
					});
				},
				
				// Изменяет имя контакта
				changeContactName(context, data) {
					context.getters.contactById(data.id).isLoading = true;
				
					Http.$http.get(API_URL, { params: { action: "update_contact", contact_id: data.id, name: data.name }}).then(response => {
						if (response.ok && response.status == 200) {
							if (response.body && response.body.result == "success") {
								context.commit(MUTATION.CHANGE_CONTACT_NAME, data);
								return;
							}
						}
					});
				},
				
				// Удаляет контакт
				deleteContact(context, id) {
					Http.$http.get(API_URL, { params: { action: "delete_contact", contact_id: id }}).then(response => {
						if (response.ok && response.status == 200) {
							if (response.body && response.body.result == "success") {
								context.commit(MUTATION.DELETE_CONTACT, id);
								return;
							}
						}
					});					
				},
				
				// Удаляет телефон контакта
				deletePhone(context, data) {
					Http.$http.get(API_URL, { params: { action: "delete_phone", phone_id: data.phone_id }}).then(response => {
						if (response.ok && response.status == 200) {
							if (response.body && response.body.result == "success") {
								context.commit(MUTATION.DELETE_PHONE, data);
								return;
							}
						}
					});
				},
				
				// Добавляет телефон к контакту
				addPhone(context, data) {
					Http.$http.get(API_URL, { params: { action: "add_phone", contact_id: data.contact_id, phone: data.phone }}).then(response => {
						if (response.ok && response.status == 200) {
							if (response.body && response.body.result == "success") {
								context.commit(MUTATION.ADD_PHONE, { ...data, phone_id: response.body.phone_id });
								return;
							}
						}
					});
				},
				
				// Редактировать номер телефона
				editPhone(context, data) {
					Http.$http.get(API_URL, { params: { action: "update_phone", phone_id: data.id, phone: data.phone }}).then(response => {
						if (response.ok && response.status == 200) {
							if (response.body && response.body.result == "success") {
								context.commit(MUTATION.UPDATE_PHONE, data);
								return;
							}
						}
					});					
				},
				
				// Добавляет телефон к контакту
				addContact(context, data) {
					Http.$http.get(API_URL, { params: { action: "add_contact", ...data }}).then(response => {
						if (response.ok && response.status == 200) {
							if (response.body && response.body.result == "success") {
								context.commit(MUTATION.ADD_CONTACT, { ...data, contact_id: response.body.contact_id, phone_id: response.body.phone_id });
								return;
							}
						}
					});
				}				
			}
		});

	return storeInstance;
}
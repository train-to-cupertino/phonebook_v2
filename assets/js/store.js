import Vue from 'vue'
import Vuex from 'vuex'
import * as MUTATION from './misc/mutation-types.js'
import * as APIURL from './mics/apiurls.js'

const Http = new Vue;

let storeInstance = null;

export default () => {
	if (!storeInstance) 
		storeInstance = new Vuex.Store({
			state: {
				contacts: {}
			},
			
			getters: {
			
			},

			mutations: {
				[MUTATION.SET_CONTACT_LIST] (state, data) {
					state.contacts = data;
				}
			},
			
			actions: {
				getContactList(context) {
					Http.$http.get(APIURL.LOAD_CONTACT_LIST).then(response => {
						if (response.ok && response.status == 200) {
							if (response.body && response.body.result == "success") {
								context.commit(MUTATION.SET_CONTACT_LIST, response);
								return;
							}
						}
						
						//context.commit(MUTATION.SET_CONTACT_LIST_ERROR, response);
					});
				}
			}
		});

	return storeInstance;
}
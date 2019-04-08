<template>
	<div>
	<!--{{contacts}}-->
	<v-data-table :items="contacts" :headers="headers" class="elevation-1" :search="search" :custom-filter="customFilter" rows-per-page-text="Контактов на странице">
		<template slot="pageText" scope="{ pageStart, pageStop, itemsLength }">
				С {{ pageStart }} по {{ pageStop }} из {{ itemsLength }} контактов
		</template>	
		<template v-slot:items="contacts">
			<td style="width: 150px;">
				<Contact :data="contacts.item"/>
			</td>
			<td class="justify-center px-0" style="width: 100px;">
				<ContactActions :id="contacts.item.id" />
			</td>
			<td class="text-xs-left">
				<Phones :id="contacts.item.id" />
			</td>
		</template>
		<template v-slot:no-data>
			<div class="mt-2">Список контактов пуст</div>
			<v-btn dark small color="green" @click="showAddContactForm" class="mb-2">
				<v-icon>add_circle</v-icon>
				<span class="ml-2">Добавить контакт</span>
			</v-btn>
		</template>
		<template v-slot:no-results>
			<div class="mt-2">Не найдены элементы, соответствующие фильтру</div>
		</template>		
	</v-data-table>
	</div>
</template>

<script>
import Contact from "./Contact.vue"
import ContactActions from "./ContactActions.vue"
import Phones from "./Phones.vue"

export default {
	name: "ContactList",
	
	components: {
		Contact,
		ContactActions,
		Phones
	},
	
	props: ["search"],
	
	created() {
		let _this = this;
		/*
		this.$on('showAddPhoneForm', function(contact_id) {
			alert('ewq');
			_this.$parent.$emit('showAddPhoneForm', contact_id);
		});
		*/
	},
	
	data() {
		return {
			headers: [
				{
					text: 'Имя',
					align: 'left',
					value: 'name'
				},
				{ 
					text: 'Действия', 
					sortable: false,
				},
				{ 
					text: 'Телефоны', 
					sortable: false,
				},
			],
			
			
		}
	},

	computed: {
        contacts: {
			get() {
				return this.$store.state.contacts;
			}
        }
	},
	
	methods: {
		showAddContactForm: function() {
			this.$root.$emit('showAddContactForm')
		},
		
		customFilter(items, search, filter) {
			//this custom filter will do a multi-match separated by a space.
			//e.g

			if (!search) { return items } //if the search is empty just return all the items

			function  new_filter (val, search) {
				search = search.toString().toLowerCase()
			
				return val !== null &&
					['undefined', 'boolean'].indexOf(typeof val) === -1 &&
					//val.toString().toLowerCase().replace(/[^0-9a-zA-ZА-Яа-яёЁ]+/g,"").indexOf(search) !== -1
					val.toString().toLowerCase().indexOf(search) !== -1
			}

			//let needleAry = search.toString().toLowerCase().split(" ").filter(x => x);
			//whenever we encounter a space in our search we will filter for both the first and second word (or third word)

			//return items.filter(row => needleAry.every(needle => Object.keys(row).some(key => new_filter(row[key],needle))));
			return items.filter(function(row) {
				console.log(Object.values(row.phones));
				console.log(Object.values(row.phones).map(x => x.phone));
			
				if (new_filter(row.name, search))
					return true;
				
				
				
				if (Object.values(row.phones).map(x => x.phone).some(y => new_filter(y, search)))
					return true;
				
				return false;
			})
			//foreach needle in our array cycle through the data (row[key]) in the current row looking for a match.
			// .some will return true and exit the loop if it finds one it will return false if it doesnt
			// .every will exit the loop if we dont find a match but will return true if all needles match
			// .filter the rows on each match


		}		
	}
}
</script>

<style scoped>
.debug {
	font-size: 8px;
}
</style>
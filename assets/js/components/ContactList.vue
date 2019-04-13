<template>
	<v-data-table :items="contacts" :headers="headers" class="elevation-1" :search="search" :custom-filter="customFilter" rows-per-page-text="Контактов на странице">
		<template slot="pageText" scope="{ pageStart, pageStop, itemsLength }">
				С {{ pageStart }} по {{ pageStop }} из {{ itemsLength }} контактов
		</template>	
		<template v-slot:items="contacts">
			<td style="width: 250px;">
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
		// Инициирует событие показа формы добавления контакта
		showAddContactForm: function() {
			this.$root.$emit('showAddContactForm')
		},
		
		// Поисковый фильтр
		customFilter(items, search, filter) {
			// Если строка поиска пустая - отдаем все контакты без фильтрации
			if (!search) { 
				return items 
			}

			// Функция фильтрации данных
			function filterData(val, search) {
				search = search.toString().toLowerCase().replace(/[^0-9a-zA-ZА-Яа-яёЁ]+/g,"").toLowerCase()
				return val !== null &&
					['undefined', 'boolean'].indexOf(typeof val) === -1 &&
					val.toString().toLowerCase().replace(/[^0-9a-zA-ZА-Яа-яёЁ]+/g,"").indexOf(search) !== -1
			}
			
			// Фильтруем контакты
			return items.filter(function(row) {
				// Если имя соответствует поисковому запросу
				if (filterData(row.name, search))
					return true;

				// Если хотя бы один из телефонов соответствует запросу
				if (Object.values(row.phones).map(x => x.phone).some(y => filterData(y, search)))
					return true;
				
				return false;
			})
		}		
	}
}
</script>

<style scoped>

</style>
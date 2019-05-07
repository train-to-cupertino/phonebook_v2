<?php 
namespace Phonebook;

class Controller {

	// Доступные действия
	private $_actions = [
		'list',
		'add_contact',
		'update_contact',
		'delete_contact',
		'add_phone',
		'update_phone',
		'delete_phone',
		'index'
	];
	
	private $_defaultAction = 'index';

	/**
		Выполняет действие контроллера
	*/
	public function run() {
		$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : $this->_defaultAction;
	
		// Если действие задано и находится в списке допустимых
		if (!empty($action) && in_array($action, $this->_actions)) {
			
			$phonebook = new Phonebook();
			
			switch($action) {
				// Список пользователей
				case "list":
					try {
						$list = $phonebook->getContactList(); // Получаем список пользователей
					} catch(Exception $e) {
						echo json_encode(['result' => 'error', 'text' => $e->getMessage()]);
						die();
					}
					
					echo json_encode(['result' => 'success', 'data' => $list]);
					die();
				break;
				
				// Добавить контакт
				case "add_contact":
					try  {
						// Если заданы непустые имя контакта и телефон
						if (isset($_GET['name']) && isset($_GET['phone']) && $_GET['name'] && $_GET['phone']) {
							try {
								$res = $phonebook->addContact($_GET['name'], $_GET['phone']);	// Добавляем контакт

								if (!$res) {
									echo json_encode(['result' => 'error', 'text' => 'Не удалось добавить контакт!']);
									die();
								}
							} catch(Exception $e) {
								echo json_encode(['result' => 'error', 'text' => $e->getMessage()]);
								die();
							}

							// Вывод при успешном добавлении
							echo json_encode(['result' => 'success', 'contact_id' => $res['contact_id'], 'phone_id' => $res['phone_id']]);
							die();
						} else {
							echo json_encode(['result' => 'error', 'text' => 'Не указано имя и/или телефон!']);
							die();
						}
					} catch(Exception $e) {
						echo json_encode(['result' => 'error', 'text' => $e->getMessage()]);
						die();
					}
				break;
				
				// Отредактировать контакт (сменить имя)
				case "update_contact":
					// Если задано непустое имя контакта и ID, больший нуля
					if (isset($_GET['contact_id']) && isset($_GET['name']) && ($_GET['contact_id'] > 0) && $_GET['name']) {
						try {
							$update_res = $phonebook->updateContact($_GET['contact_id'], $_GET['name']); // Обновляем имя контакта
							if (!$update_res) {
								echo json_encode(['result' => 'error', 'text' => 'Не удалось отредактировать контакт!']);	
								die();
							} else {
								echo json_encode(['result' => 'success']);
								die();
							}
						} catch(Exception $e) {
							echo json_encode(['result' => 'error', 'text' => $e->getMessage()]);
							die();
						}
					} else {
						echo json_encode(['result' => 'error', 'text' => 'Не задан ID контакта и/или имя контакта!']);
						die();
					}
				break;
				
				// Отредактировать телефон (сменить номер)
				case "update_phone":
					// Если задан непустой телефон и ID, больший нуля
					if (isset($_GET['phone_id']) && isset($_GET['phone']) && ($_GET['phone_id'] > 0) && $_GET['phone']) {
						try {
							$update_res = $phonebook->updatePhone($_GET['phone_id'], $_GET['phone']);	// Обновляем телефон
							if (!$update_res) {
								echo json_encode(['result' => 'error', 'text' => 'Не удалось отредактировать телефон!']);	
								die();
							} else {
								echo json_encode(['result' => 'success']);
								die();
							}
						} catch(Exception $e) {
							echo json_encode(['result' => 'error', 'text' => $e->getMessage()]);
							die();
						}
					} else {
						echo json_encode(['result' => 'error', 'text' => 'Не задан ID телефона и/или номер телефона!']);	
						die();
					}
				break;				
				
				// Удалить контакт
				case "delete_contact":
					// Если задан ID контакта, больший нуля
					if (isset($_GET['contact_id']) && ($_GET['contact_id'] > 0)) {
						try {
							$delete_res = $phonebook->deleteContact($_GET['contact_id']); // Удаляем контакт
							if (!$delete_res) {
								echo json_encode(['result' => 'error', 'text' => 'Не удалось удалить контакт!']);	
								die();
							} else {
								echo json_encode(['result' => 'success']);
								die();
							}
						} catch(Exception $e) {
							echo json_encode(['result' => 'error', 'text' => $e->getMessage()]);
							die();
						}
					} else {
						echo json_encode(['result' => 'error', 'text' => 'Не задан ID контакта!']);	
						die();
					}
				break;
				
				// Добавить телефон
				case "add_phone":
					// Если задан ID контакта, больший нуля и непустой телефон
					if (isset($_GET['contact_id']) && ($_GET['contact_id'] > 0) && isset($_GET['phone']) && $_GET['phone']) {
						try {
							$addphone_res = $phonebook->addPhone($_GET['contact_id'], $_GET['phone']); // Добавляем телефон
							if (!$addphone_res) {
								echo json_encode(['result' => 'error', 'text' => 'Не удалось добавить телефон!']);	
								die();
							} else {
								echo json_encode(['result' => 'success', 'phone_id' => $addphone_res]);
								die();
							}
						} catch(Exception $e) {
							echo json_encode(['result' => 'error', 'text' => $e->getMessage()]);
							die();
						}
					} else {
						echo json_encode(['result' => 'error', 'text' => 'Не задан ID контакта и/или телефон!']);	
						die();
					}					
				break;
				
				// Удалить телефон
				case "delete_phone":
					// Если задан ID телефона, больший нуля
					if (isset($_GET['phone_id']) && ($_GET['phone_id'] > 0)) {
						try {
							$delete_res = $phonebook->deletePhone($_GET['phone_id']); // Удаляем телефон
							if (!$delete_res) {
								echo json_encode(['result' => 'error', 'text' => 'Не удалось удалить телефон!']);
								die();
							} else {
								echo json_encode(['result' => 'success']);
								die();
							}
						} catch(Exception $e) {
							echo json_encode(['result' => 'error', 'text' => $e->getMessage()]);
							die();
						}
					} else {
						echo json_encode(['result' => 'error', 'text' => 'Не задан ID контакта!']);	
						die();
					}
				break;
				
				case "index":
					echo file_get_contents($_SERVER['DOCUMENT_ROOT'].'/index.php');
				break;
			}
		} else {
			http_response_code(404);
			echo 'Ошибка 404. Страница не найдена!';
			die();
		}
	}
}
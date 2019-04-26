### Телефонный справочник (PHP + Vue.js)

1. Склонировать репозиторий
```sh
$ git clone https://github.com/train-to-cupertino/phonebook.git
```

2. Создать БД и таблицы
```sh
START TRANSACTION;

-- Создание БД
CREATE DATABASE IF NOT EXISTS `contacts_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `contacts_db`;

-- Структура таблицы `contact`
CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы `contact`
INSERT INTO `contact` (`id`, `name`) VALUES
(1, 'Василий'),
(2, 'Михаил');

-- Структура таблицы `phone`
CREATE TABLE `phone` (
  `id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `phone` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы `phone`
INSERT INTO `phone` (`id`, `contact_id`, `phone`) VALUES
(1, 1, '+7 (999) 123 - 45 - 65'),
(2, 1, '+7 (891) 816 - 54 - 31'),
(3, 2, '+7 (909) 444 - 58 - 17'),
(4, 2, '+7 (918) 123 - 12 - 17');

-- Индексы
ALTER TABLE `contact` ADD PRIMARY KEY (`id`);
ALTER TABLE `phone` ADD PRIMARY KEY (`id`), ADD KEY `contact_id` (`contact_id`);

ALTER TABLE `contact` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `phone` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- Ограничения внешнего ключа таблицы `phone`
ALTER TABLE `phone` ADD CONSTRAINT `phone_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;
```
3. Установить зависимости и собрать бандл
```sh
npm install && npm audit fix && npm run build
```
4. Задать в vendor\Phonebook\DBHelper.php логин и пароль от БД
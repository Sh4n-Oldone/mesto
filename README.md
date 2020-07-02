# Проект 4: Место

### Обзор

* Ссылка на работу
* Ссылка на макет
* План работы
* Обнаруженные трудности/замечания
* Процесс рефакторинга после первого ревью
* Список веток

**GithubPages**

* [Ссылка на работу в GithubPages](https://sh4n-oldone.github.io/mesto/)

**Figma**

* [Ссылка на макет в Figma](https://www.figma.com/file/StZjf8HnoeLdiXS7dYrLAh/JavaScript.-Sprint-4)
* [Дополнения к макету](https://www.figma.com/file/nlYpT4VhFiwimn2YlncrcF/JavaScript.-Sprint-5?node-id=0%3A1)

**План работы**
>v.1.0
- [x] Собрать структуру страницы
- [x] Собрать макет
- [x] Проверить на отсутствие скроллов
- [x] Собрать поп-ап
- [x] Прописать JS для открытия/закрытия popup блока
- [x] Прописать JS для сохранения текста в инпутах
- [x] Свериться с чеклистом
- [x] Сдать на первое ревью
- [x] Исправить вёрстку
- [x] Исправить рекомендации
- [x] Сдать на второе ревью

>v.2.0
- [x] Удалить карточки, заменив их темплейтом
- [x] Подгрузить первые шесть карточек через JS (удалить из html оригинальные)
- [x] Собрать новый поп-ап для формы добавления карточки
- [x] Прописать JS для открытия/закрытия этой формы
- [x] Прописать JS для добавления карточки в начало списка
- [x] Прописать глобальный клик для лайков через метод .target
- [x] Добавить иконку удаления для карточек (внести кнопку в темплейт)
- [x] Прописать JS для удаления карточки
- [x] Создать попап для открытия картинки из карточки в полный размер по клику на ней
- [x] Добавить плавности открытию и закрытию всех попапов [тред в помощь](https://stackoverflow.com/questions/3331353/transitions-on-the-css-display-property)
- [x] Сверить поп-апы с макетом
- [x] Сдать на первое ревью.
- [x] Сдать на второе ревью.
- [x] Исправить рекомендации.

**Обнаруженные трудности/замечания и статус решения**

- [x] Неточный макет
- [] Баг в хроме: при загрузке страницы теперь видно, как исчезают подгружающиеся поп-апы. Решено пока не трогать из-за возможных дальнейших проблем в новых заданиях.
- [] При удалении всех карточек, страничка выглядит уныло. Решение: добавить карточку, которая генерируется при проверки массива на нулевую заполненность. Пока не добавлено из-за вероятных дальнейших коллизий с заданиями.
- [] Можно добавить фишку: при клике на инпуты карточки автоматически удаляется всё, что в ней есть. Нужно будет сделать проверку на Null, чтоб возвращало старое значение, а не добавляло пустую карточку.
- [] В каком порядке должны добавляться карточки из массива? Если по нынешним функциям через prepend, то в обратном порялдке, а если пытаться добавить их в прямом порядке, то нужно добавлять условия проверки.

**Процесс рефакторинга v.2.0 после первого ревью**

- Теперь сначала объявляются переменные, затем создаются функции и после этого добавляются ивенты.
- Функции открытия поп-апов сложены в одну и теперь вызываются по параметру.
- Все let, кроме счётчика, заменены на const.
- Константы в функциях, которые обращаются к дому вынесены наружу.
- Удалены: переменные имён и ссылок массива, функция создания карточек из массива, функция создания новых карточек.
- Добавлены: функция создания карточки из шаблона, функция добавления карточки (вызывающая функцию создания), функция добавления карточек из исходного массива (вызывающая функцию добавления).
- Добавлена отдельная функция, обнуляющая поведение браузера при нажатии на сабмит.

> рекомендации
- Теперь Listener'ы элементов не дублируются.
- Переработка функций лайка, удаления карточки и вызова попапа изображения. Изнутри убран Listener.
- Создана объединяющая слушатели ивентов лайка, удаления карточки и вызова попапа изображения функция - setEventListeners.

**Ветки и статус**

- master
- DOM/merged

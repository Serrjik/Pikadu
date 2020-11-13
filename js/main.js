// Кнопка включения мобильного меню.
let menuToggle = document.querySelector('#menu-toggle')
// Мобильное меню.
let menu = document.querySelector('.sidebar')

// Регулярка для проверки email.
const regExpValidEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i

// Блок авторизации/регистрации.
const loginElem = document.querySelector('.login')
// Форма авторизации/регистрации.
const loginForm = loginElem.querySelector('.login-form')
// Инпут для ввода email'а.
const emailInput = loginForm.querySelector('.login-email')
// Инпут для ввода пароля.
const passwordInput = loginForm.querySelector('.login-password')
// Кнопка "Регистрация".
const loginSignup = loginForm.querySelector('.login-signup')

// Блок с информацией о пользователе.
const userElem = document.querySelector('.user')
// Элемент с именем пользователя.
const userNameElem = userElem.querySelector('.user-name')
// Элемент с аватаром пользователя.
const userAvatarElem = userElem.querySelector('.user-avatar')

// Кнопка выхода с сайта.
const exitElem = userElem.querySelector('.exit')

// Кнопка редактирования информации о пользователе.
const editElem = userElem.querySelector('.edit')
// Форма для редактирования информации о пользователе.
const editContainer = userElem.querySelector('.edit-container')
// Инпут с именем пользователя.
const editUsername = editContainer.querySelector('.edit-username')
// Инпут с URL к фото пользователя.
const editPhotoURL = editContainer.querySelector('.edit-photo')

// Контейнер для постов.
const postsWrapper = document.querySelector('.posts')

// Пользователи сайта (тестовые данные).
const listUsers = [
	{
		id: '01',
		email: 'maks@mail.com',
		password: '12345',
		displayName: 'MaksJS',
	},
	{
		id: '02',
		email: 'kate@mail.com',
		password: '123456',
		displayName: 'kate',
	},
]

// Объект для работы со списком пользователей сайта.
const setUsers = {
	// Авторизованный на сайте пользователь.
	user: null,

	/*
		Метод входа пользователя на сайт.
		Принимает email и пароль пользователя + callback-функцию.
	*/
	logIn(email, password, handler) {
		console.log('Метод входа пользователя на сайт.')

		// Если email не прошёл проверку:
		if (!regExpValidEmail.test(email)) {
			return alert('Email не валиден.')
		}

		// Пользователь с переданным email.
		const user = this.getUser(email)
		/*
			Если переданный пароль совпадает
			с паролем зарегистрированного пользователя:
		*/
		if (user && user.password === password) {
			// Авторизовать пользователя на сайте!
			this.authorizeUser(user)

			// Вызов переданной callback-функции.
			handler()
		}

		// Если введенный пароль не совпадает с паролем пользователя:
		else {
			alert('Пользователь с такими данными не найден!')
		}
	},

	// Метод выхода пользователя с сайта. Принимает callback-функцию.
	logOut(handler) {
		console.log('Метод выхода пользователя с сайта.')

		// Очистить переменную с авторизованным пользователем.
		this.user = null

		// Вызов переданной callback-функции.
		handler()
	},

	/*
		Метод регистрации пользователя на сайте.
		Принимает email и пароль пользователя + callback-функцию.
	*/
	signUp(email, password, handler) {
		// console.log('email, password: ', email, password);
		console.log('Метод регистрации пользователя на сайте.')

		// Если email не прошёл проверку:
		if (!regExpValidEmail.test(email)) {
			return alert('Email не валиден.')
		}

		// Валидация переданных email и пароля пользователя.
		if (!email.trim() || !password.trim()) {
			alert('Введите адрес электронной почты и пароль!')
			return
		}

		// Если пользователь с переданным email ещё не зарегистрирован:
		if (!this.getUser(email)) {
			// Создать пользователя.
			const user = {
				email,
				password,
				displayName: email.substring(0, email.indexOf('@')),
			}

			// Добавить созданного пользователя в список пользователей.
			listUsers.push(user)

			// Авторизовать пользователя на сайте!
			this.authorizeUser(user)

			// Вызов переданной callback-функции.
			handler()
		}
		// Если пользователь с переданным email уже зарегистрирован:
		else {
			alert('Пользователь с таким email уже зарегистрирован.')
		}
	},

	/*
		Метод записывает информацию о пользователе из переданных параметров.
		Принимает имя и URL к фото пользователя + callback-функцию.
	*/
	editUser(userName, userPhoto, handler) {
		userName = userName.trim()
		userPhoto = userPhoto.trim()

		// Если имя пользователя передано:
		if (userName) {
			// Изменяем имя пользователя.
			this.user.displayName = userName
		}

		// Если URL к фото пользователя передан:
		if (userPhoto) {
			// Изменяем URL к фото пользователя.
			this.user.photo = userPhoto
		}

		// Вызов переданной callback-функции.
		handler()
	},

	/*
		Метод возвращает пользователя с переданным email,
		если он уже зарегистрирован.
	*/
	getUser(email) {
		return listUsers.find(user => user.email === email)
	},

	// Метод авторизует пользователя на сайте.
	authorizeUser(user) {
		this.user = user
	},
}

// Объект для работы с постами.
const setPosts = {
	// Все посты.
	allPosts: [
		{
			title: 'Заголовок поста с интригой',
			text: `<p>Таким образом укрепление и развитие структуры требуют от нас анализа форм развития. Не следует, однако забывать, что реализация намеченных плановых заданий требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. Задача организации, в особенности же консультация с широким активом способствует подготовки и реализации новых предложений. Равным образом новая модель организационной деятельности позволяет оценить значение модели развития.</p>`,
			tags: ['свежее', 'горячее', 'мое', 'случайность'],
			author: 'info@serjik.by',
			date: '11.11.2020 20:54:00',
			like: 45,
			comments: 12,
		},
		{
			title: 'Microsoft выпустила октябрьское обновление Windows 10 — с небольшим редизайном «Пуска» и браузером Edge',
			text: `<p>Вечером 20 октября Microsoft выпустила обновление Windows 10 October 2020 Update (версия 2009). Оно будет постепенно доступно всем владельцам Windows 10 в ближайшие несколько недель через «Центр обновления». Чтобы проверить его доступность, нужно нажать кнопку «Проверить наличие обновлений».</p>
			<p>В новой версии ОС компания изменила дизайн меню «Пуск», заменила старый браузер Edge на новый, основанный на Chromium, и внесла несколько мелких изменений в настройки и внешний вид системы.</p>
			<p>Теперь в состав Windows 10 будет входит обновленный браузер Microsoft Edge на базе Chromium — он заменит старый Edge для всех пользователей.</p>`,
			tags: ['новость', 'microsoft', 'windows'],
			author: 'petr@petrov.by',
			date: '11.11.2020 20:54:00',
			like: 155,
			comments: 234,
		},
		{
			title: 'Как выиграть золотую медаль на международной олимпиаде по информатике. Кейс выпускника Тинькофф',
			text: `<p>В сентябре один из учеников образовательной программы для школьников Тинькофф Поколения выиграл золотую медаль на международной олимпиаде по информатике IOI 2020. В соревновании участвовало почти 350 ребят из 87 стран. Семен Савкин из Москвы занял 25 место в мировом рейтинге.</p>
			<p>Командное выступление участников из России принесло стране 2 место в мировом зачете. России опередила сборные Японии, Канады и Кореи. Семен рассказал, как ему это удалось.</p>
			<p>Олимпиада состояла из двух туров, которые в общей сложности могут длиться 10 часов. В каждом туре тебе даётся по пять часов, за которые нужно решить три задачи. Чтобы решить задачу по спортивному программированию, нужно написать достаточно эффективную программу, выдающую правильный ответ на всех допустимых входных данных. Код автоматически проверяется тестирующей системой. Если решение проходит все тесты — ты получаешь 100 баллов за задачу. Если программа написана неоптимально или выводит неверный результат на каких-то тестах -- баллы снижают.</p>
			<p>Я пишу на С++. В первом туре я решил одну задачу за час на 100 баллов, остальные две были сложнее. Во втором туре были две простые задачи и одна сложная. Я решил две задачи за 2,5 часа, но последнюю мне так и не удалось решить.</p>
			<p>Во время тура участникам нельзя общаться. Если во время контеста есть вопрос по условиям, то можно задать его в тестирующей системе и жюри олимпиады ответит. После окончания тура мы обсудили задачи и я понял, как можно было улучшить мое решение. Решение этой задачи на 100 баллов было нестандартным, до него можно было только догадаться. Я решил ее частично.</p>`,
			tags: ['новость', 'microsoft', 'windows'],
			author: 'tinkoff@tinkoff.com',
			date: '11.11.2020 20:54:00',
			like: 5,
			comments: 3,
		},
	],
}

/*
	Функция переключает блоки, которые должны быть видны
	без регистрации на сайте или после регистрации на сайте.
*/
const toggleAuthDom = () => {
	const user = setUsers.user
	console.log('user: ', user);

	// Если пользователь авторизован на сайте:
	if (user) {
		// Скрываем блок авторизации.
		loginElem.style.display = 'none'
		// Показываем блок с информацией о пользователе.
		userElem.style.display = ''
		// Записываем имя пользователя в текст элемента для имени пользователя.
		userNameElem.textContent = user.displayName
		/*
			Если в объекте с данными пользователя есть URL к фото пользователя,
			записываем его в свойство src элемента с аватаром пользователя.
			Иначе оставляем тот URL,
			который записан сейчас в свойство src элемента.
		*/
		userAvatarElem.src = user.photo || userAvatarElem.src
	}

	// Если пользователь НЕ авторизован на сайте:
	else {
		// Показываем блок авторизации.
		loginElem.style.display = ''
		// Скрываем блок с информацией о пользователе.
		userElem.style.display = 'none'
	}
}

// Функция отображает все посты на странице.
const showAllPosts = () => {
	// Все посты в виде HTML.
	let postsHTML = ''

	setPosts.allPosts.forEach(({
		title,
		text,
		like,
		comments,
		author,
		photo,
		tags
	}) => {
		postsHTML += `
		<!-- .post -->
		<section class="post">
			<!-- .post-body -->
			<div class="post-body">
				<h2 class="post-title">${title}</h2>

				<div class="post-text">${text}</div>

				<div class="tags">
					${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
				</div>
			</div>
			<!-- // .post-body -->

			<!-- .post-footer -->
			<div class="post-footer">
				<!-- .post-buttons -->
				<div class="post-buttons">
					<button class="post-button likes">
						<svg class="icon icon-like" width="19" height="20">
							<use xlink:href="img/icons.svg#like"></use>
						</svg>
						<span class="likes-counter">${like}</span>
					</button>
					<button class="post-button comments">
						<svg class="icon icon-comment" width="22" height="22">
							<use xlink:href="img/icons.svg#comments"></use>
						</svg>
						<span class="comments-counter">${comments}</span>
					</button>
					<button class="post-button save">
						<svg class="icon icon-save" width="20" height="20">
							<use xlink:href="img/icons.svg#save"></use>
						</svg>
					</button>
					<button class="post-button share">
						<svg class="icon icon-share" width="18" height="20">
							<use xlink:href="img/icons.svg#share"></use>
						</svg>
					</button>
				</div>
				<!-- // .post-buttons -->

				<!-- .post-author -->
				<div class="post-author">
					<div class="author-about">
						<a href="#" class="author-username">${author}</a>
						<span class="post-time">5 минут назад</span>
					</div>
					<a href="#" class="author-link">
						<img
							class="author-avatar"
							src=${photo}
							alt="avatar"
						>
					</a>
				</div>
				<!-- // .post-author -->
			</div>
			<!-- // .post-footer -->
		</section>
		<!-- // .post -->`
	})

	postsWrapper.innerHTML = postsHTML
}

// Функция инициализации приложения.
const init = () => {
	// Повесить обработчик отправки формы на форму авторизации/регистрации.
	loginForm.addEventListener('submit', event => {
		event.preventDefault()
		setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom)

		// Очистить форму авторизации/регистрации.
		loginForm.reset()
	})

	// Повесить обработчик клика на кнопку "Регистрация".
	loginSignup.addEventListener('click', event => {
		event.preventDefault()
		setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom)

		// Очистить форму авторизации/регистрации.
		loginForm.reset()
	})

	// Повесить обработчик клика на кнопку выхода с сайта.
	exitElem.addEventListener('click', event => {
		event.preventDefault()
		setUsers.logOut(toggleAuthDom)
	})

	// Повесить обработчик клика на кнопку редактирования информации о пользователе.
	editElem.addEventListener('click', event => {
		event.preventDefault()
		editContainer.classList.toggle('visible')
		editUsername.value = setUsers.user.displayName
	})

	/*
		Повесить обработчик отправки формы редактирования информации о пользователе.
	*/
	editContainer.addEventListener('submit', event => {
		event.preventDefault()
		setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom)
		editContainer.classList.remove('visible')
	})

	// Скрыть/показать Мобильное меню.
	menuToggle.addEventListener('click', function (event) {
		event.preventDefault()
		menu.classList.toggle('visible')
	})

	showAllPosts()
	toggleAuthDom()
}

// Повесить обработчик на событие загрузки всей HTML-страницы.
document.addEventListener('DOMContentLoaded', init)
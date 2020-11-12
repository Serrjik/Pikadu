// Скрыть/показать Мобильное меню.
let menuToggle = document.querySelector('#menu-toggle')
let menu = document.querySelector('.sidebar')

menuToggle.addEventListener('click', function (event) {
	event.preventDefault()
	menu.classList.toggle('visible')
})

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
console.log('userElem: ', userElem);
// Элемент с именем пользователя.
const userNameElem = userElem.querySelector('.user-name')

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

	// Метод выхода пользователя с сайта.
	logOut() {
		console.log('Метод выхода пользователя с сайта.')
	},

	/*
		Метод регистрации пользователя на сайте.
		Принимает email и пароль пользователя + callback-функцию.
	*/
	signUp(email, password, handler) {
		// console.log('email, password: ', email, password);
		console.log('Метод регистрации пользователя на сайте.')

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
	} else {
		// Показываем блок авторизации.
		loginElem.style.display = ''
		// Скрываем блок с информацией о пользователе.
		userElem.style.display = 'none'
	}
}

// Повесить обработчик отправки формы на форму авторизации/регистрации.
loginForm.addEventListener('submit', event => {
	event.preventDefault()
	setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom)
	// toggleAuthDom()
})

// Повесить обработчик клика на кнопку "Регистрация".
loginSignup.addEventListener('click', event => {
	event.preventDefault()
	setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom)
	// toggleAuthDom()
})

toggleAuthDom()
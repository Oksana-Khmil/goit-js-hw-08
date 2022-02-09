/*
Задание 3 - форма обратной связи
В HTML есть разметка формы. Напиши скрипт который будет сохранять значения полей в локальное хранилище когда пользователь что-то печатает.

<form class="feedback-form" autocomplete="off">
  <label>
    Email
    <input type="email" name="email" autofocus />
  </label>
  <label>
    Message
    <textarea name="message" rows="8"></textarea>
  </label>
  <button type="submit">Submit</button>
</form>
Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. Разбей его на несколько подзадач:

Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
*/

import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('.feedback-form input'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

const LOCALSTORAGE_KEY = "feedback-form-state";

initForm();

function onFormInput(event) {
    let persistedFilter = localStorage.getItem(LOCALSTORAGE_KEY);
    persistedFilter = persistedFilter ? JSON.parse(persistedFilter) : {};
    persistedFilter[event.target.name] = event.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedFilter));
};

function initForm() {
    let persistedFilter = localStorage.getItem(LOCALSTORAGE_KEY);
    if (persistedFilter) {
        persistedFilter = JSON.parse(persistedFilter);
        Object.entries(persistedFilter).forEach(([name, value]) => {
            refs.form.elements[name].value = value
        });
    }
};

function onFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(refs.form);
    const user = {};
    formData.forEach((value, name) => {
        user[name] = value;
    });
    console.log(user);
    event.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
}


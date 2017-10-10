'use strict';

window.onload = function () {
    // проверяем поддержку

    // Запускаем отображение тасок при загрузке. по умолчанию все скрытые чтобы не мигали
    init.call(document);
    // Отбираем форматы отображения и вешаем события по смене вида
    addListnerRadio.call(document);
    // Добавляем событие по клину на очистить выполненные
    addListnerButtonClear.call(document);
    // Добавляяем событие на удаление строки (крестики)
    addListnerDelLine.call(document);
    // Добавляем событие на выполнение таски. Чтобы поменять стиль
    addListnerCheckTodo.call(document);
    // Добавляем событие сабмит на форму ввода
    addListnerInputForm.call(document);
    // Добавляем листнер на копирование тодо
    addListnerNewTodoList.call(document);


};

/**
 * Функции по форматам отображения
 * @type {{all: showAll, active: showActive, complited: showComplited}}
 */
var showProp = {
    all: showAll,
    active: showActive,
    complited: showComplited
};

/**
 * Листнер на создание нового Тодо листа
 */
function addListnerNewTodoList() {
    var clButton = this.querySelectorAll('.new_list_button');
    for (var i = 0; i < clButton.length; i++) {
        clButton[i].onclick = createTodoList;
    }
}


/**
 * Листнер на удаление сделанных заданий
 */
function addListnerButtonClear() {
    var clButton = this.querySelectorAll('.button_clear');
    for (var i = 0; i < clButton.length; i++) {
        clButton[i].onclick = clearComplite;
    }
}

/**
 * Листнер на перещелкивание вида
 */
function addListnerRadio() {
    var radiobox = this.querySelectorAll('.radiokbox');
    for (var i = 0; i < radiobox.length; i++) {
        radiobox[i].onclick = showProp[radiobox[i].value];
    }
}

/**
 * Листнер на удаление строки
 */
function addListnerDelLine() {
    var dItem = this.querySelectorAll('.del_item_button');
    for (var i = 0; i < dItem.length; i++) {
        dItem[i].onclick = clearItem;
    }
}

/**
 * Листнер на изменение вида при выборе таски
 */
function addListnerCheckTodo() {
    var todo = this.querySelectorAll('.checkbox');
    for (var i = 0; i < todo.length; i++) {
        todo[i].onclick = clickTodo;
    }
}

/**
 * Листнер на Сабмит формы ввода
 */
function addListnerInputForm() {
    var form = this.querySelectorAll('form');
    for (var i = 0; i < form.length; i++) {
        form[i].addEventListener('submit', function (event) {
            newTodo.call(this);
            event.preventDefault();
        });
    }
}

/**
 * Создание нового тодо листа
 */
function createTodoList() {
    var bodytd = this.closest('.body');
    var count = document.querySelectorAll('.body').length;
    var cloneType = this.value;
    var div = bodytd.cloneNode(true); // Клонируем шаблон
    var divName = div.querySelector('.list_header .input_section');
    var menu = div.querySelectorAll('.radiokbox');
    for (var i = 0; i < menu.length; i++) {
        var menuName = 'menu' + (count + 1);
        menu[i].setAttribute('name', menuName);
    }
    if (cloneType === 'new_list') {
        divName.value = 'New Todo list';
        var list = div.querySelectorAll('.del_item_button');
        for (var i = 1; i < list.length; i++) {
            clearItem.call(list[i]);
        }
    } else {
        divName.value = divName.value + ' clone';
    }
    bodytd.parentNode.appendChild(div); // Вставляем объект
    addListnerRadio.call(div);
    // Добавляем событие по клину на очистить выполненные
    addListnerButtonClear.call(div);
    // Добавляяем событие на удаление строки (крестики)
    addListnerDelLine.call(div);
    // Добавляем событие на выполнение таски. Чтобы поменять стиль
    addListnerCheckTodo.call(div);
    // Добавляем событие сабмит на форму ввода
    addListnerInputForm.call(div);
    // Добавляем листнер на копирование тодо
    addListnerNewTodoList.call(div);
    changeCount.call(document);
}

/**
 * Меняем стиль выполненной таски
 */
function clickTodo() {
    this.closest('.todo_item').querySelector('.label').classList.toggle('label-complite');
}

/**
 * Отображение только выполненных тасок
 */
function showComplited() {
    var bodytd = this.closest('.body');
    var todo = bodytd.querySelectorAll('.checkbox');
    for (var i = 0; i < todo.length; i++) {
        if (todo[i].checked) {
            todo[i].closest('li').classList.toggle('unvisible', false);
            // На выполненных выключаем класс
        }
        if (!todo[i].checked) {
            todo[i].closest('li').classList.toggle('unvisible', true);
            // НА  не выполненых включаем
        }
    }
}

/**
 * Отобразить только активные таски
 */
function showActive() {
    var bodytd = this.closest('.body');
    var todo = bodytd.querySelectorAll('.checkbox');
    for (var i = 0; i < todo.length; i++) {
        if (todo[i].checked) {
            todo[i].closest('li').classList.toggle('unvisible', true);
        }
        if (!todo[i].checked) {
            todo[i].closest('li').classList.toggle('unvisible', false);
        }
    }
}

/**
 * отобразить все таски
 */
function showAll() {
    var bodytd = this.closest('.body');
    var todo = bodytd.querySelectorAll('.checkbox');
    for (var i = 0; i < todo.length; i++) {
        todo[i].closest('li').classList.toggle('unvisible', false);
    }

}

/**
 * Инициализация при старте страницы
 * Отображаем только те таски в соответсвии с параметром отображения
 * Меняем  стиль на выполненных тасках
 * Обновляем счетчик
 */
function init() {
    var body = this.querySelectorAll('.body');

    var i;
    for (i = 0; i < body.length; i++) {

        var radiobox = body[i].querySelectorAll('.radiokbox');
        var j;
        for (j = 0; j < radiobox.length; j++) {
            console.info(radiobox[j]);
            if (radiobox[j].checked) {
                showProp[radiobox[j].value].call(radiobox[j]);
            }
        }
    }
    var todo = this.querySelectorAll('.checkbox');
    for (i = 0; i < todo.length; i++) {
        if (todo[i].checked) {
            clickTodo.call(todo[i]);
        }
    }
    changeCount.call(document);

}

/**
 * Создание новой таски
 * @returns {boolean}
 */
function newTodo() {

    var nt = this.querySelector('.input_section');
    var todo = nt.value;
    if (!todo) {
        return false; // Если ничего не введено, то завершаем
    }
    nt.value = null; // Обнуляем поле ввода
    var bodytd = this.closest('.body');
    var temp = bodytd.querySelector('.template');
    var div = temp.cloneNode(true); // Клонируем шаблон
    div.classList.toggle('template');
    div.querySelector('.label').textContent = todo; // Добавляем текст в шаблон
    temp.parentNode.appendChild(div); // Вставляем объект
    addListnerDelLine.call(bodytd);// Вешаем событие на удаление
    addListnerCheckTodo.call(bodytd);
    changeCount.call(document);

    return false;
}

/**
 * Обновление счетчика тасок
 */
function changeCount() {

    var body = this.querySelectorAll('.body');
    for (var i = 0; i < body.length; i++) {
        var count = body[i].querySelectorAll('.checkbox').length - 1;

        var elemCount = body[i].querySelector('.count');
        elemCount.innerHTML = count + ' item';
    }
}

/**
 * Удаление всех выполненных тасок
 */
function clearComplite() {
    var bodytd = this.closest('.body');
    var todo = bodytd.querySelectorAll('.checkbox');
    for (var i = todo.length - 1; i >= 0; i--) {
        var li = todo[i].closest('li');
        if (todo[i].checked) {
            li.parentNode.removeChild(li);
        }
    }
    changeCount.call(document);
}

/**
 * Удаление 1 таски
 */
function clearItem() {
    var li = this.closest('li');
    li.parentNode.removeChild(li);
    changeCount.call(document);
}


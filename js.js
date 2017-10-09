"use strict";

window.onload = function () {
    // Запускаем отображение тасок при загрузке. по умолчанию все скрытые чтобы не мигали
    init();

    // Отбираем форматы отображения и вешаем события по смене вида
    var radiobox = document.querySelectorAll('.radiokbox');
    for (var i = 0; i < radiobox.length; i++) {
        radiobox[i].onclick = showProp[radiobox[i].id];
    }

    // Добавляем событие по клину на очистить выполненные
    var clButton = document.getElementById('#button_clear');
    clButton.onclick = clearComplite;

    // Добавляяем событие на удаление строки (крестики)
    var dItem = document.getElementsByName("del_item");
    for (var i = 0; i < dItem.length; i++) {
        dItem[i].onclick = clearItem;
    }

    // Добавляем событие на выполнение таски. Чтобы поменять стиль
    var todo = document.getElementsByName('checkbox-test');
    for (var i = 0; i < todo.length; i++) {
        todo[i].onclick = clickTodo;
    }

};

/**
 * Меняем стиль выполненной таски
 */
function clickTodo() {
    this.parentElement.lastElementChild.classList.toggle('label-complite');
}

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
 * Отображение только выполненных тасок
 */
function showComplited() {
    var todo = document.getElementsByName('checkbox-test');
    for (var i = 0; i < todo.length; i++) {
        if (todo[i].checked) {
            todo[i].parentElement.parentElement.classList.toggle('unvisible', false); // На выполненных выключаем класс
        }
        if (!todo[i].checked) {
            todo[i].parentElement.parentElement.classList.toggle('unvisible', true); // НА  не выполненых включаем
        }
    }
}

/**
 * Отобразить только активные таски
 */
function showActive() {
    var todo = document.getElementsByName('checkbox-test');
    for (var i = 0; i < todo.length; i++) {
        if (todo[i].checked) {
            todo[i].parentElement.parentElement.classList.toggle('unvisible', true);
        }
        if (!todo[i].checked) {
            todo[i].parentElement.parentElement.classList.toggle('unvisible', false);
        }
    }
}

/**
 * отобразить все таски
 */
function showAll() {
    var todo = document.getElementsByName('checkbox-test');
    for (var i = 0; i < todo.length; i++) {
        todo[i].parentElement.parentElement.classList.toggle('unvisible', false);

    }

}

/**
 * Инициализация при старте страницы
 * Отображаем только те таски в соответсвии с параметром отображения
 * Меняем  стиль на выполненных тасках
 * Обновляем счетчик
 */
function init() {
    var radiobox = document.querySelectorAll('.radiokbox');
    for (var i = 0; i < radiobox.length; i++) {
        if (radiobox[i].checked) {
            showProp[radiobox[i].id]();
        }
    }
    var todo = document.getElementsByName('checkbox-test');
    for (var i = 0; i < todo.length; i++) {
        if (todo[i].checked) {
            todo[i].parentElement.lastElementChild.classList.toggle('label-complite');
        }
    }
    changeCount();
}

/**
 * Создание новой таски
 * @returns {boolean}
 */
function newTodo() {
    var nt = document.getElementById('input_section');
    var todo = nt.value;
    if (!todo) {
        return false; // Если ничего не введено, то завершаем
    }
    nt.value = null; // Обнуляем поле ввода

    var temp = document.querySelector('.template');
    var div = temp.cloneNode(true); // Клонируем шаблон
    div.classList.toggle('template');
    div.querySelector('.label').textContent = todo;  // Добавляем текст в шаблон
    temp.parentNode.appendChild(div); // Вставляем объект
    var dItem = document.getElementsByName("del_item");  // Вешаем событие на удаление
    for (var i = 0; i < dItem.length; i++) {
        dItem[i].onclick = clearItem;
    }
    changeCount(); // Пересчитываем счетчик
    return false;
}

/**
 * Обновление счетчика тасок
 */
function changeCount() {
    var count = document.getElementsByName('checkbox-test').length - 1;
    var elemCount = document.querySelector('.count');
    elemCount.innerHTML = count + ' item';

}

/**
 * Удаление всех выполненных тасок
 */
function clearComplite() {
    var todo = document.getElementsByName('checkbox-test');
    for (var i = todo.length - 1; i >= 0; i--) {
        var li = todo[i].parentNode.parentNode;
        if (todo[i].checked) {
            li.parentNode.removeChild(li);
        }
    }
    changeCount();
}

/**
 * Удаление 1 таски
 */
function clearItem() {
    var li = this.parentNode.parentNode;
    li.parentNode.removeChild(li);
    changeCount();
}

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var TodoList = require('./todolist.js');

/**
 * ЗАпуск
 */
window.onload = function () {
    // проверяем поддержку
    var startTodo = [];
    var lists = document.getElementsByName('TodoList');
    for (var i = 0; i < lists.length; i++) {
        startTodo[i] = new TodoList(lists[i]);
        startTodo[i].addTask('привет мир ' + i);

    }

};



},{"./todolist.js":2}],2:[function(require,module,exports){
'use strict';

class Task {
    constructor(todo, taskName, checked) {
        this.todo = todo;
        this.check = checked;
        this.task = todo.template.cloneNode(true);
        this.task.classList.toggle('template', false);
        this.checkBox = this.task.querySelector('.checkbox');
        if (this.checkBox) {
            this.checkBox.checked = checked;
        }
        this.task.querySelector('.label').innerHTML = taskName;

        this.addListnerCheckTodo();
        this.addListnerDelLine();
    }

    get getTask() {
        return this.task;
    }

    set setTask(task) {
        this.task = task;
        this.check = task.querySelector('.checkbox').checked;
        this.checkBox = task.querySelector('.checkbox');
        this.addListnerCheckTodo();
        this.addListnerDelLine();
    }


    get getCheckBox() {
        return this.checkBox;
    }

    get getCheckBoxStatus() {
        return this.check;
    }

    set setCheckBoxStatus(status) {
        if (status === this.check) {
            return this.check;
        }
        if (status) {
            this.checkBox.checked = true;
            this.check = true;
            this.task.querySelector('.label').classList.toggle('label-complite', true);
        } else {
            this.checkBox.checked = false;
            this.check = false;
            this.task.querySelector('.label').classList.toggle('label-complite', false);
        }
    }

    get getViewStatus() {
        return this.task.style.display;
    }

    set setViewStatus(stat) {
        if (!stat) {
            this.task.style.display = 'none';
        } else {
            this.task.style.display = '';
        }
    }


    /**
     * Листнер на выбор таска на все таски
     * @param {Element}checkbox
     * @returns {TodoList}
     */
    addListnerCheckTodo() {
        var t = this;
        if (!this.checkBox) {
            return this;
        }
        this.checkBox.addEventListener('click', function () {
            var l = this.closest('.todo_item').querySelector('.label');
            l.classList.toggle('label-complite');
            var v = this.checked;
            t.setCheckBoxStatus = v;
        });

        return this;

    }

    /**
     * Добавление листнера на удаление таски.
     * @param {Element}div
     * @returns {TodoList}
     */
    addListnerDelLine() {
        var t = this;
        var dItem = this.task.querySelectorAll('.del_item_button');
        for (var i = 0; i < dItem.length; i++) {
            dItem[i].addEventListener('click', function () {
                t.deleteTask();
                t.todo.changeCount();
            });
        }

        return this;
    }

    deleteTask() {
        if (this.task.parentNode) {
            this.task.parentNode.removeChild(this.task);
        }
    }


}

module.exports = class TodoList {

    /**
     * Конструктор тудушки. на вход принимает корневой элемент тодолиста
     * @param {Element}bodyElement
     */
    constructor(bodyElement) {
        this.list = bodyElement;
        this.changeViewButtonsElem = bodyElement.querySelectorAll('.radiokbox');
        this.inputForm = bodyElement.querySelector('.input_form');
        this.template = bodyElement.querySelector('.template');
        this.tasks = [];

        this.initTodo();
    }


    /**
     * Инициализация ТодоЛиста. Переключение в видимое состяние тасок,
     * добавление обработчиков событий
     * @returns {TodoList}
     */
    initTodo() {

        for (var j = 0; j < this.changeViewButtonsElem.length; j++) {
            if (this.changeViewButtonsElem[j].checked) {
                this.show(this.changeViewButtonsElem[j].value);
            }
        }
        // this.changeCount();
        this.addListnerRadio();
        this.addListnerInputForm();
        this.addListnerButtonClear();
        this.addListnerNewTodoList();
        this.addListnerDelTodo();

        return this;
    }

    /**
     * Обновление счетчика заданий
     * @returns {TodoList}
     */
    changeCount() {
        var count = this.tasks.length;
        for (var i = count - 1; i >= 0; i--) {
            if (!this.tasks[i].task.parentNode) {
                this.tasks.splice(i, 1);
            }
        }
        count = this.tasks.length;
        var elemCount = this.list.querySelector('.count');
        if (!elemCount) {
            return this;
        }
        elemCount.innerHTML = count + ' item';

        return this;
    }


    /**
     * Запуск функции смены вида
     * @param {String}view
     * @returns {TodoList}
     */
    show(view) {
        if (view === 'complited') {
            this.showComplited();
        } else if (view === 'active') {
            this.showActive();
        } else {
            this.showAll();
        }

        return this;
    }

    /**
     * Листнер на перещелкивание вида
     * @returns {TodoList}
     */
    addListnerRadio() {
        for (var i = 0; i < this.changeViewButtonsElem.length; i++) {
            var t = this;
            this.changeViewButtonsElem[i].addEventListener('click', function () {
                t.show(this.value);

            });
        }

        return this;
    }

    /**
     * Листнер на ввод новой таски
     * @returns {TodoList}
     */
    addListnerInputForm() {
        var t = this;
        var nt = this.inputForm.querySelector('.input_section');
        this.inputForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var todo = nt.value;
            t.addTask(todo);
            nt.value = null;

        });

        return this;
    }

    /**
     * Добавдение новой таски в тодолист
     * @param {String}newT
     * @returns {TodoList}
     */
    addTask(newT) {
        if (!newT) {
            return this; // Если ничего не введено, то завершаем
        }
        var t = new Task(this, newT, false);
        this.tasks.push(t);
        this.template.parentNode.appendChild(t.task); // Вставляем объект
        this.changeCount();

        return this;
    }


    /**
     * Добавление листнера на удаление todo list.
     * @returns {TodoList}
     */
    addListnerDelTodo() {
        var t = this;
        var dItem = this.list.querySelector('.del_todo_list');
        if (!dItem) {
            return this;
        }
        dItem.addEventListener('click', function () {
            var i = document.getElementsByName('TodoList').length;
            if (i <= 1) {
                t.createNewTodo('new_list');
            }
            t.list.parentNode.removeChild(t.list);
        });


        return this;
    }

    /**
     * Добавление листнера на удаление всех готовых заданий
     * @returns {TodoList}
     */
    addListnerButtonClear() {
        var t = this;
        var clButton = this.list.querySelector('.button_clear');
        if (!clButton) {
            return this;
        }
        clButton.addEventListener('click', function () {
            t.clearComplite();
        });

        return this;
    }


    /**
     * Удаление всех готовых тасок
     * @returns {TodoList}
     */
    clearComplite() {
        for (var i = this.tasks.length - 1; i >= 0; i--) {
            if (this.tasks[i].check) {
                this.tasks[i].deleteTask();
            }
        }
        this.changeCount();

        return this;
    }


    /**
     * Отображение только выполненных тасок
     * @returns {TodoList}
     */
    showComplited() {
        for (var i = 0; i < this.tasks.length; i++) {
            var checked = this.tasks[i].check;
            if (checked) {
                this.tasks[i].setViewStatus = true;
                // На выполненных выключаем класс
            }
            if (!checked) {
                this.tasks[i].setViewStatus = false;
                // НА  не выполненых включаем
            }
        }

        return this;
    }

    /**
     * Отобразить только активные таски
     * @returns {TodoList}
     */
    showActive() {

        for (var i = 0; i < this.tasks.length; i++) {
            var checked = this.tasks[i].check;
            if (checked) {
                this.tasks[i].setViewStatus = false;
            }
            if (!checked) {
                this.tasks[i].setViewStatus = true;
            }
        }

        return this;
    }

    /**
     * отобразить все таски
     * @returns {TodoList}
     */
    showAll() {
        for (var i = 0; i < this.tasks.length; i++) {
            this.tasks[i].setViewStatus = true;
        }

        return this;
    }

    /**
     * Листнер на создание нового тодолиста
     * @returns {TodoList}
     */
    addListnerNewTodoList() {
        var t = this;
        var clButton = this.list.querySelectorAll('.new_list_button');
        for (var i = 0; i < clButton.length; i++) {
            clButton[i].addEventListener('click', function () {
                t.createNewTodo(this.value);

            });
        }

        return this;
    }

    /**
     * Создание нового тодолиста
     * @param {String}type new_list||copy_List
     * @returns {TodoList}
     */
    createNewTodo(type) {

        var count = document.getElementsByName('TodoList').length;
        var div = this.list.cloneNode(true);
        var menu = div.querySelectorAll('.radiokbox');
        for (var j = 0; j < menu.length; j++) {
            var menuName = 'menu' + (count + 1);
            menu[j].setAttribute('name', menuName);
        }
        var newTodo = new TodoList(div);
        var divName = newTodo.list.querySelector('.list_header .input_section');
        var list = newTodo.list.querySelectorAll('.task');
        var i = 1;
        if (type === 'new_list') {
            divName.value = 'New Todo list';

            for (i = 1; i < list.length; i++) {
                list[i].parentNode.removeChild(list[i]);
            }
        } else {
            for (i = 1; i < list.length; i++) {
                var t = new Task(newTodo);
                t.setTask = list[i];
                newTodo.tasks.push(t);
            }
            divName.value = divName.value + ' clone';
        }
        this.list.parentNode.appendChild(newTodo.list);

        return this;
    }


}

},{}]},{},[1]);

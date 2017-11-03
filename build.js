var TodoList =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__todolist__ = __webpack_require__(1);




debugger;
/**
 * ЗАпуск
 */
window.onload = function () {
    // проверяем поддержку

    var startTodo = [];
    var lists = document.querySelectorAll('.body-todo-list');
    for (var i = 0; i < lists.length; i++) {
        startTodo[i] = new __WEBPACK_IMPORTED_MODULE_0__todolist__["a" /* default */](lists[i]);
        startTodo[i].addTask('привет мир ' + i);
    }
};

exports.TodoList = __WEBPACK_IMPORTED_MODULE_0__todolist__["a" /* default */];

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tasks__ = __webpack_require__(2);




class TodoList {

    /**
     * Конструктор тудушки. на вход принимает корневой элемент тодолиста
     * @param {Element}bodyElement
     */
    constructor(bodyElement) {
        this.list = bodyElement;
        this.changeViewButtonsElem = bodyElement.querySelectorAll('.change-view-buttons__radiobox');
        this.inputForm = bodyElement.querySelector('.input-form');
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
        console.info(this);
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
            this.changeViewButtonsElem[i].addEventListener('click', but => {
                this.show(but.target.value);
            });
        }

        return this;
    }

    /**
     * Листнер на ввод новой таски
     * @returns {TodoList}
     */
    addListnerInputForm() {
        var nt = this.inputForm.querySelector('.input-form__input-section');
        this.inputForm.addEventListener('submit', event => {
            event.preventDefault();
            var taskName = nt.value;
            this.addTask(taskName);
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
        var t = new __WEBPACK_IMPORTED_MODULE_0__tasks__["a" /* default */](this, newT, false, () => {
            this.changeCount();
        });
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
        var dItem = this.list.querySelector('.del-todo-list');
        if (!dItem) {
            return this;
        }
        dItem.addEventListener('click', () => {
            var i = document.querySelectorAll('.body-todo-list').length;
            if (i <= 1) {
                this.createNewTodo('new_list');
            }
            this.list.parentNode.removeChild(this.list);
        });

        return this;
    }

    /**
     * Добавление листнера на удаление всех готовых заданий
     * @returns {TodoList}
     */
    addListnerButtonClear() {
        var clButton = this.list.querySelector('.button-clear-complite');
        if (!clButton) {
            return this;
        }
        clButton.addEventListener('click', () => {
            this.clearComplite();
        });

        return this;
    }

    /**
     * Удаление всех готовых тасок
     * @returns {TodoList}
     */
    clearComplite() {
        for (var i = this.tasks.length - 1; i >= 0; i--) {
            if (this.tasks[i].isCheck) {
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
            var checked = this.tasks[i].isCheck;
            if (checked) {
                this.tasks[i].viewStatus = true;
                // На выполненных выключаем класс
            }
            if (!checked) {
                this.tasks[i].viewStatus = false;
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
            var checked = this.tasks[i].isCheck;
            if (checked) {
                this.tasks[i].viewStatus = false;
            }
            if (!checked) {
                this.tasks[i].viewStatus = true;
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
            this.tasks[i].viewStatus = true;
        }

        return this;
    }

    /**
     * Листнер на создание нового тодолиста
     * @returns {TodoList}
     */
    addListnerNewTodoList() {

        var clButton = this.list.querySelectorAll('.new-list-button');
        for (var i = 0; i < clButton.length; i++) {
            clButton[i].addEventListener('click', but => {
                this.createNewTodo(but.target.value);
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
        var count = document.querySelectorAll('.body-todo-list').length;
        var div = this.list.cloneNode(true);
        var menu = div.querySelectorAll('.change-view-buttons__radiobox');
        for (var j = 0; j < menu.length; j++) {
            var menuName = 'menu' + (count + 1);
            menu[j].setAttribute('name', menuName);
        }
        var newTodo = new TodoList(div);
        var divName = newTodo.list.querySelector('.list-name__input-name');
        var list = newTodo.list.querySelectorAll('.task');
        var i = 1;
        if (type === 'New list') {
            divName.value = 'New Todo list';

            for (i = 1; i < list.length; i++) {
                list[i].parentNode.removeChild(list[i]);
            }
        } else {
            for (i = 1; i < list.length; i++) {
                var t = new __WEBPACK_IMPORTED_MODULE_0__tasks__["a" /* default */](newTodo);
                t.taskNode = list[i];
                newTodo.tasks.push(t);
            }
            divName.value = divName.value + ' clone';
        }
        this.list.parentNode.appendChild(newTodo.list);

        return this;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (TodoList);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Task {
    constructor(todo, taskName, checked, callback) {
        this.todo = todo;
        this.isCheck = checked;
        this.task = todo.template.cloneNode(true);
        this.task.classList.toggle('template', false);
        this.checkBox = this.task.querySelector('.task-todo-item__checkbox');
        if (this.checkBox) {
            this.checkBox.checked = checked;
        }
        this.task.querySelector('.task-todo-item__label').innerHTML = taskName;

        this.addListnerCheckTodo();
        this.addListnerDelLine();
        this.callback = callback;
    }

    get taskNode() {
        return this.task;
    }

    set taskNode(task) {
        this.task = task;
        this.isCheck = task.querySelector('.task-todo-item__checkbox').checked;
        this.checkBox = task.querySelector('.task-todo-item__checkbox');
        this.addListnerCheckTodo();
        this.addListnerDelLine();
    }

    get checkBoxNode() {
        return this.checkBox;
    }

    get checkBoxStatus() {
        return this.isCheck;
    }

    set checkBoxStatus(status) {
        if (status === this.isCheck) {
            return this.isCheck;
        }
        if (status) {
            this.checkBox.checked = true;
            this.isCheck = true;
            this.task.querySelector('.task-todo-item__label').classList.toggle('task-todo-item__label-complite', true);
        } else {
            this.checkBox.checked = false;
            this.isCheck = false;
            this.task.querySelector('.task-todo-item__label').classList.toggle('task-todo-item__label-complite', false);
        }
    }

    get viewStatus() {
        return this.task.style.display;
    }

    set viewStatus(stat) {
        if (!stat) {
            this.task.classList.toggle('task_invisible', true);
        } else {
            this.task.classList.toggle('task_invisible', false);
        }
    }

    /**
     * Листнер на выбор таска на все таски b
     * @param {Element}checkbox
     * @returns {TodoList}
     */
    addListnerCheckTodo() {
        if (!this.checkBox) {
            return this;
        }
        this.checkBox.addEventListener('click', () => {
            var itemLabel = this.task.querySelector('.task-todo-item__label');
            itemLabel.classList.toggle('.task-todo-item__label-complite');
            this.checkBoxStatus = this.checkBox.checked;
        });

        return this;
    }

    /**
     * Добавление листнера на удаление таски.
     * @param {Element}div
     * @returns {TodoList}
     */
    addListnerDelLine() {
        var dItem = this.task.querySelectorAll('.task__del-item-button');
        for (var i = 0; i < dItem.length; i++) {
            dItem[i].addEventListener('click', () => {
                this.deleteTask();
            });
        }

        return this;
    }

    deleteTask() {
        if (this.task.parentNode) {
            this.task.parentNode.removeChild(this.task);
        }
        this.callback();
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Task);

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map
'use strict';

import Task from './tasks';

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
            this.changeViewButtonsElem[i].addEventListener('click', (but) => {
                this.show( but.target.value);
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
        this.inputForm.addEventListener('submit', (event) => {
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
        var t = new Task(this, newT, false, ()=> {
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
        dItem.addEventListener('click',  () =>{
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
            clButton[i].addEventListener('click',  (but) =>{
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
                var t = new Task(newTodo);
                t.taskNode = list[i];
                newTodo.tasks.push(t);
            }
            divName.value = divName.value + ' clone';
        }
        this.list.parentNode.appendChild(newTodo.list);

        return this;
    }

}

export default  TodoList;

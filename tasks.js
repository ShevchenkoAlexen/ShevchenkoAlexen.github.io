'use strict';

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
        this.checkBox.addEventListener('click',  () =>{
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


export default Task;

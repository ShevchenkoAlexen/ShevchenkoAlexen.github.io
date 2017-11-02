'use strict';

import TodoList from'./todolist';

debugger;
/**
 * ЗАпуск
 */
window.onload = function () {
    // проверяем поддержку

    var startTodo = [];
    var lists = document.querySelectorAll('.body-todo-list');
    for (var i = 0; i < lists.length; i++) {
        startTodo[i] = new TodoList(lists[i]);
        startTodo[i].addTask('привет мир ' + i);

    }

};


exports.TodoList = TodoList;

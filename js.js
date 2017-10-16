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



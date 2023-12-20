/* eslint-disable no-unused-vars */
// models/todo.js
'use strict';
const { Op } = require('sequelize');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueTasks = await Todo.overdue();
      overdueTasks.forEach(task => console.log(task.displayableString()));
      console.log("\n");

      console.log("Due Today");
      const todayTasks = await Todo.dueToday();
      todayTasks.forEach(task => console.log(task.displayableString()));
      console.log("\n");

      console.log("Due Later");
      const laterTasks = await Todo.dueLater();
      laterTasks.forEach(task => console.log(task.displayableString()));
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            dueDate: new Date(),
          },
          completed: false,
        },
      });
    }

    static async dueToday() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return await Todo.findAll({
        where: {
          dueDate: today,
          completed: false,
        },
      });
    }

    static async dueLater() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return await Todo.findAll({
        where: {
          dueDate: {
            dueDate: today,
          },
          completed: false,
        },
      });
    }

    static async markAsComplete(id) {
      const task = await Todo.findByPk(id);
      if (task) {
        task.completed = true;
        await task.save();
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }

  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};

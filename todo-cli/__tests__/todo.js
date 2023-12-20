/* eslint-disable no-undef */

const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();


const ydate = new Date();
ydate.setDate(ydate.getDate() - 1);

    
const tdate = new Date();
tdate.setDate(tdate.getDate() + 1);



describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
  });
  test("A test that checks creating a new todo.", () => {
    const todoItemCount = all.length;
    
    add({
      title: "first todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });

    expect(all.length).toBe(todoItemCount + 1);

    add({
      title: "second todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });

    expect(all.length).toBe(todoItemCount + 2);

    add({
      title: "third todo",
      completed: false,
      dueDate: ydate.toISOString().slice(0, 10),
    });

    
    expect(all.length).toBe(todoItemCount + 3);

    add({
      title: "fourth todo",
      completed: false,
      dueDate: tdate.toISOString().slice(0, 10),
    });

    
    expect(all.length).toBe(todoItemCount + 4);

   

  });

  test("...checks marking a todo as completed.", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
    expect(all[1].completed).toBe(false);
    markAsComplete(1);
    expect(all[1].completed).toBe(true);
    expect(all[2].completed).toBe(false);

  });

  test("...checks retrieval of overdue items.", () => {

    add({
      title: "Overdue1 Todo",
      completed: false,
      dueDate: ydate.toISOString().slice(0, 10),
    });
    const overdueItems = overdue();
    
    expect(overdueItems.length).toBe(2);
    
    add({
      title: "Overdue2 Todo",
      completed: false,
      dueDate: ydate.toISOString().slice(0, 10),
    });
   
    expect(overdueItems.length).toBe(2);
    

  });

  test("...checks retrieval of due today items.", () => {

    add({
      title: "Due Today Todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    const dueTodayItems = dueToday();

    expect(dueTodayItems.length).toBe(4);

  });

  test("...checks retrieval of due later items.", () => {
    
          
      const tdate = new Date();
      tdate.setDate(tdate.getDate() + 1);
    add({
      title: "Due Later Todo",
      completed: false,
      dueDate: tdate.toISOString().slice(0, 10),

    });
    const dueLaterItems = dueLater();

    expect(dueLaterItems.length).toBe(2);
   
  });
});
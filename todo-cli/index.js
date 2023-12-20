const { connect } = require("./connectDB.js");
const Todo = require("./TodoModel.js");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title:"third Item",
      dueDate: new Date(),
      completed: false,
    });
    console.log("Created todo with ID : ${todo.id}");
  }catch(error){
    console.log(error)
  }
};


const countItems = async () => {
  try{
    const todos = await Todo.count();
    console.log(todos)
  }catch (error) {
    console.error(error);
  }
}

const getAllTodos = async () => {
  try{
    const todos = await Todo.findAll();
    const todoList = todos.map(todo => todo.displayableString()).join("\n");
    console.log(todoList);

  }catch (error) {
    console.error(error);
  }
}

(async () => {
  //await createTodo();
  
  await getAllTodos();
 
})();
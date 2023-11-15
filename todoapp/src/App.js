import { TodoItemList } from "./TodoItemList.js";
import { TodoListView } from "./TodoListView.js";

export class App {
  constructor() {
    this.todoList = new TodoItemList();
    this.todoListView = new TodoListView(this.todoList);
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const todoTitle = inputElement.value.trim();

      if (todoTitle) {
        const newTodoItem = this.todoList.addItem(todoTitle);
        const listItem = this.todoListView.createTodoListItem(newTodoItem);
        this.todoListView.todoListElement.appendChild(listItem);
        inputElement.value = "";
        this.todoListView.updateTodoCount();
      }
    });
  }
}

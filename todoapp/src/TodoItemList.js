import { TodoItem } from "./TodoItem.js";

export class TodoItemList {
  constructor() {
    this.items = [];
    this.nextId = 1;
  }

  addItem(title) {
    const newItem = new TodoItem(title, this.nextId++);
    this.items.push(newItem);
    return newItem;
  }

  removeItem(itemId) {
    const index = this.items.findIndex((item) => item.id === itemId);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
  getItems() {
    return this.items;
  }
}

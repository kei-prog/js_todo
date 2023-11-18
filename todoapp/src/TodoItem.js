export class TodoItem {
  constructor(title, id) {
    this.id = id;
    this.title = title;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

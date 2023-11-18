export class TodoListView {
  constructor(todoList) {
    this.todoList = todoList;
    this.todoListElement = document.querySelector("#js-todo-list");
    this.todoCountElement = document.querySelector("#js-todo-count");
  }

  createTodoListItem(todoItem) {
    const listItem = document.createElement("li");
    listItem.className = "todo-list-item";
    listItem.dataset.id = todoItem.id;

    // チェックボックス
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = todoItem.completed;
    checkbox.addEventListener("change", () => {
      todoItem.toggleCompleted();
      this.updateTodoCount();
    });

    // タイトル
    const title = document.createElement("span");
    title.className = "title";
    title.textContent = todoItem.title;

    // 編集ボタン
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "編集";
    editButton.addEventListener("click", () => {
      if (editButton.textContent === "保存") {
        const inputField = listItem.querySelector("input[type='text']");
        todoItem.title = inputField.value;
        title.textContent = inputField.value;
        listItem.replaceChild(title, inputField);
        editButton.textContent = "編集";
      } else {
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = title.textContent;
        inputField.className = "title";
        inputField.maxLength = 25;

        listItem.replaceChild(inputField, title);
        inputField.focus();
        editButton.textContent = "保存";
      }
    });

    // 削除ボタン
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", () => {
      if (confirm("本当に削除してもよろしいですか？")) {
        this.todoList.removeItem(todoItem.id);
        this.todoListElement.removeChild(listItem);
        this.updateTodoCount();
      }
    });

    const buttons = document.createElement("div");
    buttons.className = "buttons";
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    listItem.appendChild(checkbox);
    listItem.appendChild(title);
    listItem.appendChild(buttons);

    return listItem;
  }

  updateTodoCount() {
    const totalItems = this.todoList.getItems().length;
    const completedCount = this.todoList
      .getItems()
      .filter((item) => item.completed).length;
    const incompleteCount = totalItems - completedCount;
    this.todoCountElement.textContent = `Todoアイテム数: ${totalItems} (完了済み: ${completedCount}, 未完了: ${incompleteCount})`;
  }
}

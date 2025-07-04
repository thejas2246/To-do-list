export class CreateProject {
  toDoList = [];

  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  addListToProject(list) {
    this.toDoList.push(list);
  }
}

export class CreateList {
  constructor(ListName, ListDescription, dueDate, priority, checkList) {
    this.ListName = ListName;
    this.ListDescription = ListDescription;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checkList = checkList;
  }
}

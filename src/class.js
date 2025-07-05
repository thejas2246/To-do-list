export class CreateProject {
  toDoList = [];

  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.uid = crypto.randomUUID();
  }

  addListToProject(list) {
    this.toDoList.push(list);
  }
}

export class CreateList {
  constructor(ListName, dueDate, priority) {
    this.ListName = ListName;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checkList = false;
  }
}

export class StoreObjects {
  static projectArray = [];
  static currentProject = "";
  static addProjectToArray(project) {
    this.projectArray.push(project);
  }
}

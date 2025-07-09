export class CreateProject {
  toDoList = [];

  constructor(name, description, isDefault = false) {
    this.name = name;
    this.description = description;
    this.uid = crypto.randomUUID();
    this.totalTask = 0;
    this.completedTask = 0;
    this.dueTask = 0;
    this.isDefault = false;
  }

  addListToProject(list) {
    this.toDoList.push(list);
  }
}

export class CreateList {
  constructor(listName, dueDate, priority) {
    this.listName = listName;
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

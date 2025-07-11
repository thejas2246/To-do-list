import { CreateProject, StoreObjects, CreateList } from "./class";

export function createProjectObject(name, description) {
  const project = new CreateProject(name, description);
  StoreObjects.addProjectToArray(project);
}

export function createListObject(name, dueDate, priority) {
  const list = new CreateList(name, dueDate, priority);
  return list;
}

export function addListToCurrentProject(list) {
  for (let project of StoreObjects.projectArray) {
    if (project.uid == StoreObjects.currentProject) {
      project.toDoList.push(list);
    }
  }
}

export function updateTotalTask() {
  for (let project of StoreObjects.projectArray) {
    if (project.uid == StoreObjects.currentProject) {
      project.totalTask = project.toDoList.length;
      project.completedTask = countCompletedTask(project);
      project.dueTask = project.totalTask - project.completedTask;
    }
  }
}

function countCompletedTask(project) {
  let count = 0;
  for (let list of project.toDoList) {
    console.log(list.checkList);
    if (list.checkList == true) {
      count++;
    }
  }
  return count;
}

export function createDefaultObject() {
  const defaultObj = new CreateProject(
    "Welcome to Project Alpha!",
    "Here’s an overview of your current tasks and project progress. Stay organized and efficient with TodoMaster.",
    true
  );
  StoreObjects.addProjectToArray(defaultObj);
}

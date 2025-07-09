import { StoreObjects } from "./class";

export function updateSideDisplay() {
  const projectButtons = document.querySelector(".project-buttons");
  projectButtons.textContent = "";
  let count = 1;

  for (let project of StoreObjects.projectArray) {
    const projectButton = document.createElement("button");

    projectButton.setAttribute("data-id", project.uid);
    projectButton.setAttribute("class", "button-default");
    projectButton.textContent = `Project ${count}`;

    projectButton.addEventListener("click", () => {
      updateProjectDetailsOnScreen(project);
      setCurrentProject(project);
      updateListOnScreen(project);
      updateButtonColor(project);
    });
    projectButtons.appendChild(projectButton);
    count++;
  }
}

export function setCurrentProject(project) {
  StoreObjects.currentProject = project.uid;
}

export function updateProjectDetailsOnScreen(project) {
  console.log(project);
  const projectHeadingSection = document.querySelector(".top");
  projectHeadingSection.textContent = "";

  const projectHeading = document.createElement("h1");
  const projectDescription = document.createElement("p");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const editButtonContainer = document.createElement("div");
  editButtonContainer.setAttribute("class", "edit-container");
  projectHeadingSection.appendChild(projectHeading);
  projectHeadingSection.appendChild(projectDescription);

  editButtonContainer.appendChild(editButton);
  if (project.isDefault == false) {
    editButtonContainer.appendChild(deleteButton);
  }
  projectHeadingSection.appendChild(editButtonContainer);

  editButton.textContent = "Edit Project";
  deleteButton.textContent = "Delete Project";

  projectHeading.textContent = project.name;
  projectDescription.textContent = project.description;

  const projectStatistic = document.querySelector(".middle-container");
  projectStatistic.textContent = " ";
  const totalTaskContainer = document.createElement("div");
  const completedTaskContainer = document.createElement("div");
  const dueTaskContainer = document.createElement("div");

  const totalTask = document.createElement("p");
  const totalTaskText = document.createElement("p");
  totalTaskText.textContent = "total task";
  const completedTask = document.createElement("p");
  const completedTaskText = document.createElement("p");
  completedTaskText.textContent = "completed task";

  const dueTask = document.createElement("p");
  const dueTaskText = document.createElement("p");
  dueTaskText.textContent = "due task";

  totalTask.textContent = project.totalTask;
  completedTask.textContent = project.completedTask;
  dueTask.textContent = project.dueTask;

  totalTaskContainer.appendChild(totalTask);
  totalTaskContainer.appendChild(totalTaskText);
  completedTaskContainer.appendChild(completedTask);
  completedTaskContainer.appendChild(completedTaskText);
  dueTaskContainer.appendChild(dueTask);
  dueTaskContainer.appendChild(dueTaskText);

  projectStatistic.appendChild(totalTaskContainer);
  projectStatistic.appendChild(completedTaskContainer);
  projectStatistic.appendChild(dueTaskContainer);
}

export function updateDisplayOnListSubmission() {
  for (let project of StoreObjects.projectArray) {
    if (project.uid == StoreObjects.currentProject) {
      updateProjectDetailsOnScreen(project);
      updateListOnScreen(project);
    }
  }
}

export function updateListOnScreen(project) {
  const listContainer = document.querySelector(".bottom");
  const listGrid = document.querySelector(".bottom-list-container");
  listGrid.textContent = "";
  for (let list of project.toDoList) {
    const itemContainer = document.createElement("div");
    const checkedList = document.createElement("input");
    checkedList.setAttribute("type", "checkbox");
    const listName = document.createElement("h3");
    listName.textContent = list.listName;
    const dueDate = document.createElement("p");
    dueDate.textContent = list.dueDate;
    const priority = document.createElement("p");
    priority.textContent = list.priority;
    if (list.priority == "low") {
      priority.classList.add("low");
      priority.classList.remove("medium");
      priority.classList.remove("high");
    } else if (list.priority == "medium") {
      priority.classList.add("medium");
      priority.classList.remove("low");
      priority.classList.remove("high");
    } else {
      priority.classList.add("high");
      priority.classList.remove("low");
      priority.classList.remove("medium");
    }
    itemContainer.appendChild(checkedList);
    itemContainer.appendChild(listName);
    itemContainer.appendChild(dueDate);
    itemContainer.appendChild(priority);

    listGrid.appendChild(itemContainer);
  }
  listContainer.appendChild(listGrid);
}

export function updateButtonColor() {
  for (let project of StoreObjects.projectArray) {
    let colorButton = document.querySelector(`[data-id="${project.uid}"]`);
    if (project.uid == StoreObjects.currentProject) {
      colorButton.classList.add("button-active");
      colorButton.classList.remove("button-default");
    } else {
      colorButton.classList.add("button-default");
      colorButton.classList.remove("button-active");
    }
  }
}

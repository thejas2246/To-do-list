import { StoreObjects } from "./class";

export function updateSideDisplay() {
  const projectButtons = document.querySelector(".project-buttons");
  projectButtons.textContent = "";
  let count = 1;

  for (let project of StoreObjects.projectArray) {
    const projectButton = document.createElement("button");

    projectButton.setAttribute("data-id", project.uid);
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

function setCurrentProject(project) {
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
  editButtonContainer.appendChild(deleteButton);
  projectHeadingSection.appendChild(editButtonContainer);

  editButton.textContent = "Edit Project";
  deleteButton.textContent = "Delete Project";

  projectHeading.textContent = project.name;
  projectDescription.textContent = project.description;

  const projectStatistic = document.querySelector(".middle-container");
  projectStatistic.textContent = " ";
  const totalTask = document.createElement("p");
  const completedTask = document.createElement("p");
  const dueTask = document.createElement("p");

  totalTask.textContent = project.totalTask;
  completedTask.textContent = project.completedTask;
  dueTask.textContent = project.dueTask;

  projectStatistic.appendChild(totalTask);
  projectStatistic.appendChild(completedTask);
  projectStatistic.appendChild(dueTask);
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
  listContainer.textContent = "";
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

    itemContainer.appendChild(checkedList);
    itemContainer.appendChild(listName);
    itemContainer.appendChild(dueDate);
    itemContainer.appendChild(priority);

    listContainer.appendChild(itemContainer);
  }
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

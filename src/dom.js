import { StoreObjects } from "./class";
import { openEditForm } from "./form";
import editIcon from "./assets/icons/edit.svg";
import trashIcon from "./assets/icons/trash.svg";
import { format } from "date-fns";
import calenderIcon from "./assets/icons/calender.svg";
import { updateTotalTask } from "./create-object";

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

  if (project.isDefault == false) {
    editButtonContainer.appendChild(editButton);
    editButtonContainer.appendChild(deleteButton);
  }
  projectHeadingSection.appendChild(editButtonContainer);

  editButton.textContent = "+ Edit Project";
  deleteButton.textContent = "Delete Project";
  editButton.setAttribute("class", "project-edit-button");

  editButton.addEventListener("click", openEditForm);
  deleteButton.addEventListener("click", deleteProject);

  deleteButton.setAttribute("class", "project-delete-button");
  projectHeading.textContent = project.name;
  projectDescription.textContent = project.description;

  const projectStatistic = document.querySelector(".middle-container");
  projectStatistic.textContent = " ";
  const totalTaskContainer = document.createElement("div");
  const completedTaskContainer = document.createElement("div");
  const dueTaskContainer = document.createElement("div");

  const totalTask = document.createElement("p");
  totalTask.setAttribute("class", "total");
  const totalTaskText = document.createElement("p");
  totalTaskText.textContent = "total task";
  const completedTask = document.createElement("p");
  completedTask.setAttribute("class", "complete");
  const completedTaskText = document.createElement("p");
  completedTaskText.textContent = "completed task";

  const dueTask = document.createElement("p");
  dueTask.setAttribute("class", "due");

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
    const projectDetailsLeft = document.createElement("div");
    const projectDetailsRight = document.createElement("div");
    const calenderImage = document.createElement("img");
    calenderImage.src = calenderIcon;

    const projectEditIcon = document.createElement("img");
    const projectEditButton = document.createElement("button");
    const listTrashIcon = document.createElement("img");
    const listTrashButton = document.createElement("button");
    projectEditIcon.src = editIcon;
    listTrashIcon.src = trashIcon;
    projectEditButton.appendChild(projectEditIcon);
    projectEditButton.addEventListener("click", () => {
      editList(list.uid, project);
    });
    listTrashButton.appendChild(listTrashIcon);

    listTrashButton.setAttribute("list-id", list.uid);
    listTrashButton.addEventListener("click", (e) => {
      deleteList(list.uid, project);
      updateTotalTask();
      updateProjectTaskNumber(project);
    });
    const itemContainer = document.createElement("div");

    const listDetailContainer = document.createElement("div");
    const listDateContainer = document.createElement("div");

    itemContainer.appendChild(listDetailContainer);
    itemContainer.appendChild(listDateContainer);

    const checkedList = document.createElement("input");
    checkedList.setAttribute("type", "checkbox");
    checkedList.checked = list.checkList;
    checkedList.addEventListener("click", () => {
      updateCheckListValue(list, checkedList.checked, project);
      updateTotalTask();
      updateProjectTaskNumber(project);
    });
    const listName = document.createElement("h3");
    listName.textContent = list.listName;
    const dueDate = document.createElement("p");
    console.log(list.dueDate);
    if (list.dueDate != "") {
      let [year, month, day] = list.dueDate.split("-");
      const formattedDate = format(
        new Date(year, month - 1, day),
        "LLLL dd,yyyy"
      );
      dueDate.textContent = `Due:${formattedDate}`;
    }

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
    listDateContainer.setAttribute("class", "date-container");
    projectDetailsLeft.appendChild(checkedList);
    projectDetailsLeft.appendChild(listName);
    projectDetailsRight.appendChild(priority);
    projectDetailsRight.appendChild(projectEditButton);
    projectDetailsRight.appendChild(listTrashButton);
    listDetailContainer.appendChild(projectDetailsLeft);
    listDetailContainer.appendChild(projectDetailsRight);
    listDateContainer.appendChild(calenderImage);
    listDateContainer.appendChild(dueDate);

    listGrid.appendChild(itemContainer);
    if (list.checkList) {
      itemContainer.style.opacity = 0.6;
    }
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

export function editProject() {
  const projectEditForm = document.querySelector(".project-edit-form");
  const projectEditName = document.querySelector("#project-edit-name");
  const projectEditDescription = document.querySelector(
    "#project-edit-description"
  );
  for (let project of StoreObjects.projectArray) {
    if (StoreObjects.currentProject == project.uid) {
      project.name = projectEditName.value;
      project.description = projectEditDescription.value;
      updateProjectDetailsOnScreen(project);
    }
  }
  projectEditForm.reset();
}

function deleteProject() {
  for (let i = 0; i < StoreObjects.projectArray.length; i++) {
    if (StoreObjects.projectArray[i].uid == StoreObjects.currentProject) {
      StoreObjects.projectArray.splice(i, 1);
      console.log(StoreObjects.projectArray);
    }
  }
  updateSideDisplay();
  updateProjectDetailsOnScreen(StoreObjects.projectArray[0]);
  setCurrentProject(StoreObjects.projectArray[0]);
  updateListOnScreen(StoreObjects.projectArray[0]);
  updateButtonColor(StoreObjects.projectArray[0]);
}

function deleteList(listUid, project) {
  for (let i = 0; i < project.toDoList.length; i++) {
    if (project.toDoList[i].uid == listUid) {
      project.toDoList.splice(i, 1);
    }
  }
  updateListOnScreen(project);
}

function editList(listUid, project) {
  const listEditDialog = document.querySelector(".list-edit-dialog");
  listEditDialog.showModal();
  showListValuesOnForm(listUid, project);
  const listEditForm = document.querySelector(".list-edit-form");
  listEditForm.addEventListener(
    "submit",
    () => {
      getFormValue(listUid, project);
    },
    { once: true }
  );
}

function getFormValue(listUid, project) {
  const listName = document.querySelector("#list-edit-name");
  const dueDate = document.querySelector("#due-date-edit");
  const radioButton = document.querySelector(
    'input[name="priority-edit"]:checked'
  );
  for (let i = 0; i < project.toDoList.length; i++) {
    if (project.toDoList[i].uid == listUid) {
      console.log(project.toDoList[i]);

      project.toDoList[i].listName = listName.value;
      project.toDoList[i].dueDate = dueDate.value;
      project.toDoList[i].priority = radioButton.value;
    }
  }
  updateListOnScreen(project);
}

function showListValuesOnForm(listUid, project) {
  const listName = document.querySelector("#list-edit-name");
  const dueDate = document.querySelector("#due-date-edit");
  console.log(dueDate);
  const radioButton = document.querySelectorAll('input[name="priority-edit"]');
  console.log(radioButton);
  for (let i = 0; i < project.toDoList.length; i++) {
    if (project.toDoList[i].uid == listUid) {
      listName.value = project.toDoList[i].listName;
      dueDate.value = project.toDoList[i].dueDate;
      radioButton.forEach((button) => {
        button.checked = button.value == project.toDoList[i].priority;
      });
    }
  }
}

function updateCheckListValue(list, checkedValue, project) {
  list.checkList = checkedValue;
  updateListOnScreen(project);
  console.log(project);
}

function updateProjectTaskNumber(project) {
  const total = document.querySelector(".total");
  const complete = document.querySelector(".complete");
  const due = document.querySelector(".due");
  console.log(complete, due);
  total.textContent = project.totalTask;
  complete.textContent = project.completedTask;
  due.textContent = project.dueTask;
}

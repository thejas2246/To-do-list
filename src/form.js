import { addListToCurrentProject } from "./create-object";
import { createProjectObject, createListObject } from "./create-object";
import { updateSideDisplay } from "./dom";

export function showProjectForm() {
  const projectDialog = document.querySelector(".project-dialog");
  projectDialog.showModal();
}
export function showListForm() {
  const listDialog = document.querySelector(".list-dialog");
  listDialog.showModal();
}

export function onSubmitListForm() {
  const ListForm = document.querySelector(".list-form");
  let [listName, listDate, priority] = getListFormValues();
  let newList = createListObject(listName, listDate, priority);
  addListToCurrentProject(newList);
  ListForm.reset();
}

function getListFormValues() {
  const listName = document.querySelector("#list-name");
  const dueDate = document.querySelector("#due-date");
  const radioButton = document.querySelector('input[name="priority"]:checked');
  return [listName.value, dueDate.value, radioButton.value];
}

export function onSubmitProjectForm() {
  const projectForm = document.querySelector(".project-form");
  let [projectName, projectDescription] = getProjectFormValues();
  createProjectObject(projectName, projectDescription);
  updateSideDisplay();
  projectForm.reset();
}

function getProjectFormValues() {
  const projectName = document.querySelector("#project-name");
  const projectDescription = document.querySelector("#project-description");
  return [projectName.value, projectDescription.value];
}

import "./styles.css";
import {
  showProjectForm,
  onSubmitProjectForm,
  showListForm,
  onSubmitListForm,
} from "./form";
import { getData, storageAvailable, storeData } from "./storageHandler";
import {
  setCurrentProject,
  updateButtonColor,
  updateSideDisplay,
  updateProjectDetailsOnScreen,
  updateListOnScreen,
  editProject,
} from "./dom";
import { StoreObjects } from "./class";
import { createDefaultObject } from "./create-object";

const addProjectButton = document.querySelector(".add-project-button");
addProjectButton.addEventListener("click", showProjectForm);

const projectForm = document.querySelector(".project-form");

projectForm.addEventListener("submit", () => {
  onSubmitProjectForm();
  updateButtonColor();
});

const addListButton = document.querySelector(".add-todo-button");
addListButton.addEventListener("click", showListForm);

const listForm = document.querySelector(".list-form");
listForm.addEventListener("submit", onSubmitListForm);

const projectEditSubmit = document.querySelector(".project-edit-form");
projectEditSubmit.addEventListener("submit", editProject);

window.addEventListener("beforeunload", storeData);

document.addEventListener("DOMContentLoaded", () => {
  if (storageAvailable("localStorage")) {
    let data = getData();
    if (data != null) {
      if (data.length == 0) {
        createDefaultObject();
      } else {
        StoreObjects.projectArray = [];
        for (let project of data) {
          StoreObjects.projectArray.push(project);
        }
      }
    } else {
      createDefaultObject();
    }
    updateSideDisplay();
    updateProjectDetailsOnScreen(StoreObjects.projectArray[0]);
    setCurrentProject(StoreObjects.projectArray[0]);
    updateListOnScreen(StoreObjects.projectArray[0]);
    updateButtonColor(StoreObjects.projectArray[0]);
  } else {
    console.log("storage not available");
  }
});

const projectFormCancelButton = document.querySelector(
  ".project-cancel-button"
);
projectFormCancelButton.addEventListener("click", () => {
  const projectDialog = document.querySelector(".project-dialog");
  projectDialog.close();
});

const projectFormEditCancelButton = document.querySelector(
  ".project-edit-cancel-button"
);
projectFormEditCancelButton.addEventListener("click", () => {
  const projectDialog = document.querySelector(".project-edit-dialog");
  projectDialog.close();
});

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
} from "./dom";
import { StoreObjects } from "./class";
import { createDefaultObject } from "./create-object";

const addProjectButton = document.querySelector(".add-project-button");
addProjectButton.addEventListener("click", showProjectForm);

const projectFormSubmitButton = document.querySelector(
  ".project-submit-button"
);

projectFormSubmitButton.addEventListener("click", () => {
  onSubmitProjectForm();
  updateButtonColor();
});

const addListButton = document.querySelector(".add-todo-button");
addListButton.addEventListener("click", showListForm);

const listFormSubmitButton = document.querySelector(".list-submit-button");
listFormSubmitButton.addEventListener("click", onSubmitListForm);

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
    console.log(StoreObjects.projectArray[0]);
    setCurrentProject(StoreObjects.projectArray[0]);
    updateListOnScreen(StoreObjects.projectArray[0]);
    updateButtonColor(StoreObjects.projectArray[0]);
  } else {
    console.log("storage not available");
  }
});

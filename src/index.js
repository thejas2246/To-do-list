import "./styles.css";
import {
  showProjectForm,
  onSubmitProjectForm,
  showListForm,
  onSubmitListForm,
} from "./form";

import { updateButtonColor } from "./dom";

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

import "./styles.css";
import { CreateList, CreateProject } from "./class";
import { showProjectForm, onSubmitProjectForm } from "./form";

const addProjectButton = document.querySelector(".add-project-button");
addProjectButton.addEventListener("click", showProjectForm);

const projectFormSubmitButton = document.querySelector(
  ".project-submit-button"
);
projectFormSubmitButton.addEventListener("click", onSubmitProjectForm);

import { createProjectObject } from "./create-object";
import { updateSideDisplay } from "./dom";

export function showProjectForm() {
  const projectDialog = document.querySelector(".project-dialog");
  projectDialog.showModal();
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

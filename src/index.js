import "./styles.css";
import { CreateList, CreateProject } from "./class";
import { showProjectForm } from "./form";

const addProjectButton = document.querySelector(".add-project-button");
addProjectButton.addEventListener("click", showProjectForm);

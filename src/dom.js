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
    });
    projectButtons.appendChild(projectButton);
    count++;
  }
}

function setCurrentProject(project) {
  StoreObjects.currentProject = project.uid;
}
function updateProjectDetailsOnScreen(project) {
  console.log(project);
  const mainContent = document.querySelector(".main-content");
  mainContent.textContent = "";
  let listItemContainer;
  if (document.querySelector(".list-item-container") == null) {
    listItemContainer = document.createElement("div");
    listItemContainer.setAttribute("class", "list-item-container");
    mainContent.appendChild(listItemContainer);
  } else {
    listItemContainer = document.querySelector(".list-item-container");
  }
  const projectHeading = document.createElement("h1");
  const projectDescription = document.createElement("p");
  listItemContainer.appendChild(projectHeading);
  listItemContainer.appendChild(projectDescription);
  projectHeading.textContent = project.name;
  projectDescription.textContent = project.description;
}

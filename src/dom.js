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

export function updateProjectDetailsOnScreen(project) {
  console.log(project);
  const projectHeadingSection = document.querySelector(".top");
  projectHeadingSection.textContent = "";

  const projectHeading = document.createElement("h1");
  const projectDescription = document.createElement("p");

  projectHeadingSection.appendChild(projectHeading);
  projectHeadingSection.appendChild(projectDescription);

  projectHeading.textContent = project.name;
  projectDescription.textContent = project.description;

  const projectStatistic = document.querySelector(".middle");
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
    }
  }
}

import { CreateProject, StoreObjects } from "./class";

export function createProjectObject(name, description) {
  const project = new CreateProject(name, description);
  StoreObjects.addProjectToArray(project);
}

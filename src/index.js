import "./styles.css";
import { CreateList, CreateProject } from "./class";

const newProject = new CreateProject("Do Task", "this is my project");
const newList = new CreateList(
  "Go Gym",
  "Go to gym in the evening",
  "2/3/4",
  "high",
  false
);
newProject.addListToProject(newList);
console.log(newProject);

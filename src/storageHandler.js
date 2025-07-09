import { StoreObjects } from "./class";

export function storeData() {
  localStorage.setItem(
    "projectArray",
    JSON.stringify(StoreObjects.projectArray)
  );
}

export function getData() {
  let s = JSON.parse(localStorage.getItem("projectArray"));
  StoreObjects.projectArray = [];
  for (let project of s) {
    StoreObjects.projectArray.push(project);
  }
}

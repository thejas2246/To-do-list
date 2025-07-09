import { StoreObjects } from "./class";

export function storeData() {
  localStorage.setItem(
    "projectArray",
    JSON.stringify(StoreObjects.projectArray)
  );
}

export function getData() {
  let projectArray = JSON.parse(localStorage.getItem("projectArray"));
  return projectArray;
}

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

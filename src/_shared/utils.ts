export const saveObjToLocalStore = (obj: object) => {
  window.localStorage.setItem("companies", JSON.stringify(obj));
};

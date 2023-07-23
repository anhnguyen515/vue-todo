import { reactive } from "vue";
import { saveToLocalStorage } from "../utils";

export const nameStore = reactive({
  currentUser: "",
  usersList: [],
  updateCurrentUser(name) {
    this.currentUser = name;
    saveToLocalStorage("currentUser", name);
  },
  updateUsersList(newUsersList) {
    this.usersList = [...newUsersList];
    saveToLocalStorage("usersList", this.usersList);
  },
  addNewUser(name) {
    this.usersList.push(name);
    saveToLocalStorage("usersList", this.usersList);
  },
  removeUser(name) {
    const newUsersList = this.usersList.filter((item) => item !== name);
    this.usersList = [...newUsersList];
    saveToLocalStorage("usersList", this.usersList);
  },
  removeCurrentUser() {
    this.currentUser = "";
    localStorage.removeItem("currentUser");
  },
});

import { reactive } from "vue";

export const nameStore = reactive({
  currentUser: "",
  usersList: [],
  updateCurrentUser(name) {
    this.currentUser = name;
    localStorage.setItem("currentUser", JSON.stringify(name));
  },
  updateUsersList(newUsersList) {
    this.usersList = [...newUsersList];
    localStorage.setItem("usersList", JSON.stringify(this.usersList));
  },
  addNewUser(name) {
    this.usersList.push(name);
    localStorage.setItem("usersList", JSON.stringify(this.usersList));
  },
  removeUser(name) {
    const newUsersList = this.usersList.filter((item) => item !== name);
    localStorage.setItem("usersList", JSON.stringify(newUsersList));
  },
  removeCurrentUser() {
    this.currentUser = "";
    localStorage.removeItem("currentUser");
  },
});

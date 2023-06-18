import { reactive } from "vue";

export const nameStore = reactive({
  name: "",
  updateName(name) {
    this.name = name;
    localStorage.setItem("username", JSON.stringify(name));
  },
  resetName() {
    this.name = "";
    localStorage.removeItem("username");
  },
});

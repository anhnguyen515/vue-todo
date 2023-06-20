import "bootstrap-icons/font/bootstrap-icons.css";
import "./style/main.scss";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import NewNote from "./pages/NewNote.vue";
import NotesList from "./pages/NotesList.vue";
import Popper from "vue3-popper";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/notes-list", name: "Notes list", component: NotesList },
  { path: "/new-note", name: "New note", component: NewNote },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.component("Popper", Popper);
app.mount("#app");

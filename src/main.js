import { createApp } from "vue";
import App from "./App.vue";
import "./css/main.css";
import VueNumberFormat from "vue-number-format";
import router from "./router";

const app = createApp(App);

app.use(VueNumberFormat, {
  prefix: "",
  decimal: "",
  thousand: ".",
  precision: 0,
});

app.use(router);

app.mount("#app");

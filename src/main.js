import { createApp } from "vue";
import App from "./App.vue";

import "./css/main.css";
import VueNumberFormat from "vue-number-format";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import mitt from 'mitt';
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(VueNumberFormat, {
  prefix: "",
  decimal: "",
  thousand: ".",
  precision: 0,
});

app.use(router);
app.use(ElementPlus);

app.mount("#app");

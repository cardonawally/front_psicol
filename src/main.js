import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import axios from 'axios'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const app = createApp(App)

app.use(router)

app.mount('#app')

app.config.globalProperties.axios=axios

library.add(faPhone);



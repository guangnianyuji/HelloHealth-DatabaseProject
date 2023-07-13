import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@flaticon/flaticon-uicons/css/all/all.css'
import "@/assets/main.css";
import '@/assets/misans.css'

import App from './App.vue'
import router from './router'
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/2961538-0-default'

const app = createApp(App)
app.use(ElementPlus)

app.use(router)

app.mount('#app')

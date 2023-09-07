import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@flaticon/flaticon-uicons/css/all/all.css'
import "@/assets/main.css";
import '@/assets/misans.css'

import animated from "animate.css";
import 'animate.css/animate.min.css';
import 'wow.js/css/libs/animate.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)

app.use(animated)

app.use(router)



app.mount('#app')


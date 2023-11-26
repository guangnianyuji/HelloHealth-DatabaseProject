import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import wow from 'wow.js'
import 'element-plus/dist/index.css'
import '@flaticon/flaticon-uicons/css/all/all.css'
import "@/assets/main.css";
import '@/assets/misans.css'
 

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)

app.use(router)

// app.use(wow)
// new WOW().init();

app.mount('#app')


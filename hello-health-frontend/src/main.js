import { createApp } from 'vue'
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import '@flaticon/flaticon-uicons/css/all/all.css'
import "@/assets/main.css";
import '@/assets/misans.css'
import loadingScreen from '@/global/loading'

import App from './App.vue'
import router from './router'
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/2961538-0-default'

//发送请求时自动显示加载界面
axios.interceptors.request.use((config) => {
    if(!config.doNotShowLoadingScreen)
        loadingScreen.startLoading()
    return config;
},);
//请求错误或者返回时自动清除加载界面
axios.interceptors.response.use(function (response) {
    loadingScreen.endLoading()
    return response;
}, function (error) {
    loadingScreen.endLoading();
    ElMessage.error('网络错误：'+error.message)
    return Promise.reject(error);
});

const app = createApp(App)
app.use(ElementPlus)

app.use(router)

app.mount('#app')

<script setup>
import { RouterView } from 'vue-router'
import WebLoading from '@/components/WebLoading.vue'
import axios from "axios";
import loadingScreen from "@/global/loading";
import {ElMessage} from "element-plus";

if(import.meta.env.VITE_AXIOS_BASE_URL) axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL
//发送请求时自动显示加载界面
axios.interceptors.request.use((config) => {
    if(!config.doNotShowLoadingScreen)
        loadingScreen.startLoading()
    return config;
},);
//请求错误或者返回时自动清除加载界面
axios.interceptors.response.use(function (response) {
    loadingScreen.endLoading()
    if(response.data.errorCode!==200){
        return Promise.reject({
            network: false,
            response: response,
            errorCode: response.data.errorCode,
            defaultHandler: () =>{
                ElMessage.error("错误代码：" + response.data.errorCode)
            }
        });
    }else{
        response.json = response.data.data
        return response
    }
}, function (error) {
    if(error.network === false){
        return Promise.reject(error);
    }
    loadingScreen.endLoading();
    ElMessage.error('网络错误：'+error.message)
    return Promise.reject({
        network: true,
        error: error
    });
});
</script>

<template>
    <RouterView />
    <WebLoading />
</template>

<style scoped>

</style>

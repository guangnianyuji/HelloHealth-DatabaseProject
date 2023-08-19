<script setup>
import { RouterView } from 'vue-router'
import WebLoading from '@/components/WebLoading.vue'
import axios from "axios";
import loadingScreen from "@/global/loading";
import {ElMessage} from "element-plus";
import router from "@/router";

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
            defaultHandler: (prefix) =>{
                if(response.data.message){
                    ElMessage.error((prefix ? prefix : "错误") + ": " + response.data.message)
                    return;
                }
                console.log(response.data.errorCode)
                switch (response.data.errorCode){
                    case 400:
                        ElMessage.error("参数错误")
                        return;
                    case 403:
                        ElMessage.error("拒绝访问")
                        return;
                    case 404:
                        router.replace("/error")
                        return;
                    case 500:
                        router.replace("服务器错误");
                        console.error(response.data)
                        return;
                }
                ElMessage.error((prefix ? prefix : "错误代码") + "：" + response.data.errorCode)
            }
        });
    }else{
        response.json = response.data.data
        return response
    }
}, function (error) {
    loadingScreen.endLoading()
    if(error.code === "ERR_NETWORK"){
        error.network = true;
        ElMessage.error("网络错误，请检查网络连接")
        error.defaultHandler = () => {}
        return Promise.reject(error);
    }
    if(error.network === false){
        return Promise.reject(error);
    }
    loadingScreen.endLoading();
    switch(error.response.status){
        case 415:
            ElMessage.error("接口未实现或请求方法设置错误")
            break;
        case 413:
            ElMessage.error("上传的文件过大")
            break;
        default:
            ElMessage.error('网络错误：'+error.message)
    }

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

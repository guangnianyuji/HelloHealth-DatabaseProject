<script setup>
import {reactive, ref} from "vue";
import router from "@/router";
import axios from "axios";
import {ElMessage} from "element-plus";

const messages = reactive({data:[

]})
const isLoading = ref(false);
const getNotification = () => {
    isLoading.value = true
    axios.get("/api/Notification",{doNotShowLoadingScreen: true}).then((res) => {
        isLoading.value = false
        if (res.data.errorCode !== 200){
            ElMessage.error("加载失败，错误码 " + res.data.errorCode)
            return
        }
        let responseObj = res.data
        if (responseObj.data.status !== true){
            ElMessage.error("加载失败 " + responseObj.data.msg);
            return;
        }
        messages.data = responseObj.data.notifications;
    })
}

defineExpose({getNotification})
const goUrl = (url) => {
    if(url) router.push(url);
}

const clearMessages = () => {
    messages.data = [];
    axios.get("/api/NotificationClear",{doNotShowLoadingScreen: true})
}
</script>

<template>
    <p class="title">
        消息通知
    </p>
    <div class="messageWrapper">
        <p class="messagePlaceHolder" v-if="messages.data.length===0">
            {{isLoading ? "加载中":"没有消息"}}
        </p>
        <div class="messageEntry" v-for="item of messages.data" :class="{clickable:item.url}" @click="goUrl(item.url)">
            <div class="content">
                <span class="dotWrapper" v-if="item.unread">
                    <span class="unreadDot"></span>
                </span>
                <span>{{item.message}}</span>
            </div>
            <div class="goButton" v-if="item.url">
                <i class="fi fi-rr-angle-small-right centerIcon"></i>
            </div>
        </div>
    </div>
    <p class="messageControls" v-if="messages.data.length>0">
        <el-button class="clearButton" @click="clearMessages" link>
            <i class="fi fi-rr-trash centerIcon"></i><span>全部清除</span>
        </el-button>
    </p>
</template>

<style scoped>
.title{
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid #ccc;
}

.messageWrapper{
    max-height: 300px;
    overflow: hidden auto;
}

.messageWrapper::-webkit-scrollbar {
    width: 5px;
    height: 100%
}

.messageWrapper::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 5px;
}

.messageEntry{
    min-width: 50px;
    padding: 15px;
    transition: 0.2s ease-in-out;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 1.5em;
    position: relative;
}

.messageWrapper>*:not(:last-child):after {
    border-bottom: 1px solid #ccc;
    bottom: 0;
    height: 1px;
    left: 0;
    margin: 0 16px;
    position: absolute;
    right: 0;
    background-clip: content-box;
    content: "";
}

.messageEntry:hover{
    background-color: rgb(246,246,246);
}

.messageEntry.clickable{
    cursor: pointer;
}

.messagePlaceHolder{
    padding: 40px 15px;
    text-align: center;
    color: #ccc;
}

.goButton{
    display: flex;
    align-items: center;
    margin-left: 3px;
}

.goButton i{
    margin: 0;
    transition: 0.3s ease-in-out;
}

.messageEntry:hover i{
    transform: translateX(3px);
}
.dotWrapper{
    height: 1.4em;
    margin-right: 10px;
    display: inline-flex;
    align-items: center;
    vertical-align: text-top;
}

.unreadDot{
    height: 6px;
    width: 6px;
    display: block;
    background-color: var(--el-color-error);
    border-radius: 50%;
}

.messageControls{
    text-align: center;
    padding: 10px;
    border-top: 1px solid #ccc;
}

.messageControls>button{
    font-weight: 400;
    color: #999;
}
</style>
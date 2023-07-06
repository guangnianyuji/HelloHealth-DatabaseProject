<script setup>

import SearchBox from "@/components/SearchBox.vue";
import LinkButtonWithIcon from "@/components/LinkButtonWithIcon.vue";
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";
import axios from "axios";
import {reactive, ref} from "vue";

changeTheme("#00bfa8")

function loginButtonClicked () {
    router.push("/login")
}

const menuItemClick = (ke) => {
    router.push(ke.index)
}

const searchStart = (msg) => {
    // TODO 不知道要干什么，先提示一下
    alert("搜索开始！"+msg)
}

const exitButtonClicked = async ()=>{
    await axios.get("/api/Logout")
    window.location.href ="/";
}

const notificationButtonClicked = () => {
    // TODO 不知道要干什么，先写个切换小红点的代码
    userInfo.unread_notification = !userInfo.unread_notification
}

const avatarClicked = () =>{
    if(isLogin.value){
        //TODO
        alert("跳转到个人主页！")
    }else{
        router.push("/login")
    }
}

const menus = [
    {"title":"首页","icon":"fi-rr-home","path":"/"},
    {"title":"HH 就诊","icon":"fi-rr-hospital","path":"/consultation"},
    {"title":"HH 找药","icon":"fi-rr-capsules","path":"/medicine"},
    {"title":"收藏管理","icon":"fi-rr-followcollection","path":"/favourites"},
    {"title":"健康资讯","icon":"fi-rr-books","path":"/news"},
    {"title":"HH 论坛","icon":"fi-rr-user-md-chat","path":"/forum"},
    {"title":"健康日程档案","icon":"fi-rr-calendar-clock","path":"/calender"},
    {"title":"个人信息管理","icon":"fi-rr-user-gear","path":"/settings"},
    {"title":"客服中心","icon":"fi-rr-headset","path":"/customer_service"},
];

let userInfo = reactive({
    user_phone:"",
    user_name:"未登录",
    user_id:123456,
    user_group:"none",
    avatar_url:"/src/assets/defaultAvatar.png",
    unread_notification:true
});

const isLogin = ref(false);

(async ()=>{
    let response = await axios.get("/api/UserInfo")

    console.log(response.data)
    if(response.data.errorCode!==200) return;
    let responseObj = response.data.data
    isLogin.value = responseObj.login;
    console.log(responseObj.login)
    if(!responseObj.login) return;
    userInfo.user_group = responseObj.user_group;
    userInfo.user_phone = responseObj.user_phone;
    userInfo.user_id = responseObj.user_id;
    userInfo.user_group = responseObj.user_group;
    userInfo.avatar_url = responseObj.avatar_url;
    userInfo.user_name = responseObj.user_name;
    userInfo.unread_notification = responseObj.unread_notification;
    console.log(responseObj.unread_notification)

})()

let userGroupNameDict = {
    "none": "点击登录",
    "normal": "普通用户",
    "doctor": "医生"
}

</script>

<template>
    <div class="pageWrapper">
        <div class="headerHolder">
            <div class="leftTitle">
                <img alt="" src="../assets/logo.png">
                <SearchBox @searchStart="searchStart"></SearchBox>
            </div>
            <div class="rightTitle" :class="{notVisible: !isLogin}">
                <img alt="" src="../assets/titleImg1.png">
                <LinkButtonWithIcon font-color="#fff" text="消息通知" icon="fi-rr-bell" :has-notification="userInfo.unread_notification" @click="notificationButtonClicked"></LinkButtonWithIcon>
                <LinkButtonWithIcon font-color="#fff" text="联系客服" icon="fi-rr-headset"></LinkButtonWithIcon>
                <div class="line">
                </div>
                <LinkButtonWithIcon font-color="#fff" text="退出" icon="" @click="exitButtonClicked"></LinkButtonWithIcon>
            </div>
            <div class="rightTitle" :class="{notVisible: isLogin}">
                <img alt="" src="../assets/titleImg1.png">

                <LinkButtonWithIcon font-color="#fff" text="点击登录" icon="" @click="loginButtonClicked"></LinkButtonWithIcon>
            </div>
        </div>
        <div class="contentHolder">
            <div class="sideBar">
                <div class="userInfoWrapper">
                    <div class="avatarHolder" @click="avatarClicked">
                        <el-avatar class="avatar" :size="50" :src="userInfo.avatar_url" />
                        <div class="userInfoHolder">
                            <div class="userName">{{userInfo.user_name}}</div>
                            <div class="userGroup">{{userGroupNameDict[userInfo.user_group]}}</div>
                        </div>
                    </div>
                </div>


                <el-menu
                    :default-active="router.currentRoute.value.path"
                    class="sideBarMenu"
                >
                    <el-menu-item v-for="item in menus" :index="item.path" @click="menuItemClick">
                        <i class="fi" :class="item.icon"></i>
                        <span>{{item.title}}</span>
                    </el-menu-item>
                </el-menu>
            </div>

            <div class="content">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>


<style scoped>

.headerHolder{
    width: 100vw;
    height: 60px;
    box-sizing: border-box;
    background-color: #00bfa8;
    display: flex;
    justify-content: space-between;
    max-height: 60px;
    flex: 1;
}
.headerHolder>div{
    display: flex;
    align-items: center;
    margin: 0 20px;
}

.pageWrapper{
    height: 100vh;
    width: 100vw;
    max-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.leftTitle img {
    max-height: 50px;
    margin-right: 20px;
}

.rightTitle img{
    height: 60px;
}

.rightTitle>*{
    margin: 0 10px;
}

.line{
    border-left: #fff 1px solid;
    height: 1em;
    width: 1px;
    margin: 0 5px;
}

.contentHolder{
    display: flex;
    justify-items: stretch;
    flex: 3;
    overflow: hidden;

}


.content{
    overflow-y: scroll;
    background-color: var(--el-color-primary-light-9);
    flex: 1;
}

.sideBar{
    width: 230px;
    min-width: 230px;
    max-width: 230px;
    flex: 3;
}

.sideBar .sideBarMenu{
    border-right: none;
}

.sideBar .sideBarMenu i{
    margin-right: 10px;
    font-size: 1.1em;
}

.userInfoWrapper{
    padding: 10px 20px;
    border-bottom: 1px #eee solid;
}

.avatarHolder{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
}

.avatarHolder .avatar{
    border: 5px var(--el-color-primary-light-7) solid;
    margin-right: 10px;
}

.avatarHolder .userName{
    font-weight: bold;
    font-size: 15px;
}

.avatarHolder .userGroup{
    font-size: 10px;
}

.userInfoHolder{
    margin-top:7px;
    line-height: 18px;
}

.notVisible{
    display: none !important;
}
</style>
<script setup>

import SearchBox from "@/components/SearchBox.vue";
import LinkButtonWithIcon from "@/components/LinkButtonWithIcon.vue";
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";
import axios from "axios";
import {reactive, ref} from "vue";
import UserInfoCard from "@/components/UserInfoCard.vue";
import globalData from "@/global/global"

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
    {"title":"HH 找药","icon":"fi-rr-capsules","path":"/medicine"},
    {"title":"收藏管理","icon":"fi-rr-followcollection","path":"/collection"},
    {"title":"健康资讯","icon":"fi-rr-books","path":"/news"},
    {"title":"HH 论坛","icon":"fi-rr-user-md-chat","path":"/forum"},
    {"title":"健康日程档案","icon":"fi-rr-calendar-clock","path":"/calendar"},
    {"title":"个人信息管理","icon":"fi-rr-user-gear","path":"/settings"},
    {"title":"客服中心","icon":"fi-rr-headset","path":"/customer_service"},
];

let userInfo = reactive({
    data:{
        user_phone:"",
        user_name:"未登录",
        user_id:123456,
        user_group:"none",
        avatar_url:"/src/assets/defaultAvatar.png",
        unread_notification:true,
        verified: false
    }

});

const isLogin = ref(false);

(async ()=>{
    let response = await axios.get("/api/UserInfo")

    if(response.data.errorCode!==200) return;
    let responseObj = response.data.data
    isLogin.value = responseObj.login;

    if(!responseObj.login) return;
    globalData.login = true;
    userInfo.data = responseObj
    globalData.userInfo = userInfo.data
})()

let userGroupNameDict = {
    "none": "点击登录",
    "normal": "普通用户",
    "doctor": "医生"
}

const getSidebarPath = () => {
    let path = router.currentRoute.value.path.split("/")
    if(path.length === 1){
        return ""
    }else{
        return "/" + path[1];
    }


}

</script>

<template>
    <div class="pageWrapper">
        <div class="headerHolder">
            <div class="leftTitle">
                <img alt="" src="../assets/logo.png">
                <SearchBox @searchStart="searchStart"></SearchBox>
            </div>
            <div class="rightTitle" v-if="isLogin">
                <img alt="" src="../assets/titleImg1.png">
                <LinkButtonWithIcon font-color="#fff" text="消息通知" icon="fi-rr-bell" :has-notification="userInfo.unread_notification" @click="notificationButtonClicked"></LinkButtonWithIcon>
                <LinkButtonWithIcon font-color="#fff" text="联系客服" icon="fi-rr-headset"></LinkButtonWithIcon>
                <div class="line">
                </div>
                <LinkButtonWithIcon font-color="#fff" text="退出" icon="" @click="exitButtonClicked"></LinkButtonWithIcon>
            </div>
            <div class="rightTitle" v-if="!isLogin">
                <img alt="" src="../assets/titleImg1.png">

                <LinkButtonWithIcon font-color="#fff" text="点击登录" icon="" @click="loginButtonClicked"></LinkButtonWithIcon>
            </div>
        </div>
        <div class="contentHolder">
            <div class="sideBar">
                <div class="userInfoWrapper">
                    <UserInfoCard :user-info="userInfo.data" showAvatarBorder @click="avatarClicked"></UserInfoCard>
                </div>


                <el-menu
                    :default-active="getSidebarPath()"
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
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    background-color: var(--el-color-primary);
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
    width: 100%;
    min-width: 1200px;
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
    overflow-y: auto;
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
    cursor: pointer;
}
</style>
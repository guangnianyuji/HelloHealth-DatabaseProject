<script setup>

import SearchBox from "@/components/SearchBox.vue";
import LinkButtonWithIcon from "@/components/LinkButtonWithIcon.vue";
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";
import axios from "axios";
import {onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import UserInfoCard from "@/components/UserInfoCard.vue";
import globalData from "@/global/global"
import {ElMenuItem, ElSubMenu} from "element-plus";
import NotificationPopup from "@/components/NotificationPopup.vue";

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
    await axios.get("/api/Login/Logout")
    window.location.href ="/";
}

const notificationBox = ref();
const notificationButtonClicked = () => {
    userInfo.data.unread_notification = false;
}

const updateNotifications = () =>{
    notificationBox.value.getNotification();
}

const avatarClicked = () =>{
    if(!isLogin.value){
        router.push("/login")
    }
}

const menus = reactive({v:[
        {"title":"HH 首页","icon":"fi-rr-home","path":"/"},
        {"title":"HH 找药","icon":"fi-rr-capsules","path":"/medicine"},
        {"title":"健康资讯","icon":"fi-rr-books","path":"/news"},
        {"title":"HH 论坛","icon":"fi-rr-user-md-chat","path":"/forum"},
    ]});

let userInfo = reactive({
    data:{
        user_phone:"",
        user_name:"未登录",
        user_id:123456,
        user_group:"none",
        avatar_url:"/src/assets/defaultAvatar.png",
        unread_notification:false,
        verified: false
    }

});

const isLogin = ref(false);
const loadComplete = ref(true);
const gotUserInfo = ref(false)

axios.get("/api/UserInfo").then(response => {
    let responseObj = response.json
    isLogin.value = responseObj.login;
    
    gotUserInfo.value = true
    if(!responseObj.login) return;
    menus.v = [
        {"title":"HH 首页","icon":"fi-rr-home","path":"/"},
        {"title":"HH 找药","icon":"fi-rr-capsules","path":"/medicine"},
        {"title":"收藏管理","icon":"fi-rr-followcollection","path":"collection",
            "children":[
                {"title":"药品收藏","icon":"fi-rr-capsules","path":"/medicineCollection"},
                {"title":"帖子收藏","icon":"fi-rr-memo","path":"/postCollection"},
            ]
        },
        {"title":"健康资讯","icon":"fi-rr-books","path":"/news"},
        {"title":"HH 论坛","icon":"fi-rr-user-md-chat","path":"/forum"},
        {"title":"健康日历","icon":"fi-rr-calendar-clock","path":"/calendar"},
        {"title":"个人中心","icon":"fi-rr-user-gear","path":"/user"}
    ]
    loadComplete.value = false;
    // 等菜单卸载完了再改回来
    setTimeout(()=>{
        loadComplete.value = true
    },0)
    globalData.login = true;
    globalData.locked=responseObj.locked
    userInfo.data = responseObj
    globalData.userInfo = userInfo.data
}).catch(error => {
    if(error.network) return
    error.defaultHandler();
})


const getSidebarPath = () => {
    let path = router.currentRoute.value.path.split("/")
    if(path.length === 1){
        return ""
    }else{
        return "/" + path[1];
    }


}

const menu = ref();
let contentDom = undefined;
onMounted(()=>{
    (()=>{
        let menuItemNow = getSidebarPath();
        for(let item of menus.v){
            if(!item.children) continue;
            for(let child of item.children){
                if(child.path===menuItemNow){
                    menu.value.open(item.path);
                }
            }
        }
        contentDom = document.querySelector(".content")
    })()
})


watch(router.currentRoute, () => {
    contentDom.scrollTo({left: 0, top: 0})
})

</script>

<template>
    <div class="pageWrapper">
        <div class="headerHolder">
            <div class="leftTitle">
                <img alt="" src="../assets/logo.png">
<!--                <SearchBox @searchStart="searchStart"></SearchBox>-->
            </div>
            <div class="rightTitle" v-if="isLogin">
                <img alt="" src="../assets/titleImg1.png">
                <el-popover
                    :width="360"
                    popper-style="box-shadow: 0 5px 20px hsla(0,0%,7%,.1);padding: 0; transition: opacity 0.3s;"
                    trigger="click"
                    @before-enter="updateNotifications"
                >
                    <template #reference>
                        <LinkButtonWithIcon font-color="#fff" text="消息通知" icon="fi-rr-bell" :has-notification="userInfo.data.unread_notification" @click="notificationButtonClicked"></LinkButtonWithIcon>
                    </template>
                    <template #default>
                        <NotificationPopup ref="notificationBox"></NotificationPopup>
                    </template>
                </el-popover>

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


                <el-menu v-if="loadComplete" :default-active="getSidebarPath()" class="sideBarMenu" ref="menu">
                    <component v-for="item in menus.v" :is="item.children ? ElSubMenu : ElMenuItem" :index="item.path" v-on="item.children ? {}: {click: menuItemClick}">
                        <template #title>
                            <i class="fi" :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <el-menu-item v-if="item.children" v-for="child in item.children" :index="child.path" @click="menuItemClick">
                            <i class="fi" :class="child.icon"></i>
                            <span>{{child.title}}</span>
                        </el-menu-item>
                    </component>
                </el-menu>
            </div>

            <div class="content">
                <RouterView v-if="gotUserInfo"></RouterView>
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
}
</style>
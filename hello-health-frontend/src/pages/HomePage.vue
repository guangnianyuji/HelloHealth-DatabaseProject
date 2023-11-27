<script setup>

import SearchBox from "@/components/SearchBox.vue";
import LinkButtonWithIcon from "@/components/LinkButtonWithIcon.vue";
import { changeTheme } from "@/assets/changeTheme";
import router from "@/router";
import axios from "axios";
import { onBeforeMount, onMounted, reactive, ref, watch, computed } from "vue";
import UserInfoCard from "@/components/UserInfoCard.vue";
import globalData from "@/global/global"
import { ElMenuItem, ElSubMenu, ElDialog} from "element-plus";
import NotificationPopup from "@/components/NotificationPopup.vue";

changeTheme("#00bfa8")

function loginButtonClicked() {
    router.push("/login")
}

const menuItemClick = (ke) => {
    router.push(ke.index)
}

const searchStart = (msg) => {
    // TODO 不知道要干什么，先提示一下
    alert("搜索开始！" + msg)
}

const exitButtonClicked = async () => {
    await axios.get("/api/Login/Logout")
    window.location.href = "/";
}

const notificationBox = ref();
const notificationButtonClicked = () => {
    userInfo.data.unread_notification = false;
}

const updateNotifications = () => {
    notificationBox.value.getNotification();
}

const helpVisible = ref(false);

const avatarClicked = () => {
    if (!isLogin.value) {
        router.push("/login")
    }
}

const menus = reactive({
    v: [
        { "title": "HH 首页", "icon": "fi-rr-home", "path": "/" },
        { "title": "HH 找药", "icon": "fi-rr-capsules", "path": "/medicine" },
        { "title": "健康资讯", "icon": "fi-rr-books", "path": "/news" },
        { "title": "HH 论坛", "icon": "fi-rr-user-md-chat", "path": "/forum" },
    ]
});

let userInfo = reactive({
    data: {
        user_phone: "",
        user_name: "未登录",
        user_id: 123456,
        user_group: "none",
        avatar_url: "/static/defaultAvatar.png",
        unread_notification: false,
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
    if (!responseObj.login) return;
    menus.v = [
        { "title": "HH 首页", "icon": "fi-rr-home", "path": "/" },
        { "title": "HH 找药", "icon": "fi-rr-capsules", "path": "/medicine" },
        {
            "title": "收藏管理", "icon": "fi-rr-followcollection", "path": "collection",
            "children": [
                { "title": "药品收藏", "icon": "fi-rr-capsules", "path": "/medicineCollection" },
                { "title": "帖子收藏", "icon": "fi-rr-memo", "path": "/postCollection" },
            ]
        },
        { "title": "健康资讯", "icon": "fi-rr-books", "path": "/news" },
        { "title": "HH 论坛", "icon": "fi-rr-user-md-chat", "path": "/forum" },
        { "title": "健康日历", "icon": "fi-rr-calendar-clock", "path": "/calendar" },
        { "title": "个人中心", "icon": "fi-rr-user-gear", "path": "/user" }
    ]
    loadComplete.value = false;
    // 等菜单卸载完了再改回来
    setTimeout(() => {
        loadComplete.value = true
    }, 0)
    globalData.login = true;
    globalData.locked = responseObj.locked
    userInfo.data = responseObj
    globalData.userInfo = userInfo.data
}).catch(error => {
    if (error.network) return
    error.defaultHandler();
})


const getSidebarPath = () => {
    let path = router.currentRoute.value.path.split("/")
    if (path.length === 1) {
        return ""
    } else {
        return "/" + path[1];
    }


}

let menuImgSrc = "/static/menu_main.png"; // 默认图片路径

const updateMenuImgSrc = () => {
    let currentPath = router.currentRoute.value.path;
    // 根据当前路径更改图片路径
    if (currentPath.includes("Collection")) {
        menuImgSrc = "/static/menu_collection.png";
    } else if (currentPath.includes("medicine")) {
        menuImgSrc = "/static/menu_medicine.png";
    } else if (currentPath.includes("news")) {
        menuImgSrc = "/static/menu_news.png";
    } else if (currentPath.includes("forum")) {
        menuImgSrc = "/static/menu_forum.png";
    } else if (currentPath.includes("calendar")) {
        menuImgSrc = "/static/menu_calendar.png";
    } else if (currentPath.includes("user")) {
        menuImgSrc = "/static/menu_profile.png";
    } else if (currentPath.includes("coin")) {
        menuImgSrc = "/static/menu_coin.png";
    } else if (currentPath.includes("UserAgreement")) {
        menuImgSrc = "/static/menu_coin.png";
    } else {
        menuImgSrc = "/static/menu_main.png";
    }
    console.log(currentPath);
    console.log(menuImgSrc);
};

const menu = ref();
let contentDom = undefined;
onMounted(() => {
    (() => {
        let menuItemNow = getSidebarPath();
        for (let item of menus.v) {
            if (!item.children) continue;
            for (let child of item.children) {
                if (child.path === menuItemNow) {
                    menu.value.open(item.path);
                }
            }
        }
        contentDom = document.querySelector(".content")
    })()
})


watch(router.currentRoute, () => {
    contentDom.scrollTo({ left: 0, top: 0 })
    updateMenuImgSrc();
})

</script>

<template>
    <div class="pageWrapper">
        <div class="headerHolder">
            <div class="leftTitle">
                <img alt="" src="/static/logo.png">
                <!--                <SearchBox @searchStart="searchStart"></SearchBox>-->
            </div>
            <div class="rightTitle" v-if="isLogin">
                <img alt="" src="/static/titleImg1.png">
                <el-popover :width="360"
                    popper-style="box-shadow: 0 5px 20px hsla(0,0%,7%,.1);padding: 0; transition: opacity 0.3s;"
                    trigger="click" @before-enter="updateNotifications">
                    <template #reference>
                        <LinkButtonWithIcon font-color="#fff" text="消息通知" icon="fi-rr-bell"
                            :has-notification="userInfo.data.unread_notification" @click="notificationButtonClicked">
                        </LinkButtonWithIcon>
                    </template>
                    <template #default>
                        <NotificationPopup ref="notificationBox"></NotificationPopup>
                    </template>
                </el-popover>
                <div class="line">
                </div>
                <LinkButtonWithIcon font-color="#fff" text="帮助" icon="" @click="helpButtonClicked"></LinkButtonWithIcon>
                <LinkButtonWithIcon font-color="#fff" text="退出" icon="" @click="exitButtonClicked"></LinkButtonWithIcon>
            </div>
            <div class="rightTitle" v-if="!isLogin">
                <img alt="" src="/static/titleImg1.png">
                <LinkButtonWithIcon font-color="#fff" text="帮助" icon="" @click="helpVisible = true"></LinkButtonWithIcon>
                <LinkButtonWithIcon font-color="#fff" text="登录/注册" icon="" @click="loginButtonClicked"></LinkButtonWithIcon>
            </div>

            <el-dialog 
                v-model="helpVisible"
                title="用户使用指南"
                width="80%"
                draggable>
                <div style="float:left;text-align: left;font-size: medium;margin: 20px;">
                    <p>欢迎您加入HelloHealth健康管理平台，一个全面的健康管理解决方案，专为追求健康生活、管理健康信息和分享健康经验的用户设计。遵循以下步骤，您可以轻松掌握平台的各项功能：</p>
                    <h3 class="document_h2">创建您的账户</h3>
                    <p class="document_p">1. 注册账号：访问HelloHealth平台首页，点击右上方“注册”按钮或左上方头像框。</p>
                    <p class="document_p">2. 输入手机号与验证码：在注册页面输入手机号码。系统发送一个验证码，请输入此验证码以确认身份。</p>
                    <p class="document_p">3. 注册成功：填写必要的个人信息，设置安全的密码后，点击提交完成注册。</p>
                    <p class="document_p">4. 登录：使用您的手机号和密码登录进入平台。</p>
                    <h3 class="document_h2">浏览和交互</h3>
                    <p class="document_p">1. 健康快讯：作为登录用户，您可以在首页和健康资讯板块浏览管理员发布的最新健康快讯。</p>
                    <p class="document_p">2. 咨询与分享：用户可以在HH论坛发布健康动态或问题咨询，管理员会审核内容后发布，其他用户可以点赞、收藏和评论。</p>
                    <p class="document_p">3. 举报不当内容：如遇不适当内容，用户可进行举报，管理员将及时处理。</p>
                    <h3 class="document_h2">查找和管理信息</h3>
                    <p class="document_p">1. 查找药品信息：用户可以在HH找药板块搜索或筛选药品信息，登录的用户可以对感兴趣的药品添加到个人收藏。</p>
                    <p class="document_p">2. 查找健康资讯：用户可以在健康资讯板块搜索或筛选健康资讯，登录的用户可以对感兴趣的资讯添加到个人收藏。</p>
                    <p class="document_p">3. 收藏管理：登录的用户可以在收藏管理界面对已收藏的药品或资讯进行管理。</p>
                    <p class="document_p">4. 个人空间：用户可以进入个人空间进行个人信息管理，或查看和管理关注列表、粉丝、个人发布和举报历史。</p>
                    <h3 class="document_h2">用户互动</h3>
                    <p class="document_p">1. 健康日历管理：在健康日历，您可以管理您的健康事项、设置手机短信提醒、跟踪健康进度等。</p>
                    <p class="document_p">2. 关注健康达人：用户可以访问其他用户的个人空间，查看他们的健康动态并选择关注。用户关注的达人在发布新动态时，系统会发出消息通知用户。</p>
                    <p class="document_p">3. 杏仁币激励：通过解答悬赏贴、每日登录、充值等方式，您可以获得杏仁币，进而可用于发布悬赏型帖子。</p>
                    <h3 class="document_h2">安全支付</h3>
                    <p class="document_p">1. 杏仁币充值：在个人空间的“我的杏仁币”板块选择“杏仁币详情”，用户可以在该页面查看杏仁币流水明细，也可以选择购买指定额度的杏仁币。</p>
                    <p class="document_p">2. 安全支付：系统将引导您前往安全的支付平台完成支付。</p>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="helpVisible = false">确认<meta name="description" content=""></el-button>
                        <!-- <el-button type="primary" @click="deleteCheck">确认</el-button> -->
                    </span>
                </template>
            </el-dialog>

        </div>
        <div class="contentHolder">
            <div class="sideBar">
                <div class="userInfoWrapper">
                    <UserInfoCard :user-info="userInfo.data" showAvatarBorder @click="avatarClicked"></UserInfoCard>
                </div>


                <el-menu v-if="loadComplete" :default-active="getSidebarPath()" class="sideBarMenu" ref="menu">
                    <component v-for="item in menus.v" :is="item.children ? ElSubMenu : ElMenuItem" :index="item.path"
                        v-on="item.children ? {} : { click: menuItemClick }">
                        <template #title>
                            <i class="fi" :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item v-if="item.children" v-for="child in item.children" :index="child.path"
                            @click="menuItemClick">
                            <i class="fi" :class="child.icon"></i>
                            <span>{{ child.title }}</span>
                        </el-menu-item>
                    </component>
                </el-menu>

                <img class="menuImg" alt="" :src="menuImgSrc" />

                <div class="beian">
                    <el-link href="https://beian.miit.gov.cn/" target="_blank" type="info">赣ICP备2023008902号-1</el-link>
                </div>

            </div>

            <div class="content">
                <RouterView v-if="gotUserInfo"></RouterView>
            </div>

            <div class="area">
                    <ul class="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
        </div>
    </div>
</template>


<style scoped>
.headerHolder {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    background-color: var(--el-color-primary);
    display: flex;
    justify-content: space-between;
    max-height: 60px;
    flex: 1;
}

.headerHolder>div {
    display: flex;
    align-items: center;
    margin: 0 20px;
}

.pageWrapper {
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

.rightTitle img {
    height: 60px;
}

.rightTitle>* {
    margin: 0 10px;
}

.line {
    border-left: #fff 1px solid;
    height: 1em;
    width: 1px;
    margin: 0 5px;
}

.contentHolder {
    display: flex;
    justify-items: stretch;
    flex: 3;
    overflow: hidden;

}


.content {
    overflow-y: auto;
    flex: 1;
}

.bg-pan-bottom {
    animation: bg-pan-bottom 2s infinite alternate both;
    background: linear-gradient(to bottom, var(--el-color-primary-light-9), #ddf4ff);
    /* 设置渐变色 */
}

@keyframes bg-pan-bottom {
    0% {
        background-position: 50% 0%;
    }

    100% {
        background-position: 50% 100%;
    }
}

.sideBar {
    width: 230px;
    min-width: 230px;
    max-width: 230px;
    background-color: #fff;
    flex: 3;
    position: relative;
}

.sideBar .sideBarMenu {
    border-right: none;
}

.sideBar .sideBarMenu i {
    margin-right: 10px;
    font-size: 1.1em;
}

.userInfoWrapper {
    padding: 10px 20px;
    border-bottom: 1px #eee solid;
}

.menuImg {
    position: absolute;
    width: 80%;
    bottom: 30px;
    margin-left: 10%;
}

.beian {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 10px;
}

.beian .el-link {
    color: #ccc;
    font-size: 10px;
}

/* background setting */
.area{
    background: linear-gradient(to bottom, var(--el-color-primary-light-9), #ddf4ff);
    /*background: var(--el-color-primary-light-9);  
    background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);  */
    width: 100%;
    height:100vh;
    position: absolute;
    z-index: -1; /* 确保背景位于最底层 */
}

.circles{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.circles li{
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(12, 133, 119, 0.5);
    animation: animate 25s linear infinite;
    bottom: -150px;
    
}

.circles li:nth-child(1){
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
}


.circles li:nth-child(2){
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
}

.circles li:nth-child(3){
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
}

.circles li:nth-child(4){
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
}

.circles li:nth-child(5){
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
}

.circles li:nth-child(6){
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
}

.circles li:nth-child(7){
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
}

.circles li:nth-child(8){
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
}

.circles li:nth-child(9){
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
}

.circles li:nth-child(10){
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
}



@keyframes animate {

    0%{
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100%{
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }

}

.document_p{
    line-height: 1.5;
}

.document_h2{
    margin-top: 20px;
    color: #006264;
}
</style>

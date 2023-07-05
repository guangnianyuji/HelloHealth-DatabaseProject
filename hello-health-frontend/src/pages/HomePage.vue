<script setup>

import SearchBox from "@/components/SearchBox.vue";
import LinkButtonWithIcon from "@/components/LinkButtonWithIcon.vue";
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";

changeTheme("#00bfa8")
function viewMsgBtnClicked (hasNotification) {
    alert("点击消息通知!")
    hasNotification.value = ! hasNotification.value
}

const handleClick = (ke) => {
    router.push(ke.index)

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


]

</script>

<template>
    <div class="pageWrapper">
        <div class="headerHolder">
            <div class="leftTitle">
                <img alt="" src="../assets/logo.png">
                <SearchBox></SearchBox>
            </div>
            <div class="rightTitle">
                <img alt="" src="../assets/titleImg1.png">
                <LinkButtonWithIcon font-color="#fff" text="消息通知" icon="fi-rr-bell" :has-notification="true" @buttonClicked="viewMsgBtnClicked"></LinkButtonWithIcon>
                <LinkButtonWithIcon font-color="#fff" text="联系客服" icon="fi-rr-headset"></LinkButtonWithIcon>
                <div class="line">
                </div>
                <LinkButtonWithIcon font-color="#fff" text="退出" icon=""></LinkButtonWithIcon>

            </div>
        </div>
        <div class="contentHolder">
            <div class="sideBar">
                <div class="userInfoWrapper">
                    <div class="avatarHolder">
                        <el-avatar class="avatar" :size="50" :src="'src/assets/101933351.jpg'" />
                        <div class="userInfoHolder">
                            <div class="userName">HH小患</div>
                            <div class="userGroup">普通用户</div>
                        </div>
                    </div>
                </div>


                <el-menu
                    :default-active="router.currentRoute.value.path"
                    class="sideBarMenu"
                >
                    <el-menu-item v-for="item in menus" :index="item.path" @click="handleClick">
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
</style>
<template>
    <div class="boxWrapper">
        <div class="content">
            <el-button class="closeButton" type="primary" link @click="goHome"><el-icon><CloseBold /></el-icon></el-button>
            <div class="wrapper">
                <img alt="" src="@/assets/login.gif"/>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>

import {CloseBold} from "@element-plus/icons-vue";

const goHome = () => {
    window.location.href='/'
}
</script>

<style scoped>
.boxWrapper{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    width: 800px;
    height: 480px;
    box-shadow: 0 6px 15px rgba(36,37,38,.1);
    padding: 30px 20px;
    border-radius: 3px;
    background-color: #fff;
    position: relative;
}
.closeButton{
    position: absolute;
    right: 10px;
    top:10px;
    height: 30px;
    width: 30px;
}
.wrapper{
    display: flex;
    align-items: center;
    height: 100%;
}

.wrapper img{
    max-width: 50%;
    max-height: 100%;
    margin-right: 50px;
    border-radius: 3px;
}
</style>
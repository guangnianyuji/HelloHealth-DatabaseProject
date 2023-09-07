<template>
    <div class="boxWrapper">
        <div class="content">
            <el-button class="closeButton" type="primary" link @click="goHome"><i class="fi fi-br-cross"></i></el-button>
            <div class="wrapper">
                <img alt="" src="/static/login.gif"/>
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script setup>

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
    height: 520px;
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
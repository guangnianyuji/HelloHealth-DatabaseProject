<script setup>
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";
import HealthFlashView from "../views/HealthFlashView.vue";

changeTheme("#00bfa8")

const goBack = () =>{
    router.go(-1)
}

</script>

<template>
    <div class="pageWrapper">
            <HealthFlashView/>
    </div>
        



</template>


<style scoped>
.pageWrapper {
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    background-color: var(--el-color-primary-light-9);
    display: flex;
}


</style>
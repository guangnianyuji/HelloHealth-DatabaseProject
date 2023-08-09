<template>
    <el-form
        :label-position="'top'"
        label-width="60px"
        :model="loginCredential"
        class="loginForm"
    >
        <div class="titleWrapper">
            <div class="loginTitle">登录</div>
            <div class="loginSubTitle">登录以继续</div>
        </div>

        <el-form-item label="手机号" v-bind:class="{ error: isError }">
            <el-input v-model="loginCredential.user_phone" @click="clearErrorBorder" type="number" step="1" min="0"/>
        </el-form-item>
        <el-form-item label="密码" v-bind:class="{ error: isError }">
            <el-input v-model="loginCredential.password" type="password" @click="clearErrorBorder" show-password/>
        </el-form-item>
        <div class="errorText">{{errorMsg}}</div>
        <div class="textButtonHolder">
            <router-link to="/login/register">
                <el-button type="primary" link>注册</el-button>
            </router-link>
            <router-link to="/login/forgot">
                <el-button type="primary" link>忘记密码?</el-button>
            </router-link>
        </div>
        <div class="loginButtonHolder">
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </div>
    </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue'
import axios from "axios";
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";

changeTheme("#93b27b")

const loginCredential = reactive({
    user_phone: '',
    password: '',
})

const errorMsg = ref('')
const isError = ref(false)
const onSubmit = () => {
    errorMsg.value = "";
    isError.value = false;

    let regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if(loginCredential.user_phone===''){
        errorMsg.value = "请输入手机号！"
        isError.value = true
        return
    }else if(!regPhone.test(loginCredential.user_phone)){
        errorMsg.value = "请输入正确的手机号！"
        isError.value = true
        return
    }
    axios.post("/api/Login",loginCredential).then(response => {
        isError.value = false;
        errorMsg.value = ''
        router.push("/")
    }).catch(error => {
        if(error.network) return;
        switch(error.errorCode){
            case 103:
                errorMsg.value = "用户名或密码错误";
                isError.value = true;
                break;
            default:
                error.defaultHandler()
        }
    })
}

const clearErrorBorder = () =>{
    isError.value = false;
}
</script>

<style scoped>

.demo-form-inline .el-input {
    --el-input-width: 220px;
}


.titleWrapper{
    text-align: center;
    margin-bottom:  30px;
    position: relative;
}

.loginTitle{
    font-size: 30px;
    color: var(--el-color-primary);
    font-weight: bold;
    margin-bottom: 5px;
}

.loginSubTitle{
    color: var(--el-color-primary);
}

.loginForm{
    width: 40%;
    height: 80%;
}

.textButtonHolder{
    text-align: right;
    margin-bottom: 20px;
}

.loginButtonHolder{
    width: 100%;
    text-align: center;
}

.loginButtonHolder>button{
    height: 40px;
    width: 60%;
}
.errorText{
    font-size: 10px;
    height: 0;
    width: 100%;
    color: var(--el-color-error);
    transform: translateY(-15px);
}

.error .el-input{
    --el-input-border-color:var(--el-color-error)

}
</style>
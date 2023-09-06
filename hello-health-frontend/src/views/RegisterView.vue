<template>
    <el-form 
        :label-position="'top'" 
        label-width="60px"
        :model="registerCredential"
        class="registerForm"
    >
        <div class="titleWrapper">
            <div class="registerTitle">注册</div>
        </div>

        <el-form-item label="用户名" v-bind:class="{ error: isError }">
            <el-input v-model="registerCredential.username" @click="clearErrorBorder" />
        </el-form-item>
        <el-form-item label="手机号" v-bind:class="{ error: isError }">
            <el-input v-model="registerCredential.user_phone" @click="clearErrorBorder" />
        </el-form-item>
        <el-form-item label="验证码" v-bind:class="{ error: isError }">
            <div class="inputWithButton">
                <el-input v-model="registerCredential.verification_code" @click="clearErrorBorder" />
                <el-button :disabled="countdown > 0" @click="sendVerificationCode">
                    {{ countdown > 0 ? `重新发送(${countdown})` : "发送验证码" }}
                </el-button>
            </div>
        </el-form-item>
        <el-form-item label="密码" v-bind:class="{ error: isError }">
            <el-input v-model="registerCredential.password" type="password" @click="clearErrorBorder" show-password/>
        </el-form-item>
        <el-form-item label="确认密码" v-bind:class="{ error: isError }">
            <el-input v-model="repeatPassword" type="password" @click="clearErrorBorder" show-password/>
        </el-form-item>
        <div class="errorText">{{ errorMsg }}</div>
        <div class="textButtonHolder">
            <router-link to="/login">
                <el-button type="primary" link>已有账号?点此登录</el-button>
            </router-link>
            <router-link to="/login/forgot">
                <el-button type="primary" link>忘记密码?</el-button>
            </router-link>
        </div>
        <div class="registerButtonHolder">
            <el-button type="primary" @click="onSubmit">注册</el-button>
        </div>
    </el-form>
</template>
  
<script setup>
import {reactive, ref} from 'vue'
import axios from "axios";
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";
import {ElMessage} from "element-plus";

changeTheme('#93b27b')

const registerCredential = reactive({
    username: '',
    user_phone: '',
    verification_code: '',
    password: '',
})

const repeatPassword = ref('')

const errorMsg = ref('')
const isError = ref(false)
const onSubmit = () => {
    errorMsg.value = ''
    isError.value = false

    let regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (registerCredential.username === '') {
        errorMsg.value = '请输入用户名！'
        isError.value = true
        return
    } else if (registerCredential.user_phone === '') {
        errorMsg.value = '请输入手机号！'
        isError.value = true
        return
    } else if (!regPhone.test(registerCredential.user_phone)) {
        errorMsg.value = '请输入正确的手机号！'
        isError.value = true
        return
    } else if (registerCredential.verification_code === '') {
        errorMsg.value = '请输入验证码！'
        isError.value = true
        return
    } else if (repeatPassword.value !== registerCredential.password) {
        errorMsg.value = '两次密码输入不一致！'
        isError.value = true
        return
    }
    axios.post('/api/Register', registerCredential).then( response =>{
        isError.value = false
        errorMsg.value = ''
        alert('注册成功！')
        router.push("/login")
    }).catch( error => {
        if(error.network) return;
        switch(error.errorCode){
            case 101:
                errorMsg.value = '验证码错误！'
                isError.value = true;
                break;
            case 102:
                errorMsg.value = '用户已存在！'
                isError.value = true
                break;
            case 103:
                errorMsg.value = '用户名重复，请重新设定用户名！'
                isError.value = true
                break;
            default:
                error.defaultHandler()
        }
    })
}

const clearErrorBorder = () => {
    isError.value = false
}

const countdown = ref(0)

const sendVerificationCode = async () => {
    errorMsg.value = ''
    isError.value = false

    const requestVerificationCode = {
        user_phone: registerCredential.user_phone,
    }

    let regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (registerCredential.user_phone === '') {
        errorMsg.value = '请输入手机号！'
        isError.value = true
        return
    } else if (!regPhone.test(registerCredential.user_phone)) {
        errorMsg.value = '请输入正确的手机号！'
        isError.value = true
        return
    }

    countdown.value = 60;

    const timer = setInterval(() => {
        countdown.value -= 1;
        if (countdown.value === 0) {
            clearInterval(timer);
        }
    }, 1000);

    axios.post('/api/Register/SendVerificationCode', requestVerificationCode).then(response => {
        isError.value = false
        errorMsg.value = ''
        ElMessage.success("发送成功。")
    }).catch(error => {
        if(error.network) return;
        switch (error.errorCode) {
            case 104:
                errorMsg.value = '发送失败，请稍后重试'
                isError.value = true
                break;
            default:
                error.defaultHandler();
        }
    })
}
</script>
  
<style scoped>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.titleWrapper {
    text-align: center;
    margin-bottom: 10px;
    position: relative;
}

.registerTitle {
    font-size: 30px;
    color: var(--el-color-primary);
    font-weight: bold;
    margin-bottom: 5px;
}

.registerSubTitle {
    color: var(--el-color-primary);
}

.registerForm {
    width: 40%;
    height: 100%;
}

.textButtonHolder {
    text-align: right;
    margin-bottom: 20px;
}

.registerButtonHolder {
    width: 100%;
    text-align: center;
}

.registerButtonHolder>button {
    height: 40px;
    width: 60%;
}

.errorText {
    font-size: 10px;
    height: 0;
    width: 100%;
    color: var(--el-color-error);
    transform: translateY(-15px);
}

.error .el-input {
    --el-input-border-color: var(--el-color-error);
}

.inputWithButton {
    display: flex;
    width: 100%;
}

.inputWithButton .el-input {
    margin-right: 10px;
}
</style>
  
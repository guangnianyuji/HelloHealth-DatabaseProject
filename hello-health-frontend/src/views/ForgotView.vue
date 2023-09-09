<template>
    <el-form
        :label-position="'top'"
        label-width="60px"
        :model="forgotPasswordCredential"
        class="forgotForm"
    >
        <div class="titleWrapper">
            <div class="forgotTitle">找回密码</div>
            <div class="forgotSubTitle">验证手机以重设密码</div>
        </div>

        <el-form-item label="手机号" v-bind:class="{ error: isError }">
            <el-input v-model="forgotPasswordCredential.user_phone" @click="clearErrorBorder"/>
        </el-form-item>
        <el-form-item label="验证码" v-bind:class="{ error: isError }">
            <div class="inputWithButton">
                <el-input v-model="forgotPasswordCredential.verification_code" @click="clearErrorBorder" />
                <el-button :disabled="countdown > 0" @click="sendVerificationCode">
                    {{ countdown > 0 ? `重新发送(${countdown})` : "发送验证码" }}
                </el-button>
            </div>
        </el-form-item>
        <el-form-item label="新密码" v-bind:class="{ error: isError }">
            <el-input v-model="forgotPasswordCredential.new_password" type="password" @click="clearErrorBorder" show-password/>
        </el-form-item>
        <el-form-item label="确认密码" v-bind:class="{ error: isError }">
            <el-input v-model="repeatPassword" type="password" @click="clearErrorBorder" show-password/>
        </el-form-item>
        <div class="errorText">{{errorMsg}}</div>
        <div class="textButtonHolder">
            <router-link to="/login">
                <el-button type="primary" link>已有账号?点此登录</el-button>
            </router-link>
            <router-link to="/login/register">
                <el-button type="primary" link>注册</el-button>
            </router-link>
        </div>
        <div class="forgotButtonHolder">
            <el-button type="primary" @click="onSubmit">重设密码</el-button>
        </div>
    </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue'
import axios from "axios";
import {changeTheme} from "@/assets/changeTheme";
import router from "@/router";
import {ElMessage} from "element-plus";

changeTheme("#93b27b")

const forgotPasswordCredential = reactive({
    user_phone: '',
    verification_code: '',
    new_password: '',
})

const repeatPassword = ref('')

const errorMsg = ref('')
const isError = ref(false)
const onSubmit = async () => {
    errorMsg.value = "";
    isError.value = false;

    let regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    console.log(forgotPasswordCredential)
    if(forgotPasswordCredential.user_phone===''){
        errorMsg.value = "请输入手机号！"
        isError.value = true
        return
    } else if(!regPhone.test(forgotPasswordCredential.user_phone)){
        errorMsg.value = "请输入正确的手机号！"
        isError.value = true
        return
    } else if (forgotPasswordCredential.verification_code === '') {
        errorMsg.value = '请输入验证码！'
        isError.value = true
        return
    } else if (forgotPasswordCredential.new_password === '') {
        errorMsg.value = '请输入新密码！'
        isError.value = true
        return
    } else if (repeatPassword.value !== forgotPasswordCredential.new_password) {
        errorMsg.value = '两次密码输入不一致！'
        isError.value = true
        return
    }
    
    axios.post("/api/Register/ForgotPassword",forgotPasswordCredential).then(response => {
        isError.value = false;
        errorMsg.value = ''
        alert('密码重设成功！')
        router.push("/login")
    }).catch(error => {
        if(error.network) return;
        switch(error.errorCode){
            case 105:
                errorMsg.value = '验证码错误！'
                isError.value = true
                break;
            case 106:
                errorMsg.value = '用户不存在！'
                isError.value = true
                break;
            default:
                error.defaultHandler()
        }
    })
}

const clearErrorBorder = () =>{
    isError.value = false;
}

const countdown = ref(0)

const sendVerificationCode = async () => {
    errorMsg.value = ''
    isError.value = false

    const requestVerificationCode = {
        user_phone: forgotPasswordCredential.user_phone,
    }

    let regPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (forgotPasswordCredential.user_phone === '') {
        errorMsg.value = '请输入手机号！'
        isError.value = true
        return
    } else if (!regPhone.test(forgotPasswordCredential.user_phone)) {
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


.titleWrapper{
    text-align: center;
    margin-bottom:  20px;
    position: relative;
}

.forgotTitle{
    font-size: 30px;
    color: var(--el-color-primary);
    font-weight: bold;
    margin-bottom: 5px;
}

.forgotSubTitle{
    color: var(--el-color-primary);
}

.forgotForm{
    width: 40%;
    height: 90%;
}

.textButtonHolder{
    text-align: right;
    margin-bottom: 20px;
}

.forgotButtonHolder{
    width: 100%;
    text-align: center;
}

.forgotButtonHolder>button{
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

.inputWithButton {
    display: flex;
    width: 100%;
}

.inputWithButton .el-input {
    margin-right: 10px;
}
</style>
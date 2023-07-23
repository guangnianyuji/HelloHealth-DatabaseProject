<script setup>
import {ref} from "vue";
import globalData from "@/global/global"
const emit = defineEmits(["replySubmit"])
const replyContent = ref('')
const submitReply = () => {
    emit("replySubmit",replyContent,void 0,submitSuccess)
}

const submitSuccess = () =>{
    replyContent.value = '';
}
</script>

<template>
    <div class="replyBar">
        <el-avatar class="avatar" :src="globalData.userInfo.avatar_url" :size="32"></el-avatar>
        <el-input class="input" v-model="replyContent" type="textarea" :rows="1"></el-input>
        <el-button class="btn" @click="submitReply" type="primary">回复</el-button>
    </div>
</template>

<style scoped>
.replyBar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
}

.input{
    margin: 0 10px;
}

.avatar{
    height: 32px;
    min-height: 32px;
    width: 32px;
    min-width: 32px;
}

</style>
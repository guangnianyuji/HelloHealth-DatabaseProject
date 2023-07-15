<script setup>
import UserInfoCard from "@/components/UserInfoCard.vue";
import {ref} from "vue";
import ReplyBar from "@/components/postView/ReplyBar.vue";
import globalData from "@/global/global"
import {ElMessage} from "element-plus";
import ReportButton from "@/components/postBoardView/ReportButton.vue";
import LikeButton from "@/components/postBoardView/LikeButton.vue";
import axios from "axios";

const prop = defineProps({
    commentInfo: Object,
    floor_id: Number
})
const emits = defineEmits(["replyClicked"])

const showComment = ref(false)

defineExpose({
    showComment,
    prop
})
const showReplyBox = () =>{
    if(!globalData.login){
        ElMessage.error('请先登录再参与讨论。')
        return;
    }
    if(showComment.value){
        showComment.value = false;
        return
    }
    emits("replyClicked");
    showComment.value = true;
}

const onReplySubmit = (content,handler) =>{
    if(content.length < 5){
        ElMessage.error("请输入更多内容。");
        return;
    }
    axios.post("/api/CommentFloor", {
        content: content.value,
        reply_floor_id: prop.floor_id,
        reply_user_id: prop.commentInfo.author.user_id
    })
        .then((res)=> {
            let responseObj = res.data;
            if(responseObj.errorCode!==200) {
                ElMessage.error('发送失败，错误码：' + responseObj.errorCode);
                return;
            }
            if(responseObj.data.status!==true) {
                ElMessage.error('发送失败：' + responseObj.data.msg);
                return;
            }
            ElMessage.success('发送成功，请等待审核通过。');
            handler()
            emits("replyClicked");
        })
        .catch((errMsg) => {
            console.log(errMsg);
            ElMessage.error(errMsg);
        });

}

</script>

<template>
<div class="commentWrapper">
    <UserInfoCard :user-info="commentInfo.author"></UserInfoCard>
    <div class="content">
        <p>
            <!--TODO:要变成能点击的样式，等个人界面做好-->
            <span v-if="commentInfo.comment_user_id!==-1">
            回复 {{commentInfo.comment_user_name}} :
            </span>
            <span>
                {{commentInfo.content}}
            </span>
        </p>

        <div class="reward_info">
            <div>
                {{commentInfo.post_time}}
            </div>
            <LikeButton :comment_id="commentInfo.comment_id" :like-info="commentInfo.like"></LikeButton>

            <div class="replyButton" @click="showReplyBox">
                回复
            </div>

            <el-popover placement="top" :width="100" trigger="click">
                <template #reference>
                    <i class="fi fi-rr-menu-dots centerIcon replyButton"></i>
                </template>
                <ReportButton :comment_id="commentInfo.comment_id"></ReportButton>
            </el-popover>
        </div>
    </div>

    <div class="input" v-if="showComment">
        <ReplyBar @reply-submit="onReplySubmit"></ReplyBar>
    </div>
</div>
</template>

<style scoped>
.commentWrapper{
    padding: 10px 10px 0 10px;

    border-top: 1px solid #ccc;
    margin-bottom: 10px;
}
.content{
    padding-left: 60px;
    font-size: 0.9em;
    line-height: 1.6em;
    color: #222;
}

.reward_info{
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 0.9em;
    color:#999;
}

.reward_info>*{
    margin-right: 10px;
}

.replyButton{
    cursor: pointer;
    user-select: none;
}
.replyButton:hover{
    color: var(--el-color-primary);
}
</style>
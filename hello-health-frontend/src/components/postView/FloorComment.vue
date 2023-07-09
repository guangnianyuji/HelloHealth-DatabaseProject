<script setup>
import UserInfoCard from "@/components/UserInfoCard.vue";
import {ref} from "vue";
import ReplyBar from "@/components/postView/ReplyBar.vue";
import globalData from "@/global/global"
import {ElMessage} from "element-plus";
import ReportButton from "@/components/postBoardView/ReportButton.vue";
import LikeButton from "@/components/postBoardView/LikeButton.vue";

const prop = defineProps({
    commentInfo: Object,
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



</script>

<template>
<div class="commentWrapper">
    <UserInfoCard :user-info="commentInfo.author"></UserInfoCard>
    <div class="content">
        <div>
            {{commentInfo.content}}
        </div>
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
        <ReplyBar></ReplyBar>
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
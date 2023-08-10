<script setup>
import UserInfoCard from "@/components/UserInfoCard.vue";
import {ref} from "vue";
import ReplyBar from "@/components/postView/ReplyBar.vue";
import globalData from "@/global/global"
import {ElMessage} from "element-plus";
import ReportButton from "@/components/postBoardView/ReportButton.vue";
import LikeButton from "@/components/postBoardView/LikeButton.vue";
import DeleteButton from "@/components/postBoardView/DeleteButton.vue";

const prop = defineProps({
    commentInfo: Object,
    floor_id: Number,
    postInfo: Object
})
const emits = defineEmits(["replyClicked","replySent"])

const showComment = ref(false)

const deleted = ref(false)

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

const onReplySubmit = (content,_,handler) =>{
    emits("replySent",content,prop.commentInfo.author,handler);
}

const onMeDeleted = () => {
    deleted.value =  true
}

</script>

<template>
<div class="commentWrapper" v-if="!deleted">
    <UserInfoCard :user-info="commentInfo.author"></UserInfoCard>
    <div class="content">
        <p>
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
                <div style="text-align: center">
                    <ReportButton :comment_id="commentInfo.comment_id"></ReportButton>
                    <DeleteButton v-if="globalData.userInfo.user_id === postInfo.floors[0].author.user_id || globalData.userInfo.user_id === commentInfo.author.user_id" :comment_id="commentInfo.comment_id" @deleted="onMeDeleted"></DeleteButton>
                </div>
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
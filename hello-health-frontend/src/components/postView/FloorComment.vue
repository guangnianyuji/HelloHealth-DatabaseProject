<script setup>
import UserInfoCard from "@/components/UserInfoCard.vue";
import {ref} from "vue";
import ReplyBar from "@/components/postView/ReplyBar.vue";
import globalData from "@/global/global"
import {ElMessage} from "element-plus";

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
            <div>
                {{JSON.stringify(commentInfo.reward_count)}}
            </div>

            <div id="commentReplyButton" @click="showReplyBox">
                回复
            </div>
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
    flex-direction: row;
    font-size: 0.75em;
    color:#999;
}
</style>
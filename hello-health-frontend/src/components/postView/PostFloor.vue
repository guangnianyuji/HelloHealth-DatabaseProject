<script setup>
//显示帖子的一个楼层，首先检测title是否存在，存在才会去显示悬赏信息
// position: sticky这个属性特别好玩，各位可以试一试
import UserInfoCard from "@/components/UserInfoCard.vue";
import FloorComment from "@/components/postView/FloorComment.vue";
import {ref} from "vue";
import ReplyBar from "@/components/postView/ReplyBar.vue";
import globalData from "@/global/global";
import {ElMessage} from "element-plus";
import LikeButton from "@/components/postBoardView/LikeButton.vue";
import CoinButton from "@/components/postBoardView/CoinButton.vue";
import StarButton from "@/components/postBoardView/StarButton.vue";
import ReportButton from "@/components/postBoardView/ReportButton.vue";
import TipTapEditorReadonly from "@/components/postView/TipTapEditorReadonly.vue";
import axios from "axios";
import SetSolutionButton from "@/components/postBoardView/SetSolutionButton.vue";

const prop = defineProps({
    floorInfo:Object,
    title:String,
    isBounty:Boolean,
    bountyValue:Number,
    solution:Number,
    starInfo: Object,
    isSolution: Boolean,
    canSetSolution: Boolean
})

const isSolutionReal = ref(prop.isSolution);

const emits = defineEmits(['replyClicked','firstFloorReplyClicked','goToSolutionClicked','solutionSet'])

const comments = ref()

const showReplyBar = ref(false)

const closeAllReplyBar = () =>{
    showReplyBar.value = false;
    for(let [k,comment] of Object.entries(comments.value)){
        comment.showComment = false;
    }
}

defineExpose({
    closeAllReplyBar,
})

const onCommentReplyClicked = ()=>{
    emits('replyClicked')
}

const openReplyBar = () =>{
    if(!globalData.login){
        ElMessage.error('请先登录再参与讨论。')
        return;
    }

    if(prop.title){
        emits("firstFloorReplyClicked")
        return
    }

    if(showReplyBar.value){
        showReplyBar.value = false;
        return
    }
    emits('replyClicked')
    showReplyBar.value = true;
}

const onReplySubmit = (content,handler) =>{
    if(content.length < 5){
        ElMessage.error("请输入更多内容。");
        return;
    }
    axios.post("/api/CommentFloor", {
        content: content.value,
        reply_floor_id: prop.floorInfo.comment_id,
        reply_user_id: -1
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
    <div class="floorWrapper">
        <div class="userInfoWrapper">
            <div class="header">
                <UserInfoCard :user-info="floorInfo.author"></UserInfoCard>
                <el-button type="primary">
                    <i class="fi fi-rr-plus addIcon"></i><span> 关注</span>
                </el-button>
            </div>
            <div class="info">
                <div><p>粉丝</p><p>{{floorInfo.author.follower}}</p></div>
                <div><p>关注</p><p>{{floorInfo.author.follows}}</p></div>
            </div>

        </div>
        <div class="contentWrapper">
            <div v-if="title" class="title">{{title}}</div>
            <el-tag v-if="title && isBounty && solution !== -1" class="bountyTag">
                <span>赏金{{bountyValue}}杏仁币，</span>
                <span @click="emits('goToSolutionClicked')" class="scrollToSolutionButton">点击查看最佳答案</span>
            </el-tag>
            <el-tag v-if="title && isBounty && solution === -1" class="bountyTag" type="warning">正在进行悬赏！赏金{{bountyValue}}杏仁币。</el-tag>
            <el-tag v-if="isSolutionReal" class="bountyTag">
                <div style="display: flex; align-items: center;">
                    <i class="fi fi-sr-badge centerIcon"></i><span>最佳答案</span>
                </div>
            </el-tag>
            <div class="content">
                <TipTapEditorReadonly :content-json-string="floorInfo.content"></TipTapEditorReadonly>
            </div>
            <div class="contentStatus">
                <div class="time">
                    {{floorInfo.post_time}}
                </div>
                <div class="rewards">
                    <el-popover placement="top" :width="'auto'" trigger="click">
                        <template #reference>
                            <i class="fi fi-rr-menu-dots centerIcon replyButton"></i>
                        </template>
                        <ReportButton :comment_id="floorInfo.comment_id"></ReportButton>
                    </el-popover>
                    <SetSolutionButton
                        :comment_id="floorInfo.comment_id"
                        :comment_user_name="floorInfo.author.user_name"
                        @solution-set="isSolutionReal=true;emits('solutionSet',floorInfo.comment_id)"
                        v-if="canSetSolution">
                    </SetSolutionButton>
                    <LikeButton :comment_id="floorInfo.comment_id" :like-info="floorInfo.reward.like"></LikeButton>
                    <CoinButton :comment_id="floorInfo.comment_id" :coin-info="floorInfo.reward.coin">
                    </CoinButton>
                    <StarButton v-if="title" :comment_id="floorInfo.comment_id" :star-info="starInfo"></StarButton>

                    <div class="replyButton" @click="openReplyBar">
                        评论
                    </div>
                </div>
            </div>
            <div v-if="showReplyBar && !title">
                <ReplyBar @replySubmit="onReplySubmit"></ReplyBar>
            </div>

            <div class="commentsHolder" v-if="!title">
                <FloorComment ref="comments" v-for="item in floorInfo.comments" :comment-info="item" :floor_id="floorInfo.comment_id" @replyClicked="onCommentReplyClicked"></FloorComment>
            </div>
        </div>
    </div>
</template>

<style scoped>
.floorWrapper{
    display: flex;
    flex-direction: row;

    width: 100%;
    justify-items: stretch;
    margin-bottom: 10px;
}

.floorWrapper>*{
    box-shadow: 0 3px 3px rgba(36,37,38,.05);
    border-radius: 3px;
}

.userInfoWrapper{
    position: sticky;
    flex: 1;
    top: 0;
    padding: 15px;
    background-color: #fff;
    height: 150px;
    min-height: 150px;
    box-sizing: border-box;
    margin-right: 10px;
    width: 300px;
    max-width: 300px;
}

.userInfoWrapper .header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 10px;

}

.userInfoWrapper .info{
    display: flex;
    flex-direction: row;
    height: 50px;
    align-items: center;
}

.userInfoWrapper .info>*{
    flex: 1;
    text-align: center;
    line-height: 1.5em;
}
.addIcon{
    margin-right: 5px;
}

.contentWrapper{
    min-height: 150px;
    background-color: #fff;
    flex:3;
    padding: 20px;
    box-sizing: border-box;
}

.title{
    font-weight: bold;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px #ccc solid;
    font-size: 1.5em;
}

.content {
    line-height: 1.7em;
    min-height: 200px;
}

.contentStatus {
    display: flex;
    justify-content: space-between;
    margin:10px 0;
    color: #999;
    font-size: 0.75em;

}



.rewards{
    display: flex;
    flex-direction: row;
    align-items: center;
}

.rewards>*{
    margin: 0 5px
}

.bountyTag{
    font-size: 1em;
    padding: 5px 10px;
    box-sizing: content-box;
    margin-bottom: 10px;
}

.replyButton{
    cursor: pointer;
    user-select: none;
}
.replyButton:hover{
    color: var(--el-color-primary);
}

.scrollToSolutionButton:hover{
    cursor: pointer;
    color: var(--el-color-primary-light-5);
}
</style>
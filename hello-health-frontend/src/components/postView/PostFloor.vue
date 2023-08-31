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
import DeleteButton from "@/components/postBoardView/DeleteButton.vue";
import router from "@/router";

const prop = defineProps({
    floorInfo:Object,
    postInfo: Object,
    postId: Number
})

const isSolutionReal = ref(prop.postInfo.solution === prop.floorInfo.comment_id);

const emits = defineEmits(['replyClicked','firstFloorReplyClicked','goToSolutionClicked','solutionSet',"userFollowStateToggled"])

const comments = ref()

const showReplyBar = ref(false)

const closeAllReplyBar = () =>{
    showReplyBar.value = false;
    if(!comments.value) return;
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
    if(globalData.locked){
        ElMessage.error('抱歉，您的账号已经被封禁！')
        return;
    }

    if(prop.floorInfo.floor_number===1){
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

const onReplySubmit = (content,reply_user_info,handler) =>{
    if(content.length < 1){
        ElMessage.error("请输入更多内容。");
        return;
    }
    axios.post("/api/Forum/CommentFloor", {
        content: content.value,
        reply_floor_id: prop.floorInfo.comment_id,
        reply_user_id: reply_user_info ? reply_user_info.user_id: -1
    })
        .then((res)=> {
            ElMessage.success('发送成功。');
            newComments.value.push({
                content: content.value,
                comment_id: res.json.comment_id,
                like: {
                    status: false,
                    num: 0
                },
                author: globalData.userInfo,
                comment_user_id: reply_user_info ? reply_user_info.user_id : -1,
                comment_user_name: reply_user_info ? reply_user_info.user_name : '',
                post_time: res.json.post_time

            })
            handler()
            emits("replyClicked");
        })
        .catch((error) => {
            if(error.network) return;
            error.defaultHandler("发送失败");
        });

}

const newComments = ref([])

const deleted = ref(false)
const onMeDeleted = () => {
    deleted.value = true
    if(prop.floorInfo.floor_number===1)
        router.push("/forum")
}

const onFollowClicked = () => {
    axios.post("/api/UserInfo/followUser",{followUserID: prop.floorInfo.author.user_id,}).then((res)=>{
        emits("userFollowStateToggled", true, prop.floorInfo.author.user_id, true)
        ElMessage.success("已关注"+prop.floorInfo.author.user_name)
    }).catch(error => {
        if(error.network) return;
        switch (error.errorCode){
            case 118:
                ElMessage.error("已关注该用户")
                emits("userFollowStateToggled", true, prop.floorInfo.author.user_id, false)
                break;
            default:
                error.defaultHandler("关注用户失败");
        }
    })
}

const onUnfollowClicked = () => {
    axios.post("/api/UserInfo/unfollowUser",{followUserID: prop.floorInfo.author.user_id,}).then((res)=>{
        emits("userFollowStateToggled", false, prop.floorInfo.author.user_id, true)
        ElMessage.success("已关注取消关注"+prop.floorInfo.author.user_name)
    }).catch(error => {
        if(error.network) return;
        switch (error.errorCode){
            case 118:
                ElMessage.error("已不再关注该用户")
                emits("userFollowStateToggled", false, prop.floorInfo.author.user_id, false)
                break;
            default:
                error.defaultHandler("取消关注用户失败");
        }
    })
}

</script>

<template>
    <div class="floorWrapper" v-if="!deleted" :floor="floorInfo.floor_number">
        <div class="userInfoWrapper">
            <div class="header">
                <UserInfoCard :user-info="floorInfo.author"></UserInfoCard>
                <div v-if="globalData.login && globalData.userInfo.user_id !== floorInfo.author.user_id">
                    <el-button v-if="floorInfo.author.followed" @click="onUnfollowClicked">
                        <i class="fi fi-rr-minus addIcon"></i><span>已关注</span>
                    </el-button>
                    <el-button type="primary" v-else @click="onFollowClicked">
                        <i class="fi fi-rr-plus addIcon"></i><span>关注</span>
                    </el-button>
                </div>
            </div>
            <div class="info">
                <div><p>粉丝</p><p>{{floorInfo.author.follower}}</p></div>
                <div><p>关注</p><p>{{floorInfo.author.follows}}</p></div>
            </div>

        </div>
        <div class="contentWrapper">
            <div class="floorNumberIndicator">#{{floorInfo.floor_number}}</div>
            <div v-if="floorInfo.floor_number===1" class="title">{{postInfo.title}}</div>
            <el-tag v-if="floorInfo.floor_number===1 && postInfo.is_bounty && postInfo.solution !== -1" class="bountyTag">
                <span>赏金{{postInfo.bounty_value}}杏仁币，</span>
                <span @click="emits('goToSolutionClicked')" class="scrollToSolutionButton">点击查看最佳答案</span>
            </el-tag>
            <el-tag v-if="floorInfo.floor_number===1 && postInfo.is_bounty && postInfo.solution === -1" class="bountyTag" type="warning">正在进行悬赏！赏金{{postInfo.bounty_value}}杏仁币。</el-tag>
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
                    <el-popover placement="top" trigger="click">
                        <template #reference>
                            <i class="fi fi-rr-menu-dots centerIcon replyButton"></i>
                        </template>
                        <div style="text-align: center">
                            <ReportButton :comment_id="floorInfo.comment_id"></ReportButton>
                            <DeleteButton
                                v-if="(floorInfo.author.user_id===globalData.userInfo.user_id || postInfo.floors[0].author.user_id === globalData.userInfo.user_id) && !isSolutionReal"
                                :comment_id="floorInfo.comment_id" :is-first-floor="floorInfo.floor_number===1" :is-floor="true" @deleted="onMeDeleted">
                            </DeleteButton>
                        </div>
                    </el-popover>
                    <SetSolutionButton
                        :comment_id="floorInfo.comment_id"
                        :comment_user_name="floorInfo.author.user_name"
                        @solution-set="isSolutionReal=true;emits('solutionSet',floorInfo.comment_id)"
                        v-if="floorInfo.floor_number>1 && postInfo.is_bounty && postInfo.solution === -1 && postInfo.floors[0].author.user_id === globalData.userInfo.user_id">
                    </SetSolutionButton>
                    <LikeButton :comment_id="floorInfo.comment_id" :like-info="floorInfo.reward.like"></LikeButton>
                    <CoinButton :comment_id="floorInfo.comment_id" :coin-info="floorInfo.reward.coin">
                    </CoinButton>
                    <StarButton v-if="floorInfo.floor_number===1" :post_id="postId" :star-info="postInfo.star"></StarButton>

                    <div class="replyButton" @click="openReplyBar">
                        评论
                    </div>
                </div>
            </div>
            <div v-if="showReplyBar && floorInfo.floor_number!==1">
                <ReplyBar @replySubmit="onReplySubmit"></ReplyBar>
            </div>

            <div class="commentsHolder" v-if="floorInfo.floor_number!==1">
                <FloorComment ref="comments" v-for="item in floorInfo.comments" :comment-info="item" :floor_id="floorInfo.comment_id" @replyClicked="onCommentReplyClicked" @replySent="onReplySubmit" :post-info="prop.postInfo"></FloorComment>
                <FloorComment ref="comments" v-for="item in newComments" :comment-info="item" :floor_id="floorInfo.comment_id" @replyClicked="onCommentReplyClicked" @replySent="onReplySubmit" :post-info="prop.postInfo"></FloorComment>
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
    min-width: 200px;
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
    position: relative;
}

.floorWrapper.bgTransition .contentWrapper{
    transition: background-color 1.5s linear;
}

.floorWrapper.kiraKira .contentWrapper{
    background-color: #ffff99 !important;
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

.floorNumberIndicator{
    position: absolute;
    top:20px;
    right: 20px;
    color: #ccc;
    font-size: 0.8em;
}
</style>
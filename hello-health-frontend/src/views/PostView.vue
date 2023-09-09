<script setup>
import TipTapEditable from "@/components/postView/TipTapEditable.vue";
import PostFloor from "@/components/postView/PostFloor.vue";
import {computed, nextTick, reactive, ref, watch} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import globalData from "@/global/global";
import {ElMessage} from "element-plus";
import WritePostButton from "@/components/postBoardView/WritePostButton.vue";
const router = useRoute()

let postId = parseInt(router.params.postId);
watch(router,(old,newRoute)=>{
    postId = parseInt(router.params.postId);
    if(typeof(newRoute.params.postId) !== "undefined")
        reloadPost();
})
const postInfo = reactive({
    data:{}
})

const floorsWithoutFirst = computed(() =>{
    return postInfo.data.floors?.slice(1)
})

const floors = ref()

const dialogVisible = ref(false)

const openCommentEditor = () =>{
    if(!globalData.login){
        ElMessage.error('请先登录再参与讨论。')
        return;
    }
    if(globalData.locked){
        ElMessage.error('抱歉，您的账号已经被封禁！')
        return;
    }
    dialogVisible.value = true
}

const reloadPost = ()=>{
    axios.get("/api/Forum/PostInfo/"+ postId)
        .then((res) => {
            postInfo.data = res.json;
            nextTick(gotoSpecificFloor);
        }).catch((error)=>{
        if(error.network) return;
        switch (error.errorCode) {
            case 111:
                ElMessage.error("帖子还在审核")
                break;
            default:
                error.defaultHandler("帖子加载出错");
        }
    })
}
reloadPost();

const onUserFollowStateToggled = (nowState, userId, changeFollowNumber) => {
    for(let floorInfo of postInfo.data.floors){
        if(floorInfo.author.user_id === userId){
            floorInfo.author.followed = nowState;
            if(changeFollowNumber)
                if(nowState)
                    floorInfo.author.follower++;
                else
                    floorInfo.author.follower--;
        }
    }
}

const closeAllFloorReplyBar = () =>{
    for(let floor of floors.value){
        floor.closeAllReplyBar()
    }
}

const editor = ref();

// 发送楼层
const submitNewComment = () => {
    if(editor.value.editor.state.doc.textContent.length < 1) {
        ElMessage.error('请输入更多内容。');
        return;
    }
    axios.post("/api/Forum/SendFloor",{
        content:JSON.stringify(editor.value.editor.getJSON()),
        post_id:postId
    }).then(res => {
        ElMessage.success('发送成功，请等待审核通过。');
        dialogVisible.value = false;
        editor.value.editor.commands.clearContent();
    }).catch(error => {
        if(error.network) return;
        switch (error.errorCode) {
            case 114:
                ElMessage.error("非认证用户不能回复悬赏贴")
                break;
            default:
                error.defaultHandler("发送失败");
        }
    })
}

const onSolutionSet = (comment_id) => {
    postInfo.data.solution = comment_id;
    // 直接scroll好像不行，设个定时器~
    setTimeout(()=>{
        scrollToSolution();
    },100)
}


const scrollToSolution = () => {
    document.querySelector(".solutionFloor")?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
}

const gotoSpecificFloor = ()=>{
    let floor = new URLSearchParams(window.location.search).get("floor");
    if(!floor) return;
    let floorDom = document.querySelector(`[floor="${floor}"]`);
    if(!floorDom){
        ElMessage.error("指定的楼层不存在。");
        return;
    }
    floorDom.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"})

    setTimeout(()=>{
        floorDom.classList.add("kiraKira")
        setTimeout(()=>{
            floorDom.classList.add("bgTransition")
        },10)
        setTimeout(()=>{
            floorDom.classList.remove("kiraKira");
        },20)
        setTimeout(()=>{
            floorDom.classList.remove("bgTransition");
        },2000)
    },400);
}

</script>

<template>
    <div class="viewWrapper">
        <post-floor v-if="postInfo.data.floors && postInfo.data.floors.length>0"
                    :floor-info="postInfo.data.floors[0]"
                    :post-info="postInfo.data"
                    :post-id="postId"
                    @firstFloorReplyClicked="openCommentEditor"
                    @goToSolutionClicked="scrollToSolution"
                    @userFollowStateToggled="onUserFollowStateToggled"
        >
        </post-floor>
        <post-floor v-for="(floor,index) in floorsWithoutFirst"
                    :floor-info="floor"
                    :post-info="postInfo.data"
                    :post-id="postId"
                    :class="{solutionFloor:postInfo.data.solution===floor.comment_id}"
                    ref="floors"
                    @replyClicked="closeAllFloorReplyBar"
                    @solution-set="onSolutionSet"
                    @userFollowStateToggled="onUserFollowStateToggled"
                    >
        </post-floor>
    </div>

    <el-dialog
        v-model="dialogVisible"
        class="editorDialog"
        modal-class="editorDialogModal"
        title="编写回复"
        width="70%"
    >
        <TipTapEditable ref="editor"/>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="submitNewComment">
                    回复
                </el-button>
            </span>
        </template>
    </el-dialog>
    <WritePostButton @click="openCommentEditor" v-if="globalData.login"></WritePostButton>
</template>

<style scoped>
.viewWrapper{
    position: relative;
    width: 85%;
    margin: 0 auto;
}


</style>
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

let postId = router.params.postId;
watch(router,(old,newRoute)=>{
    postId = newRoute.params.postId;
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
    dialogVisible.value = true
}

const reloadPost = ()=>{
    axios.get("/api/PostInfo/"+ postId)
        .then((res) => {
                let responseObj = res.data;
                if(responseObj.errorCode!==200){
                    ElMessage.error("错误代码："+ responseObj.errorCode);
                    return;
                }
                if(!responseObj.data.status){
                    ElMessage.error("帖子加载失败："+ responseObj.data.errorType);
                    return;
                }

                postInfo.data = responseObj.data;
                nextTick(gotoSpecificFloor);
            }
        ).catch((reason)=>{
        alert(reason)
    })
}
reloadPost();



const closeAllFloorReplyBar = () =>{
    for(let floor of floors.value){
        floor.closeAllReplyBar()
    }
}

const editor = ref();
const submitNewComment = async() => {
    if(editor.value.editor.state.doc.textContent.length < 15) {
        ElMessage.error('请输入更多内容。');
        return;
    }
    let response = await axios.post("/api/SendFloor",{
        content:JSON.stringify(editor.value.editor.getJSON()),
        post_id:postId
    })
    let responseObj = response.data;
    if(responseObj.errorCode!==200) {
        ElMessage.error('发送失败，错误码：' + responseObj.errorCode);
        return;
    }
    if(responseObj.data.status!==true) {
        ElMessage.error('发送失败：' + responseObj.data.msg);
        return;
    }
    ElMessage.success('发送成功，请等待审核通过。');
    dialogVisible.value = false;
    editor.value.editor.commands.clearContent();
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
    floorDom.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})

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
                    :title="postInfo.data.title"
                    :is-bounty="postInfo.data.is_bounty"
                    :bounty-value="postInfo.data.bounty_value"
                    :solution="postInfo.data.solution" @replyClicked="closeAllFloorReplyBar"
                    :star-info="postInfo.data.star"
                    @firstFloorReplyClicked="openCommentEditor"
                    @goToSolutionClicked="scrollToSolution"
                    floor="1">
        </post-floor>
        <post-floor v-for="(floor,index) in floorsWithoutFirst"
                    :floor-info="floor"
                    ref="floors"
                    @replyClicked="closeAllFloorReplyBar"
                    @solution-set="onSolutionSet"
                    :is-solution="postInfo.data.solution===floor.comment_id"
                    :class="{solutionFloor:postInfo.data.solution===floor.comment_id}"
                    :can-set-solution="postInfo.data.is_bounty &&
                        postInfo.data.solution === -1 &&
                        globalData.userInfo.user_id===postInfo.data.floors[0].author.user_id &&
                        floor.author.user_id !== globalData.userInfo.user_id"
                    :floor="floor.floor_number">
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
    <WritePostButton @click="openCommentEditor" v-if="globalData.login && (!postInfo.data.is_bounty || globalData.userInfo.verified)"></WritePostButton>
</template>

<style scoped>
.viewWrapper{
    position: relative;
    width: 85%;
    margin: 0 auto;
}


</style>
<script setup>
import TipTapEditable from "@/components/postView/TipTapEditable.vue";
import PostFloor from "@/components/postView/PostFloor.vue";
import {computed, reactive, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import globalData from "@/global/global";
import {ElMessage} from "element-plus";
import WritePostButton from "@/components/postBoardView/WritePostButton.vue";
const router = useRoute()

let postId = router.params.postId;

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

axios.get("/api/PostInfo/"+ postId)
.then((res) => {
        let responseObj = res.data;
        if(responseObj.errorCode!==200){
            alert("错误代码："+ responseObj.errorCode);
            return;
        }
        // if(!responseObj.data.status){
        //     alert("帖子加载失败："+ responseObj.data.errorType);
        //     return;
        // }
        postInfo.data = responseObj.data
    }
).catch((reason)=>{
    alert(reason)
})


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
                    @firstFloorReplyClicked="openCommentEditor"></post-floor>
        <post-floor v-for="(floor,index) in floorsWithoutFirst" :floor-info="floor" ref="floors" @replyClicked="closeAllFloorReplyBar"></post-floor>
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
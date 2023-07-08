<script setup>
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
    console.log(floors.value)
    for(let floor of floors.value){
        floor.closeAllReplyBar()
    }
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
                    @firstFloorReplyClicked="openCommentEditor"></post-floor>
        <post-floor v-for="(floor,index) in floorsWithoutFirst" :floor-info="floor" ref="floors" @replyClicked="closeAllFloorReplyBar"></post-floor>
    </div>

    <el-dialog
        v-model="dialogVisible"
        title="这是个编辑框~"
        width="30%"
    >
        <span>编辑框放这里~</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible.value = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
        </template>
    </el-dialog>
    <WritePostButton  @click="openCommentEditor" v-if="globalData.login"></WritePostButton>
</template>

<style scoped>
.viewWrapper{
    position: relative;
    width: 85%;
    margin: 0 auto;
}


</style>
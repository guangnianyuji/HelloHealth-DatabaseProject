<script setup>
import PostFloor from "@/components/postView/PostFloor.vue";
import {computed, reactive, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import globalData from "@/global/global";
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
                    :solution="postInfo.data.solution" @replyClicked="closeAllFloorReplyBar"></post-floor>
        <post-floor v-for="(floor,index) in floorsWithoutFirst" :floor-info="floor" ref="floors" @replyClicked="closeAllFloorReplyBar"></post-floor>
    </div>
    <div class="writeFloorButton" @click="openCommentEditor" v-if="globalData.login">
        <i class="fi fi-sr-feather"></i>
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="30%"
    >
        <span>This is a message</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible.value = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.viewWrapper{
    position: relative;
    width: 85%;
    margin: 0 auto;
}

.writeFloorButton{
    position: absolute;
    right: 7.5%;
    bottom: 100px;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    background-color: var(--el-color-primary);
    color: #fff;
    font-size: 25px;
    box-shadow: 0 6px 15px rgba(36,37,38,.2);
    text-align: center;
    line-height: 75px;
    cursor: pointer;
}

.writeFloorButton:hover{
    background-color: var(--el-color-primary-light-2);
}
</style>
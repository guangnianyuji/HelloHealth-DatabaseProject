<script setup>
import PostFloor from "@/components/postView/PostFloor.vue";
import {computed, reactive} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
const router = useRoute()

let postId = router.params.postId;

const postInfo = reactive({
    data:{}
})

const floorsWithoutFirst = computed(() =>{
    return postInfo.data.floors?.slice(1)
})

axios.get("/api/PostInfo/"+ postId)
.then((res) => {
        let responseObj = res.data;
        if(responseObj.errorCode!==200){
            alert("错误代码："+ responseObj.errorCode);
            return;
        }
        if(!responseObj.data.status){
            alert("帖子加载失败："+ responseObj.data.errorType);
            return;
        }
        postInfo.data = responseObj.data
    }
).catch((reason)=>{
    alert(reason)
})
</script>

<template>
    <div class="viewWrapper">
        <post-floor v-if="postInfo.data.floors && postInfo.data.floors.length>0"
                    :floor-info="postInfo.data.floors[0]"
                    :title="postInfo.data.title"
                    :is-bounty="postInfo.data.is_bounty"
                    :bounty-value="postInfo.data.bounty_value"
                    :solution="postInfo.data.solution"></post-floor>
        <post-floor v-for="floor in floorsWithoutFirst" :floor-info="floor"></post-floor>
    </div>
</template>

<style scoped>
.viewWrapper{
    width: 85%;
    margin: 0 auto;
}
</style>
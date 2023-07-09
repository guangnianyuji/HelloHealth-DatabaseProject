<template>
    <div class="wrapper" @click="like">
        <el-tooltip class="box-item" placement="top" content="点赞">
            <i v-if="!is_liked" class="fi fi-rr-social-network centerIcon"></i>
            <i v-else class="fi fi-sr-thumbs-up centerIcon"></i>
        </el-tooltip>
        <span>
            {{like_num}}
        </span>
    </div>
</template>

<style scoped>
.wrapper{
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
}

.wrapper:hover{
    color: var(--el-color-primary);
}
</style>

<script>
import { ElMessage } from 'element-plus'
import { reactive } from 'vue';
import axios from "axios";
import globalData from "@/global/global"
export default
{
    props:["comment_id","likeInfo"],
    data:()=>
        ({
            is_liked: false,
            like_num: 0,
        }),
    methods: {
        like() {
            if (!globalData.login) {
                ElMessage.error('请先登录再参与讨论。')
                return;
            }

            this.changeLike();
        },
        changeLike() {//op为0，只查询；op为1 要操作


            axios.post("/api/Comment/Like",
                reactive({
                    operate: 1,
                    comment_id: this.comment_id
                }))
                .then((res) => {
                    this.is_liked = res.data.data.status;
                    this.like_num = res.data.data.comment_like_num;
                    let message;
                    if (this.is_liked === true) {
                        message = "点赞成功！"
                    } else {
                        message = "取消点赞成功！"
                    }
                    ElMessage({
                        showClose: true,
                        message: message,
                        type: 'success',
                    })
                });
        },
    },
    created(){
        this.is_liked = this.likeInfo.status;
        this.like_num = this.likeInfo.num;
    }
}
</script>

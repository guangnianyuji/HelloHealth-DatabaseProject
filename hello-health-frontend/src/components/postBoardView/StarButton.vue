<template>
    <div class="wrapper" @click="star">
        <el-tooltip class="box-item" placement="top" content="收藏">
            <i v-if="!is_stared" class="fi fi-rr-star centerIcon" ></i>
            <i v-else class="fi fi-sr-star centerIcon"></i>
        </el-tooltip>
        <span>
            {{star_num}}
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
import globalData from "@/global/global"
import axios from "axios";
export default
{
    props:["post_id","starInfo"],
    data:()=>
        ({
            is_stared: false,
            star_num: 0,
        }),
    methods:
        {
            star() {
                if(!globalData.login) {
                    ElMessage.error('请先登录再参与讨论。')
                    return;
                }
                this.changeStar();
            },
            changeStar() {
                axios.post("/api/Post/Star",{
                    operate: 1,
                    post_id: this.post_id
                })
                    .then((res)=>{
                        this.is_stared=res.data.data.status;
                        this.star_num=res.data.data.post_star_num;
                        let message;
                        if(this.is_stared===true) {
                            message="收藏帖子成功！"
                        } else {
                            message="取消收藏成功！"
                        }
                        ElMessage({
                            showClose: true,
                            message:message,
                            type: 'success',
                        })
                    }) ;

            }
        },
    created(){
        this.is_stared = this.starInfo.status;
        this.star_num = this.starInfo.num;
    }
}
</script>
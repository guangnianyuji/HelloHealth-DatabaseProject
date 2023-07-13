<template>
    <div class="wrapper" @click="setSolution">
        <i class="fi fi-sr-badge centerIcon"></i>
        <span>
            设置为最佳答案
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
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue';
import axios from "axios";
import globalData from "@/global/global"
export default{
    props:["comment_id",'comment_user_name'],
    emits:['solutionSet'],
    methods:
    {
        setSolution()
        {
            if(!globalData.login)
            {
                ElMessage.error('请先登录再参与讨论。')
                return;
            }
            ElMessageBox.confirm(`确定要设置 ${this.comment_user_name} 的回答为最佳答案？`, '设置最佳答案',
                 {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                })
                .then(() => {

                    axios.post("/api/Comment/SetSolution",
                        reactive({
                            user_id:globalData.userInfo.user_id,
                            comment_id:this.comment_id,
                        }))
                        .then((res)=>{
                            if(res.data.data.status)
                            {
                                ElMessage.success("设置最佳答案成功！");
                                this.$emit("solutionSet")
                            }
                            else
                            {
                                ElMessage.error("抱歉，设置最佳答案失败，请稍后再试");
                            }
                        })
                    }
                ).catch(()=>{});
        }
    }
}

</script>
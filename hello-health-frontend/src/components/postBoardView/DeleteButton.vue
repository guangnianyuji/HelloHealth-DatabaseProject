<template>
    <span class="wrapper">
        <el-tooltip class="box-item" placement="top" content="删除">
        <span style="text-align: left; margin-right: 8px">
          <i class="fi fi-rr-trash" @click="deleteThis"></i>
        </span>
        </el-tooltip>
    </span>
</template>

<style scoped>
.wrapper{
    cursor: pointer;
}

.wrapper:hover{
    color: var(--el-color-primary);
}
</style>

<script>
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
import axios from "axios";
import globalData from "@/global/global"
export default{
    props:["comment_id","isFloor","isFirstFloor"],
    emits:['deleted'],
    methods:
    {
        deleteThis()
        {
            if(!globalData.login)
            {
                ElMessage.error('请先登录再参与讨论。')
                return;
            }
            ElMessageBox.confirm(
                (()=>{
                    if(this.$props.isFirstFloor) return "删除1楼将删除整个帖子，确认继续？"
                    if(this.$props.isFloor) return "删除这层将同时删除其下的所有回复，确认继续？"
                    return "是否删除本回复？"
                })(), '删除',
                 {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                })
                 .then(() => {
                     
                    axios.post("/api/Forum/Delete", {comment_id:this.comment_id,})
                        .then((res)=>{
                            ElMessage.success("删除操作成功");
                            this.$emit("deleted")
                        })
                        .catch(error => {
                            if(error.network) return;
                            error.defaultHandler("删除操作失败")
                        })
                    }).catch(()=>{})
        }
    }
}

</script>
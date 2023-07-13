<template>
    <div>
     <el-tooltip class="box-item" placement="top" content="举报">
        
    <span
      style="text-align: left; margin-right: 8px">
      <i class="fi fi-rr-shield-exclamation" @click="report"></i>
    </span>
        
    </el-tooltip>
    </div>
</template>

<script>
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue';
import axios from "axios";
import globalData from "@/global/global"
export default{
    props:["comment_id"],
    methods:
    {
        report()
        {
            if(!globalData.login)
            {
                ElMessage.error('请先登录再参与讨论。')
                return;
            }
            ElMessageBox.prompt('请说明您的举报理由', '举报', 
                 {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern:
                    /^.+$/,
                    inputErrorMessage: '举报原因不能为空',
                })
                 .then(({ value }) => {
                     
                    axios.post("/api/Comment/Report",
                      reactive({
                         
                        user_id:globalData.userInfo.user_id,
                        comment_id:this.comment_id,
                        reason:value
                       }))
                       .then((res)=>{
                        if(res.data.data.status)
                        {
                            ElMessage.success("举报信息提交成功！");
                        }
                         else
                         {
                            ElMessage.error("抱歉，举报信息提交失败，请再次尝试");
                         }
                      }) 
                    }
                ).catch(()=>{})
        }
    }
}

</script>
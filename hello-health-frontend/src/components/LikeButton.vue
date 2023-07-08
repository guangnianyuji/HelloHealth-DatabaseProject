<template>
    <div>
    <el-tooltip class="box-item" placement="top" content="点赞">
    <span
      style="text-align: left; margin-right: 8px"
      v-if="!is_liked">
        <i class="fi fi-rr-social-network" @click="like"></i>
    </span>
    <span
      style="text-align: left; margin-right: 8px"
      v-else
    >
        <i class="fi fi-sr-thumbs-up" @click="like"></i>
        
    </span>
    </el-tooltip>
    <span
     style="like-number">
        {{like_num}}
     </span>

    </div>


</template>

<style scoped>
.like-number{
    text-align:left;
}

</style>

<script>
import { ElMessage } from 'element-plus'
import { reactive } from 'vue';
import axios from "axios";
import globalData from "@/global/global"
    export default
    {
        props:["comment_id"],
        data:()=>
        ({
            is_liked: false,
            like_num: 0,
            comment_id: 0,

        }),
        watch:
        {
            comment_id:function(newData)
             {
                this.comment_id=newData;
             }
        },
        methods:
        {
            like()
            {
                if(!globalData.login)
            {
                ElMessage.error('请先登录再参与讨论。')
                return;
            }
            
                this.changeLike(1);
            },
            changeLike(op)
            {//op为0，只查询；op为1 要操作
                            
            //以后全局获取user_id,没有登录就是-1
            
            let user_id=-1;
          
                if(op==1)
            {
              user_id=globalData.userInfo.user_id
            }
          
                axios.post("/api/Comment/Like",
                    reactive({
                       operate:op,
                       user_id:user_id,
                       comment_id: this.comment_id
                    }))
                    .then((res)=>{
                        this.is_liked=res.data.data.status;
                         this.like_num=res.data.data.comment_like_num;
                    }) ;
                
           
 
                if(op==1)//操作//只会在登录情况下走进下面的语句
                {
                  let message="";
                  if(this.is_liked==true)
                 {
                         message="点赞成功！"
                 }
                 else
                {
                       message="取消点赞成功！"
                }
                    ElMessage({
                        showClose: true,
                        message:message,
                        type: 'success',
                     })
                }
            }
        },
        created(){
            this.changeLike(0);
        }
    }
</script>

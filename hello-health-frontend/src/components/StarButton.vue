<template>
    <div>
    <el-tooltip class="box-item" placement="top" content="收藏">    
    <span
      style="text-align: left; margin-right: 8px"
      v-if="!is_stared">
        <i class="fi fi-rr-star" @click="star"></i>
    </span>
    <span
      style="text-align: left; margin-right: 8px"
      v-else
    >
        <i class="fi fi-sr-star" @click="star"></i>
        
    </span>
    </el-tooltip>
    <span
     style="star-number">
        {{star_num}}
     </span>
     
    </div>


</template>

<style scoped>
.star-number{
    text-align:left;
}

</style>

<script>
import { ElMessage } from 'element-plus'
import { reactive } from 'vue';
import globalData from "@/global/global"
import axios from "axios";
    export default
    {
        props:["post_id"],
        data:()=>
        ({
            is_stared: false,
            star_num: 0,
            post_id: 0,

            
        }),
        watch:
        {
            post_id:function(newData)
             {
                this.post_id=newData;
             }
        },
        methods:
        {
            star()
            {
                if(!globalData.login)
            {
                ElMessage.error('请先登录再参与讨论。')
                return;
            }

                this.changeStar(1);
            },
            changeStar(op)
            {//op为0，只查询；op为1 要操作
                         
            //以后全局获取user_id,没有登录就是-1
            
                
                let user_id=-1;
          
                if(op==1)
                {
                    user_id=globalData.userInfo.user_id
                }
                axios.post("/api/Post/Star",
                    reactive({
                       operate:op,
                       user_id:user_id,
                       post_id: this.post_id
                    }))
                    .then((res)=>{
                        this.is_stared=res.data.data.status;
                         this.star_num=res.data.data.post_star_num;
                    }) ;
                
           
                   
                if(op==1)//操作//只会在登录情况下走进下面的语句
                {
                  let message="";
                  if(this.is_stared==true)
                 {
                         message="收藏帖子成功！"
                 }
                 else
                {
                       message="取消收藏成功！"
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
            this.changeStar(0);
        }
    }
</script>
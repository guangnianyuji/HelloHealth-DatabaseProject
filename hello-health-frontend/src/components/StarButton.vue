<template>
    <div>
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
import axios from "axios";
    export default
    {
        props:["post_id"],
        data:()=>
        ({
            is_stared: false,
            star_num: 0,
            post_id: 0,

            //云端mock地址，可删
            test_add: "https://mock.apifox.cn/m1/2961538-0-default"
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
                //此处要检测有没有登录
                //没有的话要跳转去登录

                this.changeStar(1);
            },
            changeStar(op)
            {//op为0，只查询；op为1 要操作
                            
            //以后全局获取user_id,没有登录就是-1
            
                let user_id=-1;

          
                axios.post(this.test_add+"/api/Post/Star",
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
                         message="收藏成功！"
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
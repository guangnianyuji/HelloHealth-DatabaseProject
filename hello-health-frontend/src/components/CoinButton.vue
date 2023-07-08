<template>
    <div>
    <el-tooltip class="box-item" placement="top" content="投币">
    <span
      style="text-align: left; margin-right: 8px"
      v-if="!is_coined">
        <i class="fi fi-rr-usd-circle" @click="coinIn"></i>
    </span>
    <span
      style="text-align: left; margin-right: 8px"
      v-else
    >
        <i class="fi fi-sr-usd-circle" @click="coinIn"></i>
        
    </span>
    </el-tooltip>
    <span
     style="coin-number">
        {{coin_num}}
     </span>

    </div>


</template>

<style scoped>
.coin-number{
    text-align:left;

}

</style>

<script>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import axios from "axios";
import globalData from "@/global/global"
    export default
    {
        props:["comment_id"],
        data:()=>
        ({
            is_coined: false,
             coin_num: 0,
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
            coinIn()
            {
                  
                if(!globalData.login)
                {
                    ElMessage.error('请先登录再参与讨论。')
                    return;
                }

                this.changeCoin(1);
            },
            changeCoin(op)
            {//op为0，只查询；op为1 要操作
                            
                let user_id=-1;
          
                if(op==1)
                {
                    user_id=globalData.userInfo.user_id
                }
 
                let coinValue=0;//投币数
                let coin_status=true;//如果投币，投币状态成功或失败

                if(op==1)//有操作，则弹出框设置投币数
                {
                    ElMessageBox.prompt('输入杏仁币枚数', '投币', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern:
                    /^[1-9]\d*$/,
                    inputErrorMessage: '投币数为大于0的整数',
                    })
                 .then(({ value }) => {
                    coinValue=value;
                    axios.post("/api/Comment/Coin",
                      reactive({
                        operate:op,
                        user_id:user_id,
                        comment_id:this.comment_id,
                        coin_value:coinValue
                       }))
                       .then((res)=>{
                        this.is_coined=res.data.data.status;
                        this.coin_num=res.data.data.comment_like_num;
                        coin_status=res.data.data.coin_status;//投币是否成功
                      }) 
                      if(op==1){
                    if(coin_status) {
                        ElMessage({
                            message: "投币成功！",
                            type: "success",

                         })
                    }
                    else{
                        ElMessage({
                            message: "币数不足，投币失败！",
                            type: "error",

                         })
                    }
                }  
                   
                 })
                    .catch(() => {
                    ElMessage({
                    type: 'error',
                    message: '取消投币',
                    })
                 })

                 return;
                }

                 

                axios.post("/api/Comment/Coin",
                      reactive({
                        operate:op,
                        user_id:user_id,
                        comment_id:this.comment_id,
                        coin_value:coinValue
                       }))
                       .then((res)=>{
                        this.is_coined=res.data.data.status;
                        this.coin_num=res.data.data.comment_coin_num;
                        coin_status=res.data.data.coin_status;//投币是否成功
                      }) 
                   

            }

               
                
                
         },
        
        created(){
            this.changeCoin(0);
        }
    }
</script>

<template>
    <i v-if="!isCollected" class="fi fi-rr-star" style="color: var(--el-color-primary);" @click="Collect">
            
    </i>
    <i v-if="isCollected" class="fi fi-sr-star" style="color:var(--el-color-primary);" @click="unCollect">
         
    </i>
    
</template>

<script>
import axios from "axios";
import globalData from "@/global/global";
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus'
export default{
    
    props:['collected','medicine_id'],
    emits:['fatherUpdate'],
    watch:
        {
            collected:function(newData)
            {
                this.isCollected=newData;
                console.log(newData)
            }
        },
        data:()=>
        ({
            isCollected:false,
        })
,

    created(){
        console.log(this.medicine_id)
        this.isCollected=this.collected

        console.log(this.isCollected)
    },

    methods:{
        Collect(){
            if(!globalData.login)
            {
                ElMessage.warning('请先登录！')
                return;
            }
            ElMessageBox.prompt('请输入您对药品的收藏备注', '收藏备注', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        
                    })
                    .then(({value})=>{
                    console.log(this.medicine_id)
                        axios.post('/api/Medicine/addCollection',
                        {medicine_id:this.medicine_id,
                         memory:value})
                         .then
                            ((res) => {
                                   
                                   this.isCollected = true;
                                   
                                   ElMessage({
                                       message: "收藏药品成功！",
                                       type: "success",

                                   })
                                   this.$emit('fatherUpdate')                           
                               }).catch(error => {
                                   if(error.network) return false;
                                   switch (error.errorCode){
                                       default:
                                           error.defaultHandler("收藏失败")
                                   }
                           })
                         
                    }

                    )
            
        },
        unCollect(){
            axios.post('/api/Medicine/removeCollection',
                        {medicine_id:this.medicine_id})
                         .then
                            ((res) => {
                                   
                                   this.isCollected = false;
                                   
                                   ElMessage({
                                       message: "取消收藏药品成功！",
                                       type: "success",

                                   })
                                   this.$emit('fatherUpdate')
                               }).catch(error => {
                                   if(error.network) return false;
                                   switch (error.errorCode){
                                       default:
                                           error.defaultHandler("取消收藏失败")
                                   }
                           })
                         

        }

    }

}
</script>


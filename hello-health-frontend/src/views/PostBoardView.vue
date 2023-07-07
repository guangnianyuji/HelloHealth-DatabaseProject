<template>
    <div class="PB_title">
      <div>
        <el-row >
            <el-col span="10">
            <svg t="1688614393322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2387" width="32" height="32">
                <path d="M512 85.333c23.573 0 42.667 20.118 42.667 44.907v763.52c0 24.79-19.094 44.907-42.667 44.907s-42.667-20.118-42.667-44.907V130.24c0-24.79 19.094-44.907 42.667-44.907z"
                      p-id="2388" fill="#6cb16a"></path>
            </svg>
            HH论坛 
            </el-col>

            <el-col span="20" :offset="18">
                <img src="../assets/10.png" style="height: 100px">
            </el-col>
        </el-row>
      </div>
         
      <div class="post_field">
        <el-tabs 
        v-model="type_sort.type"
        class="demo-tabs"
         
        @tab-click="sortSwitcher">
            <el-tab-pane  label="最新论坛" name="Time"> </el-tab-pane>
            <el-tab-pane  label="最热论坛" name="Heat"> </el-tab-pane>
         </el-tabs>

          <el-row>
            <el-col :span="8" v-for="post in post_list" :key="post">
                <post-card :post_info="post" style="margin-left:10% ;margin-right:10% ;margin-bottom: 15%;">
                    
                </post-card>
            </el-col>
          </el-row>
        </div>
 

    </div>
   
</template>

<style scoped>
.post_field {
  margin-bottom: 3%;
  /*border-radius: 28px;*/
}
/*起不了作用，切换栏不能变大小
{
  padding: 32px;
  color: #6b778c;
  font-size: 100px !important;
  font-weight: 600;
}*/
.PB_title {
    font-size: 20px;
    color: #000000;
    margin-left: 8.5%;
    padding-top: 20px;
    margin-right: 8.5%;
}

</style>

<script>
import PostCard from "../components/PostCard.vue"
import axios from "axios";
import {reactive} from 'vue'
export default{
    components:
    {
        PostCard
         
    },

    data:()=>
    ({
        type_sort: reactive({
         type: "Time",   
         }) ,//之前选择的类型
         
        post_list: [],
        
        //云端mock地址，可删
        test_add: "https://mock.apifox.cn/m1/2961538-0-default"
    }),
    methods:
    {
        sortSwitcher ( res) {
            console.log(res.paneName );
            if(res.paneName==this.type_sort.type){
                return;
            }
            this.type_sort.type=res.paneName;
            this.sortBy();
      },
      sortBy(){   
        axios
        .post(this.test_add+"/api/Post/SortBy", this.type_sort)
        .then((res)=> {
            this.post_list=[].concat(res.data.data.post_list);
        })
        .catch((errMsg) => {
          console.log(errMsg);
          this.loading = false;
        });
      },
    },
    created(){
        this.sortBy();
      }
}

</script>

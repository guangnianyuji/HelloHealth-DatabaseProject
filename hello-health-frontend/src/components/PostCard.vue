<template>
   <el-card :body-style="{ padding: '0px'}"
   shadow="never">
    <img  
        :src="post_info.post_pic"
        class="card_image"
         
        />
     <!-- 
    <img v-else
        src="../assets/loading.gif"
        class="image" 
        />
      -->
    <!--显示标签 -->
    <div style="padding: 14px">
        <el-row
          gutter="10"
          justify="left"
        >
          <el-col
            span="1"
            v-for="tag in post_info.post_tag"
            :key="tag"
          >
            <el-tag
              class="ml-2"
              type="success"
              size="small"
            >{{ tag }}</el-tag>
          </el-col>
        </el-row>
    </div>
    <!--显示帖子名称-->
      <div class="card_title  click_title" >
        <span @click="goDetail"  >{{PostTitleSummary(post_info.post_title)}}</span>
      </div>
    <!--显示发帖人-->
      <section class="card_author">
        <el-row
          align="middle"
          style="margin-left:4%;"
        >
        <el-col :span="2">
        <el-avatar :size="25" :src="post_info.author_portrait" ></el-avatar>

        </el-col>

        <el-col :span="8" style="text-align: left"> 
        <span class="card_author">
          {{ post_info.author_name }}
        </span>
        </el-col>
        <el-col :span="6">
            <like-button :comment_id="post_first_comment_id" />
        </el-col>
        <el-col :span="6">
            <coin-button :comment_id="post_first_comment_id" />
        </el-col>
        </el-row>
      </section>
    
  </el-card>
    
</template>

<style>
.card_image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.card_title {
  font-size: x-large;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.click_title:hover{
  text-decoration: underline;
}
.card_author{
    display:inline;
    text-align:center;
    font-size: medium;
}

</style>

<script>
import LikeButton from "./LikeButton.vue";
import CoinButton from "../components/CoinButton.vue";
import { ElMessage } from "element-plus";
    export default
    {
        components: 
        {
            LikeButton,
            CoinButton,
            
            ElMessage,
        },
        props: ["post_info"],
        watch:
        {
            post_info:function(newData)
             {
                this.comment_id=newData.post_first_comment_id;
             }
        },
        data:()=>
        ({
              comment_id:0,//这个帖子的一楼评论，帖子内容本身
        }),
        methods:
        {
             goDetail () {
                this.$router.push({
                path: "/blog_detail",
                query: {
                  post_id: this.post_info.post_id,

                 },
              });
            },
            //防止标题过长
            PostTitleSummary(title){
              if(title.length<10){
                return title;
              }
              else{
                return title.slice(0,12)+"...";
              }
            }
        },
        created(){
            
        }
    }
</script>
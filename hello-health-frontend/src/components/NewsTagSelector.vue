<!--
资讯页面新闻标签选择器
作者：吴可非，张安琦
-->
<template>
  <!--布局容器，上面为Header（图片）,下面为Mainer（文字）-->
  <div class="common-layout">
    <el-container>
      <!--放置图片-->
      <el-header class="header"></el-header>
      <!--放置标签按钮-->
      <el-main class="bottomBox">
        <!--根据后端获取的标签输出标签-->
        <!--<div class="buttonContainer">-->
        <el-row class="buttonContainer" :gutter="10">
          <el-col :span="12" v-for="tag in tagList" :key="tag.tag_id">
            <el-button
                class="buttonStyle"
                :class="['buttonStyle',tag.tag_id === selectedTagId ? 'active' : '']"
                @click="clickTag(tag.tag_id)"
            >
              {{tag.tag_name}}
            </el-button>
            <!--</div>-->
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name : "NewsTagSelector",
  data() {
    return {
      tagList:[],   //从api获取到的tag信息存储在这个数组中
      selectedTagId: 0,     //选中的tag
    }
  },
  methods: {
    clickTag(tagId) {
      this.selectedTagId = tagId;
      this.$emit('tag-selected', tagId); // 自定义事件，将选中的 tagId 传递给父组件
      console.log(`发生了标签点击事件，选中的标签的ID是：`,tagId);
    },
  },
  mounted() { // mounted 时获取全部标签列表
    axios.get('https://mock.apifox.cn/m1/2961538-0-default/api/tagList?tag_id=&tag_name=')
        .then(response => {
          const responseData = response.data.data.tagList;
          this.tagList = responseData.map(tagData => ({
            tag_id: tagData.tag_id,
            tag_name: tagData.tag_name
          }))
        })
        .catch(error => {
          console.error(error)
        });
  }
}
</script>

<style scoped>
/*Header部分容器的图片的样式*/
.header{
  background-image: url("../assets/10.png");
  background-size: contain;
  background-position: left;
  width: 250px;
  height: 150px;
}
/*Mainer部分容器的样式设置*/
.bottomBox{
  border:2px solid #00bfa8;
  border-radius: 10px;
  width:270px;
}
/*设置按钮的样式*/
.buttonStyle{
  margin-bottom: 5px;
  margin-top: 2px;
  background-color:white;
  color:black;
  height:25px;
  width:100px;
  font-size:13px;
  border: 0.1em solid #989ba0;
}
/*设置按钮的选中效果*/
.buttonStyle.active{
  background-color: white;
  color: #00bfa8;
  /*border: 0.1em solid #989ba0 ;*/
}
/*按钮容器，设置按钮的排列样式*/
.buttonContainer{
  display:flex;
  flex-wrap:wrap;
  justify-content: flex-start ;
  align-items: flex-start;
}
</style>


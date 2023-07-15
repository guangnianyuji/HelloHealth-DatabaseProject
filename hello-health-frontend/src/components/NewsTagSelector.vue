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
        <el-row class="buttonContainer" :gutter="10">
          <!-- 第一层循环，遍历所有的 group -->
          <div v-for="group in tagList" :key="group.group_id">
            <h1 class="parent-tag">
              {{ group.group_name }}:</h1> <!-- 显示 group 的名字 -->
            <!-- 第二层循环，遍历当前 group 下的所有 tag -->
            <el-row :gutter="5">
              <el-col :span="12" v-for="tag in group.tags" :key="tag.tag_id">
                <button
                    class="buttonStyle"
                    :class="['buttonStyle',tag.tag_id === selectedTagId ? 'active' : '']"
                    @click="clickTag(tag.tag_id)"
                >
                  {{tag.tag_name}}
                </button>
              </el-col>
            </el-row>
          </div>
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
    axios.get("https://mock.apifox.cn/m1/2961538-0-default/api/tagList?tag_id=&tag_name=")
        .then(response => {
          this.tagList = response.data.data.tagList;
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
  background-color: white;
  border:2px solid #00bfa8;
  border-radius: 10px;
  width: 270px;
}
/*设置按钮的样式*/
.buttonStyle{
  margin-bottom: 10px;
  margin-top: 2px;
  background-color:white;
  color:black;
  height:20px;
  width:100px;
  font-size:13px;
  margin-right:25px;
  border-color: white;
  text-align: start;
}
/*设置按钮的选中效果*/
.buttonStyle.active{
  background-color: white;
  color: #00bfa8;
}
/*按钮容器，设置按钮的排列样式*/
.buttonContainer{
  display:flex;
  flex-wrap:wrap;
  padding-left: 10px;
}
.parent-tag{
  font-weight: bold;
  padding-bottom: 8px;
}
</style>


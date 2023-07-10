<!--
健康资讯页面
作者：吴可非、张安琦、蔡名雅
-->
<template>
  <div class="HF_body">
        <el-row class="FM_title">
        <svg t="1688614393322" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="2387" width="32" height="32" color="green">
        <path d="M512 85.333c23.573 0 42.667 20.118 42.667 44.907v763.52c0 24.79-19.094 44.907-42.667 44.907s-42.667-20.118-42.667-44.907V130.24c0-24.79 19.094-44.907 42.667-44.907z"
              p-id="2388" fill="#6cb16a"></path>
      </svg>
          <div style="padding-top: 3px">个人中心</div>
        </el-row>      
      <el-row class="FM_title">
            <svg t="1688614393322" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
                      p-id="2387" width="32" height="32">
                  <path d="M512 85.333c23.573 0 42.667 20.118 42.667 44.907v763.52c0 24.79-19.094 44.907-42.667 44.907s-42.667-20.118-42.667-44.907V130.24c0-24.79 19.094-44.907 42.667-44.907z"
                      p-id="2388" fill="#6cb16a"></path>
                  </svg>
                    <div style="padding-top: 3px">健康资讯</div>
      </el-row>
        
        <el-container>
          <el-main>
            <el-container>
              <el-aside class="news_content">
                <el-container class="news_content">
                  <el-aside class="left">
                    <HotNewsLeft/>
                    <!-- 热点新闻 -->
                  </el-aside>
              <el-main class="middle">
                    <!-- 资讯页面中间大块的新闻预览 -->
                    <NewsBlockList :selected-tag-id="selectedTagId" />
                    <!-- :selected-tag-id对应NewsBlockList的props中的selectedTagId -->
                  </el-main>
                </el-container>
              </el-aside>
              <el-main class="right">
                <!-- 标签选择器 -->
              <NewsTagSelector @tag-selected="handleTagSelected" />
            <!-- @tag-selected是从NewsTagSelector中emit出来的 -->
              </el-main>
            </el-container>
           
          </el-main>
            </el-container>




  </div>
</template>

<script>
import NewsBlockList from "../components/NewsBlockList.vue";
import NewsTagSelector from "../components/NewsTagSelector.vue";
import HotNewsLeft from "../components/HotNewsLeft.vue";
export default {
  name: "HealthFlashView",
  components: {NewsTagSelector, NewsBlockList,HotNewsLeft},
  methods: {
    handleTagSelected(tagId) {
      this.selectedTagId = tagId; /* 将选中的 tagId 传递给 NewsBlockList 组件作为 prop */
    },
  },
  data() {
    return {
      selectedTagId: null,
    };
  },
};
</script>

<style>
.HF_body {
  height: 100vh;
  width: 90vw;
  padding: 0%;
}

.FM_title {
  font-size: 15px;
  color: #000000;
  margin-left: 0%;
  padding: 0%;
  padding-top: 20px;
}

.news_content{
  width:950px;
  padding: 0%;
  margin-top: 0px;
  margin-left: 0px;
  background-color: white;
  height:auto;
}

.left{
  width:250px;
  padding-left: 10px;
  padding-top: 10px;
  margin: 0%;
  padding-right: 0%;
}
.middle{
  width:720px;
  padding-left: 0px;
  padding-top: 0px;
  padding-right: 0%;
  margin: 0%;

}
.right{
  width:280px;
  padding: 0%;
  margin: 0%;
  margin-left: 20px;
}

</style>
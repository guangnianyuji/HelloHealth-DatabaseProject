<!--
健康资讯页面
作者：吴可非，张安琦，蔡名雅
-->
<template>
  <div class="HF_body">
    <!-- 新闻轮播器 -->
    <NewsCarousel/>
    <el-row class="HF_title">
      <svg t="1688614393322" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="2387" width="32" height="32">
        <path d="M512 85.333c23.573 0 42.667 20.118 42.667 44.907v763.52c0 24.79-19.094 44.907-42.667 44.907s-42.667-20.118-42.667-44.907V130.24c0-24.79 19.094-44.907 42.667-44.907z"
              p-id="2388" fill="#6cb16a"></path>
      </svg>
      <div style="padding-top: 3px">健康资讯</div>
    </el-row>
    <el-container>
      <el-container class="news_content">
        <el-aside class="left" style="margin-top: 2%">
          <!-- 标签选择器 -->
          <NewsTagSelector @tag-selected="handleTagSelected" />
        </el-aside>
        <el-main class="middle">
          <!-- 资讯页面中间大块的新闻预览 -->
          <NewsBlockList :selected-tag-id="selectedTagId" />
          <!-- :selected-tag-id对应NewsBlockList的props中的selectedTagId -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NewsCarousel from "../components/NewsCarousel.vue";
import NewsBlockList from "../components/NewsBlockList.vue";
import NewsTagSelector from "../components/NewsTagSelector.vue";
import {Search} from "@element-plus/icons-vue";

export default {
  name: "HealthFlashView",
  components: {NewsCarousel,NewsTagSelector, NewsBlockList},
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
    margin: 30px auto 0 auto;
    width: 85%;
}

.HF_title {
  font-size: 20px;
  color: #000000;
  margin-left: 2%;
  padding-top: 0px;
}

.news_content{
  width:auto;
  height:auto;
}

.left{
  width:auto;
  padding-left: 50px;
  padding-top: 20px;
}
.middle{
  width: auto;
}
</style>
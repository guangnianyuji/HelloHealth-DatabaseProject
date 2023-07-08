<!--
健康资讯页面
作者：吴可非、张安琦、蔡名雅
-->
<template>
  <div class="HF_body">

    <el-row class="FM_title">
      <svg t="1688614393322" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="2387" width="32" height="32">
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

    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          热点新闻放在这
          <!-- 名雅在这里放热点新闻，格式可能要调调，可以让我和安琦改组件大小 -->
        </el-aside>
        <el-main>
          <!-- 资讯页面中间大块的新闻预览 -->
          <NewsBlockList :selected-tag-id="selectedTagId" />
          <!-- :selected-tag-id对应NewsBlockList的props中的selectedTagId -->
        </el-main>
        <el-aside width="300px">
          <!-- 标签选择器 -->
          <NewsTagSelector @tag-selected="handleTagSelected" />
          <!-- @tag-selected是从NewsTagSelector中emit出来的 -->
        </el-aside>
      </el-container>
    </div>


  </div>
</template>

<script>
import NewsBlockList from "../components/NewsBlockList.vue";
import NewsTagSelector from "../components/NewsTagSelector.vue";
export default {
  name: "HealthFlashView",
  components: {NewsTagSelector, NewsBlockList},
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
  background-color: RGB(232, 246, 246);
}

.FM_title {
  font-size: 20px;
  color: #000000;
  margin-left: 8.5%;
  padding-top: 20px;
}

</style>
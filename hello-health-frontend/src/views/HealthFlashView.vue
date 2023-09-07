<!--
健康资讯页面
作者：吴可非，张安琦，蔡名雅
-->
<template>
  <div class="HF_body">
    <!-- 新闻轮播器 -->
    <NewsCarousel />
    <el-row class="HF_title">
      <div class="viewTitle tracking-in-expand" style="padding-top: 3px">健康资讯</div>
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
import { Search } from "@element-plus/icons-vue";

export default {
  name: "HealthFlashView",
  components: { NewsCarousel, NewsTagSelector, NewsBlockList },
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

.news_content {
  width: auto;
  height: auto;
}

.left {
  width: auto;
  padding-left: 50px;
  padding-top: 20px;
}

.middle {
  width: auto;
}

.viewTitle {
  padding-left: 40px;
  background-image: linear-gradient(96.14deg,
      rgba(0, 191, 168, 1) 0%,
      #0093bf 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-align: left;
  font: 600 32px "Poppins", sans-serif;
}

.tracking-in-expand {
  -webkit-animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
  animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}
@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }

  40% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }

  40% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}
</style>
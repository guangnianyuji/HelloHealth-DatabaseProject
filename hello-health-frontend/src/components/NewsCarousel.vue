<!--
资讯页面上方的走马灯
作者：蔡名雅
-->
<template>
    <el-carousel :interval="4000" type="card" height="200px" indicator-position="outside" arrow="never">
    <el-carousel-item v-for="news in newsList" :key="news.newsId">
        <el-image
          :src="news.newsImage"
          fit="cover" style="width: 100%; height: 100%"
        />
    </el-carousel-item>
  </el-carousel>
</template>
  
<script>
  import axios from "axios";
  export default {
    name: "NewsCarousel",
    data() {
      return {
        newsList: [],  // 全部新闻列表
        newsNum: 3,   // 新闻数
      }
    },
    methods: {
      getNewsList() {
        const apiUrl = "/api/Flash/hotnews";
        axios.get(apiUrl)
            .then(res => {
              this.newsList = res.data.data.newsList;    // 获取全部新闻列表
              this.newsNum = this.newsList.length;         // 总新闻数
            })
      },
    },
    created() {  // created 时获取全部新闻列表
      this.getNewsList()
    },
  }
</script>
  
<style scoped>
    .el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
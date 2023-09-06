<template>
  <el-carousel :interval="4000" type="card" height="300px" indicator-position="outside" arrow="never">
    <el-carousel-item v-for="news in newsList" :key="news.newsId" @click="goFullContent(news.newsId)">
      <el-image class="car-image"
          :src="news.newsImage"
          style="width: 100%; height: 100%"
      />
      <div class="title" v-text="news.newsTitle"></div>
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
    goFullContent(flash_id) {
      this.$router.push("/news/"+flash_id);
    }
  },
  created() {  // created 时获取全部新闻列表
    this.getNewsList()
  },
}
</script>

<style scoped>
.car-image {
  object-fit: fill;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

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

.title {
  position: absolute;
  left: 0;
  bottom: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  width: 100%;
}
</style>
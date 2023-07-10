<template>
  <div class="common-layout">
    <el-container class="left_board">
      <el-header class="top">
        <el-text class="title">热门资讯</el-text>
      </el-header>
      <el-main class="content">
          <el-carousel trigger="click" class="carousel">
            <el-carousel-item v-for="news in this.news_list1" :key="news">
              <news-tiny-card
                  :news_flash_title="news.newsTitle"
                  :news_flash_date="news.newsDate"
                  :news_flash_id="news.newsId"
                  :news_flash_image="news.newsImage"
                  style="margin-bottom: 5px">
              </news-tiny-card>
            </el-carousel-item>

          </el-carousel>
      </el-main>
      <el-footer class="down">
        <el-scrollbar class="scroll">
          <div v-for="news in this.news_list2" :key="news" class="scroller_item">
            <news-tiny-entry
                :news_flash_title="news.newsTitle"
                :news_flash_date="news.newsDate"
                :news_flash_tag="news.NewsTag"
                :news_flash_summary="news.newsSummary"
                :news_flash_id="news.newsId"
                :news_flash_image="news.newsImage"
            ></news-tiny-entry>
          </div>
        </el-scrollbar>

      </el-footer>
    </el-container>
  </div>

</template>

<script>


import NewsTinyEntry from "./NewsTinyEntry.vue"
import NewsTinyCard from "./NewsTinyCard.vue"
import axios from "axios";

export default {
  name: "HotNewsLeft",
  components: {
    NewsTinyEntry,
    NewsTinyCard,
  },
  data() {
    return {
      news_list1: [],
      news_num_total1: 0,
      news_list2: [],
      news_num_total2: 0,
      isLoading: true,
    };
  },
  methods: {

  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    let get_news_list = axios
        .get("http://127.0.0.1:4523/m1/2961538-0-default/api/news")
        .then((res) => {
          this.news_list1 = [].concat(res.data.data);
          this.news_list2 = [].concat(res.data.data);
          this.news_num_total1=res.data.newsNum;
          this.news_num_total2=res.data.newsNum;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
  },
};
</script>

<style scoped>
.left_board{
  width:220px;
}

.top {
  margin-top: 2px;
  padding: 1% 1%;
  background-color:#F5F7FA;
  height:30px;
}
.title{
  font-size: 16px;
  color:black;
}

.content {
  margin-left: 0%;
  margin-top: 10px;
  height: 200px;
  width:220px;
  border-radius: 3px;
  background-color:#F5F7FA;
  padding: 0% 0%;
}

.carousel{
  width:220px;
  height:200px;
  padding: 0%;
  margin-left: 0%;
  margin-top: 0%;
  /deep/ .el-carousel__container{
    height: 200px;
  }
}

.down{
  height:auto;
  padding: 0% 0%;
  margin-top: 10px;
  margin-left: 0%;
}

.scroll{
  height: 240px;
  width:220px;
}

.scroller_item{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0%;
}

</style>
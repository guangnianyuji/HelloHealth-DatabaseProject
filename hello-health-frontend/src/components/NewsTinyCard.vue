<template>
  <el-card class="card" @click="goDetail()">
    <img
        class="news_image"
        :src="this.news_flash_image"
        v-if="this.news_flash_image != null"
    />
    <img v-else class="news_image" src="../../assets/logo.png" />
    <div style="padding: 2px">
      <el-text class="title">
          {{ this.news_flash_title.length>18?this.news_flash_title.slice(0,18)+'...': this.news_flash_title}}
      </el-text>
      <div class="bottom">
        <el-text class="date">
          时间：{{this.news_flash_date}}
        </el-text>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "NewsTinyCard",
  props: {
    news_flash_title: {
      type: String,
      default: "",
    },
    news_flash_date: {
      type: String,
      default: "",
    },
    news_flash_id: {
      type: Number,
      default: -1,
    },
    news_flash_image: {
      type: String,
      default: "../../assets/logo.png",
    },
  },
  data() {
    return {
      news_flash_tagAry: "",
      logo_path: "../../assets/logo.png",
    };
  },
  methods: {
    goDetail() {
      this.$router.push({
        path: "/news",
        query: {news_id: this.news_flash_id },
      });
    },
  },
};
</script>

<style scoped>
.news_image {
  object-fit: fill;
  height: 100px;
  width: 180px;
  margin-top: 0px;
  border-radius: 0.4rem;
}
.card {
  padding: 0%;
  margin-top: 0%;
  margin-left: 0%;
  height: 200px;
  width: 220px;
  background-color: transparent;
  border: transparent;
  align-items: center;
}

.date {
  text-align: left;
  font-size: x-small;
  padding-top:2px;
  color:grey;
}

.title{
  font-size:16px;
  color:black;
  text-align:left;
  padding-left:0px;
  padding-top:0px;
  margin-bottom: 5px;
}
</style>
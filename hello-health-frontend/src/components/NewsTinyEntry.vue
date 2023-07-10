<template>
    <el-container class="card" @click="goDetail()">
      <el-aside class="left">
        <img
            class="news_image"
            :src="this.news_flash_image"
            v-if="this.news_flash_image != null"
        />
        <img v-else class="news_image" src="../../assets/logo.png" />
      </el-aside>

      <el-main class="right">
        <el-text class="title">
          {{ this.news_flash_title }}
        </el-text>
        <p>
          <el-text class="date">
            {{this.news_flash_date}}
          </el-text>
        </p>

      </el-main>
    </el-container>
</template>

<script>
export default {
  name: "NewsTinyEntry",
  props: {
    news_flash_title: {
      type: String,
      default: "",
    },
    news_flash_date: {
      type: String,
      default: "",
    },
    news_flash_tag: {
      type: String,
      default: "",
    },
    news_flash_summary: {
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
      logo_path: "../assets/logo.png",
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
  height: 50px;
  width: 60px;
  margin-left: 0px;
  margin-top: 0px;
  border-radius: 0px;
}
.card {
  height: 70px;
  width:220px;
  background: rgb(255, 255, 255);
  border-radius: 1em;
  transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: rgb(250, 250, 250) 0.2em solid;
}
.left{
  width:80px;
  padding:0% 0%;
  margin: 0%;
}
.right{
  width:140px;
  padding:0% 0%;
  margin: 0%;
}

.date {
  color: grey;
  font-size: 4px;
  margin-top: 2px;
}
.title{
  color:black;
  font-size: 8px;
}

</style>
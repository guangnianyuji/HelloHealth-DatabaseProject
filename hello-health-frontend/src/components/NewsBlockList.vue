<!--
资讯页面中间大块的新闻预览
作者：吴可非
-->
<template>
  <el-container class="news-container">
      <el-main>
        <el-row class="result_title">
          <el-col >
            <el-input
                v-model="input"
                class="search-box"
                placeholder="根据关键词查找新闻"
                :suffix-icon="Search"
            />


          </el-col>
        </el-row>
        <!-- 三个 NewsBlock 组件 -->
        <NewsBlock
            class="flash tilt-in-left-1"
            v-for="flash in currentNewsList"  :key="flash.id"
            :flash_title="flash.title"
            :flash_date="flash.time"
            :flash_preview="flash.preview"
            :flash_image="flash.image"
            :flash_tags_list="flash.tags"
            :flash_id="flash.id"
        />
      </el-main>
      <el-footer>
        <!-- 分页组件 -->
        <el-pagination
                class="footer"
            background
            v-model:page="page"
            :page-size="pageSize"
            :total="+filteredNewsListTotal"
            layout="prev, pager, next"
            @current-change="handlePageChange"
        />
      </el-footer>
    </el-container>
</template>

<script>
import NewsBlock from './NewsBlock.vue'
import axios from "axios";
import {Search} from "@element-plus/icons-vue";
export default {
  name: "NewsBlockList",
  components: { NewsBlock },
  props: {
    selectedTagId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      newsList: [],  // 全部新闻列表
      page: 1,       // 当前页码
      pageSize: 4,   // 每页新闻数
      input: ""
    }
  },
  computed: {
    Search() {
      return Search
    },
    currentNewsList() {
      if (this.filteredNewsList && this.filteredNewsListTotal > 0) {
        let start = (this.page - 1) * this.pageSize;
        let end = start + this.pageSize;
        return this.filteredNewsList.slice(start, end);
      } else {
        return [];
      }
    },
    filteredNewsList() {
      if (!this.input) {
        return this.newsList;
      }
      const keyword = this.input.toLowerCase();
      return this.newsList.filter(news => news.title.toLowerCase().includes(keyword));
    },
    filteredNewsListTotal() {
      return this.filteredNewsList.length;
    },
  },
  methods: {
    handlePageChange(newPage) {
      this.page = newPage;
      console.log(`page changed`);
    },
    getNewsList() {
      const apiUrl = this.selectedTagId
          ? `/api/Flash/newsByTag/${this.selectedTagId}`
          : "/api/Flash/newsByTag/-1";//如果没有选择标签，就传给后端-1，后端返回全部资讯
      axios.get(apiUrl)
          .then(res => {
            this.newsList = res.data.data.newsList;    // 获取全部新闻列表
            this.newsList.forEach(item => {
              item.preview = this.getContentText(item.content)
            })
          })
    },
    getContentText(contentJson) {
      contentJson = JSON.parse(contentJson);
      let paragraphs = [];
      if (contentJson && Array.isArray(contentJson.content)) {
        for (const block of contentJson.content) {
          if (block.type === 'paragraph' && Array.isArray(block.content)) {
            let paragraph = block.content.map(node => node.text).join(' ');
            paragraphs.push(paragraph);
          }
        }
      }
      return paragraphs.join(' ');
    },
  },
  mounted() {  // mounted 时获取全部新闻列表
    this.getNewsList()
  },
  watch: {
    selectedTagId() {
      this.page = 1; // 重置页码
      this.getNewsList();
    },
  },
}
</script>

<style scoped>
.news-container {
  width: auto;
  display: flex;
  align-items: center;
}
.search-box {
    padding-bottom: 1%;
}
.footer{
    margin-top: 10%;
    margin-bottom: 2%;
}

.tilt-in-left-1 {
	animation: tilt-in-left-1 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes tilt-in-left-1 {
  0% {
    transform: rotateX(-30deg) translateX(-300px) skewX(-30deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg) translateX(0) skewX(0deg);
    opacity: 1;
  }
}

</style>
<!--
资讯页面中间大块的新闻预览中的一个小新闻块
作者：吴可非
-->
<template>
  <el-card shadow="hover" class="news-block-card">
    <el-container class="news-block">
      <el-aside width="120px">
        <!-- 新闻图片 -->
        <img
            class="flash-image"
            :src="flash_image"
        />
      </el-aside>
      <el-container>
        <el-header class="flash-header">
          <!-- 新闻标题 -->
          <h1 @click="goFullContent"
              class="flash-title clickable"
              style="font-weight: bold;">{{ truncatedTitle }}</h1>
          <span class="flash-date">{{ flash_date }}</span>
        </el-header>
        <el-main class="flash-preview">
          <!-- 新闻预览内容 -->
          <p>{{ truncatedContent }}</p>
        </el-main>
        <el-footer class="flash-tags">
          <!-- 新闻标签 -->
          <el-tag size="small"
                  v-for="tag in flash_tags_list"
                  :key="tag">{{ tag }}</el-tag>
        </el-footer>
      </el-container>
    </el-container>
  </el-card>
</template>

<script>
export default {
  name: "NewsBlock",
  props: {
    flash_id: {
      type: Number
    },
    flash_title: {
      type: String
    },
    flash_date: {
      type: String
    },
    flash_content: {
      type: String
    },
    flash_preview: {
      type: String
    },
    flash_image: {
      type: String
    },
    flash_tags_list: {
      type: Array
    }
  },
  computed: {
    truncatedTitle: function() {
      const limit = 15; /* title最大字符数 */
      if (this.flash_title.length > limit) {
        return this.flash_title.substring(0, limit) + '...';
      } else {
        return this.flash_title;
      }
    },
    truncatedContent: function() {
      const limit = 50; /* preview最大字符数 */
      if (this.flash_preview.length > limit) {
        return this.flash_preview.substring(0, limit) + '...';
      } else {
        return this.flash_preview;
      }
    }
  },
  methods: {
    goFullContent() {
      this.$router.push("/news/"+this.$props.flash_id);
    },
  }
}
</script>

<style scoped>
.news-block-card {
  flex-wrap: wrap;
  margin-bottom: 3px;
}
.news-block {
  height: 120px;
  width: 600px;
}
.flash-image {
  object-fit: fill;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flash-header {
  display: flex;
  justify-content: space-between;   /* 包含了title和date */
  height: 10px;
}
.flash-title {
  font-size: 15px;
  position: relative;
  text-decoration: none;            /* 移除默认的下划线 */
}
.flash-title::after {
  content: "";
  position: absolute;
  left: 0;
  top: 1.2em;                    /* 调整下划线与文字的距离 */
  width: 100%;
  height: 1px;                      /* 设置默认粗细 */
  background-color: #333;
}
.flash-title:hover::after {
  height: 2px;                      /* 鼠标悬停时改变粗细 */
}
.clickable {
  cursor: pointer;                  /* 设置鼠标样式为手型 */
}
.flash-date {
  width: 40%;          /* 日期宽度为 40% */
  text-align: right;   /* 日期右对齐 */
}
.flash-preview {
  height: auto;
}
.flash-tags {
  height: auto;
}
.el-tag {
  margin-right: 5px;  /* 设置标签之间的左间距 */
}
</style>
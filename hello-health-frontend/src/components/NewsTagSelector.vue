<!--
资讯页面新闻标签选择器
作者：吴可非，张安琦
-->
<template>
  <!--布局容器，上面为Header（图片）,下面为Mainer（文字）-->
  <div class="common-layout">
    <el-container>

      <!--放置标签按钮-->
      <el-main class="bottomBox">
        <!--放置图片-->
        <el-header class="header fade-in-fwd"></el-header>
        <!--根据后端获取的标签输出标签-->
        <el-row class="buttonContainer" :gutter="10">
          <!-- 第一层循环，遍历所有的 group -->
          <div v-for="group in tagList" :key="group.group_id">
            <span class="parent-tag text-shadow-drop-left">
              · {{ group.group_name }}</span> <!-- 显示 group 的名字 -->
            <!-- 第二层循环，遍历当前 group 下的所有 tag -->
            <el-row :gutter="5">
              <el-col :span="12" v-for="tag in group.tags" :key="tag.tag_id">
                <button class="buttonStyle tracking-in-expand" :class="['buttonStyle', tag.tag_id === selectedTagId ? 'active' : '']"
                  @click="clickTag(tag.tag_id)">
                  {{ tag.tag_name }}
                </button>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "NewsTagSelector",
  data() {
    return {
      tagList: [],   //从api获取到的tag信息存储在这个数组中
      selectedTagId: 0,     //选中的tag
    }
  },
  methods: {
    clickTag(tagId) {
      // 检查 selectedTagId 是否已经等于点击的 tagId
      if (this.selectedTagId === tagId) {
        this.selectedTagId = null;
      } else {
        this.selectedTagId = tagId;
      }
      this.$emit('tag-selected', this.selectedTagId);
      console.log(`发生了标签点击事件，选中的标签的ID是：`, this.selectedTagId);
    },
  },
  mounted() { // mounted 时获取全部标签列表

    axios.get("/api/Flash/tagList")
      .then(response => {
        this.tagList = response.data.data.tagList;
      })
      .catch(error => {
        console.error(error)
      });
  }
}
</script>

<style scoped>
/*Header部分容器的图片的样式*/
.header {
  background-image: url("/static/10.png");
  background-size: contain;
  background-position: left;
  //width: 250px;
  height: 150px;
}

/*Mainer部分容器的样式设置*/
.bottomBox {
  background-color: white;
  border: 2px solid #00bfa8;
  border-radius: 10px;
  width: 270px;
}

/*设置按钮的样式*/
.buttonStyle {
  margin-left: 10px;
  margin-bottom: 6px;
  margin-top: 2px;
  background-color: white;
  color: black;
  height: 20px;
  width: 100px;
  font-size: 13px;
  margin-right: 14px;
  border-color: white;
  text-align: start;
}

/*设置按钮的选中效果*/
.buttonStyle.active {
  background-color: white;
  color: #00bfa8;
}

/*按钮容器，设置按钮的排列样式*/
.buttonContainer {
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
}

.parent-tag {
  font-weight: bold;
  padding-bottom: 8px;
  
  background-image: linear-gradient(96.14deg,
      rgba(0, 191, 168, 1) 0%,
      #0093bf 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  font: 600 16px "Poppins", sans-serif;
}

.fade-in-fwd {
	animation: fade-in-fwd 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
@keyframes fade-in-fwd {
  0% {
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}

.text-shadow-drop-left {
	animation: text-shadow-drop-left 1s both;
}
@keyframes text-shadow-drop-left {
  0% {
    text-shadow: 0 0 0 rgba(0, 255, 187, 0);
  }
  100% {
    text-shadow: -1px 0 2px rgba(0, 255, 187, 0.35);
  }
}

.tracking-in-expand {
  -webkit-animation: tracking-in-expand 1.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
  animation: tracking-in-expand 1.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
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


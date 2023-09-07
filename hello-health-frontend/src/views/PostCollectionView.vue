<template>
  <div class="postCollection">
    <div class="body">

      <el-row class="title">
        <div class="viewTitle tracking-in-expand" style="padding-top: 3px">帖子收藏</div>
      </el-row>

      <el-col class="result_title" style="padding-top: 5px">
        <div class="tips" v-if="list.length === 0">
          <img class="sadImg jello-horizontal" style="height: 256px;" alt="" src="/static/thinking.png" />
          <div class="sadTip jello-horizontal">暂时还没有收藏的帖子哦~快去浏览吧！</div>
        </div>
      </el-col>

      <div class="postList">
        <el-row :gutter="20">
          <el-col :span="12" v-for="item in list" :key="item.id" style="margin-bottom: 20px;">
            <el-card class="card" shadow="never" :body-style="{ padding: '0px' }">
              <div style="display: flex; flex-direction: row">
                <div>
                  <a :href="'/forum/' + item.id">
                    <img :src="item.imgUrl" class="image" title="" alt="" />
                  </a>
                </div>
                <div style="flex-grow: 1;">
                  <div style="display: flex; flex-direction: column">
                    <div style="display: inline-block">
                      <a class="postTitle" :href="'/forum/' + item.id">
                        {{ item.title }}
                      </a>
                    </div>
                    <div style="display: flex; flex-direction: row;">
                      <div>
                        <div class="postAuthor">{{ item.author }}</div>
                      </div>
                      <div>
                        <div class="postUpdateTime">{{ item.updateTime }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <el-icon class="cancelButton" @click="changeStar(item.id)" v-if="cancelled[item.id]">
                    <svg t="1690052159982" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="14050" width="200" height="200">
                      <path
                        d="M512 768l-249.941333 131.413333a28.444444 28.444444 0 0 1-41.244445-30.008889l47.701334-278.300444-202.183112-197.091556a28.444444 28.444444 0 0 1 15.758223-48.526222l279.438222-40.590222 124.956444-253.212444a28.444444 28.444444 0 0 1 51.029334 0l124.956444 253.212444 279.438222 40.590222a28.444444 28.444444 0 0 1 15.758223 48.526222l-202.183112 197.12 47.729778 278.272a28.444444 28.444444 0 0 1-41.272889 29.980445L512 768z"
                        fill="#A0A0A0" p-id="14051"></path>
                      <path
                        d="M512 768l-249.941333 131.413333a28.444444 28.444444 0 0 1-41.244445-30.008889l47.701334-278.300444c36.124444-190.805333 67.128889-286.208 93.013333-286.208 38.826667 0 393.955556 261.774222 393.955555 286.208 0 16.298667-81.180444 75.264-243.484444 176.896z"
                        fill="#A0A0A0" p-id="14052"></path>
                    </svg>
                  </el-icon>
                  <el-icon class="cancelButton" @click="changeStar(item.id)" v-else>
                    <svg t="1690052159982" class="icon" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg" p-id="14050" width="200" height="200">
                      <path
                        d="M512 768l-249.941333 131.413333a28.444444 28.444444 0 0 1-41.244445-30.008889l47.701334-278.300444-202.183112-197.091556a28.444444 28.444444 0 0 1 15.758223-48.526222l279.438222-40.590222 124.956444-253.212444a28.444444 28.444444 0 0 1 51.029334 0l124.956444 253.212444 279.438222 40.590222a28.444444 28.444444 0 0 1 15.758223 48.526222l-202.183112 197.12 47.729778 278.272a28.444444 28.444444 0 0 1-41.272889 29.980445L512 768z"
                        fill="#FFC500" p-id="14051"></path>
                      <path
                        d="M512 768l-249.941333 131.413333a28.444444 28.444444 0 0 1-41.244445-30.008889l47.701334-278.300444c36.124444-190.805333 67.128889-286.208 93.013333-286.208 38.826667 0 393.955556 261.774222 393.955555 286.208 0 16.298667-81.180444 75.264-243.484444 176.896z"
                        fill="#FED902" p-id="14052"></path>
                    </svg>
                  </el-icon>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <div class="pagination">
          <el-config-provider :locale="locale">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size="pageSize" :total="total"
              layout="total, sizes, prev, pager, next, jumper"></el-pagination>
          </el-config-provider>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import axios from "axios";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import globalData from "@/global/global";
import router from "@/router";
const locale = zhCn;

const list = ref([]);

const cancelled = ref([]);

let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);

const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
  updatePostCollectionList();
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  updatePostCollectionList();
};

function updatePostCollectionList() {
  const requestPostCollection = {
    currentPage: currentPage.value,
    pageSize: pageSize.value
  };
  axios.post('/api/Forum/PostCollection', requestPostCollection).then(res => {
    list.value = res.json.list;
    total.value = parseInt(res.json.total);
    cancelled.value = [];
    for (let i = 0; i < list.value.length; i++) {
      cancelled.value[list.value[i].id] = false;
    }
  }).catch(error => {
    if (error.network) return;
    error.defaultHandler('加载收藏帖失败')
  })
}

function changeStar(id) {
  cancelled.value[id] = !cancelled.value[id];
  const requestCancelPostStar = {
    operate: 1,
    post_id: id
  }
  axios.post('/api/Forum/Star', requestCancelPostStar).then(res => {
    if (cancelled.value[id]) {
      ElMessage({
        showClose: true,
        message: '取消收藏成功！',
        type: 'success',
      })
    }
    else {
      ElMessage({
        showClose: true,
        message: '收藏成功！',
        type: 'success',
      })
    }
  }).catch(error => {
    if (error.network) return;
    error.defaultHandler(cancelled.value[id] ? '取消收藏失败' : '收藏失败')
  })
}

onMounted(() => {
  if (!globalData.login) {
    ElMessage.error('请先登录!')
    router.push("/login")
    return;
  }
  updatePostCollectionList();
});
</script>

<style scoped>
.postCollection {
  position: relative;
}

.body {
  padding-top: 10px;
}

.title {
  font-size: 24px;
  color: #000000;
  padding-left: 4%;
  padding-top: 20px;
  font-weight: 450
}

.viewTitle {
  margin-left: 1%;
  background-image: linear-gradient(96.14deg,
      rgba(0, 191, 168, 1) 0%,
      #0093bf 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-align: left;
  font: 600 32px "Poppins", sans-serif;
}

.postList {
  margin-top: 15px;
  margin-left: 5%;
  width: 90%;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
}

.cancelButton {
  height: 30px;
  width: 30px;
  cursor: pointer;
}

.cancelButton:hover {
  filter: brightness(90%);
}

.cancelButtonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card {
  border-radius: 10px;
  height: 150px;
  position: relative;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 0px 15px rgba(0, 0, 0, 0.3);
}

.image {
  border-radius: 5px;
  margin-right: 10px;
  height: 150px;
}

.postTitle {
  margin-top: 7px;
  font-size: 22px;
  font-weight: 500;
}

.postAuthor {
  position: absolute;
  top: 120px;
  /* font-size: 22px;
    font-weight: 500; */
  color: gray;
}

.postUpdateTime {
  position: absolute;
  top: 120px;
  right: 3%;
  /* font-size: 22px;
    font-weight: 500; */
  color: gray;
}

a {
  color: black;
  text-decoration: none;
  pointer-events: auto;
  display: inline-block;
}

a:visited {
  color: black;
}

.icon {
  transform: scale(1.4);
}

.tips {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 在主轴上居中对齐 */
  text-align: center;
  /* 也可以在文本上进行居中对齐 */
  margin-top: 10px;
}

.sadTip {
  background-image: linear-gradient(96.14deg,
      #8DBEF8 0%,
      #377EB6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-align: left;
  font: 600 18px "Poppins", sans-serif;

  margin-top: 5px;
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

.jello-horizontal {
  animation: jello-horizontal 0.9s both;
}

@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
}</style>

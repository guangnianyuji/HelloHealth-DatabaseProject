<template>
  <div class="postCollection">
    <div class="body">
      
      <el-row class="title">
        <svg t="1688614393322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2387" width="32" height="32">
            <path d="M512 85.333c23.573 0 42.667 20.118 42.667 44.907v763.52c0 24.79-19.094 44.907-42.667 44.907s-42.667-20.118-42.667-44.907V130.24c0-24.79 19.094-44.907 42.667-44.907z" p-id="2388" fill="#6cb16a"></path>
        </svg>
        <div style="padding-top: 3px">帖子收藏</div>
      </el-row>

      <div class="postList">
        <el-row :gutter="20">
          <el-col :span="12" v-for="item in list" :key="item.id" style="margin-bottom: 20px;">
            <el-card class="card" shadow="never" :body-style="{ padding: '0px' }">
              <div style="display: flex; flex-direction: row">
                <div>
                  <a :href="'/forum/' + item.id">
                    <img
                      :src="item.imgUrl"
                      class="image"
                      title=""
                      alt=""
                    />
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
                    <svg t="1690052159982" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14050" width="200" height="200"><path d="M512 768l-249.941333 131.413333a28.444444 28.444444 0 0 1-41.244445-30.008889l47.701334-278.300444-202.183112-197.091556a28.444444 28.444444 0 0 1 15.758223-48.526222l279.438222-40.590222 124.956444-253.212444a28.444444 28.444444 0 0 1 51.029334 0l124.956444 253.212444 279.438222 40.590222a28.444444 28.444444 0 0 1 15.758223 48.526222l-202.183112 197.12 47.729778 278.272a28.444444 28.444444 0 0 1-41.272889 29.980445L512 768z" fill="#A0A0A0" p-id="14051"></path><path d="M512 768l-249.941333 131.413333a28.444444 28.444444 0 0 1-41.244445-30.008889l47.701334-278.300444c36.124444-190.805333 67.128889-286.208 93.013333-286.208 38.826667 0 393.955556 261.774222 393.955555 286.208 0 16.298667-81.180444 75.264-243.484444 176.896z" fill="#A0A0A0" p-id="14052"></path></svg>
                  </el-icon>
                  <el-icon class="cancelButton" @click="changeStar(item.id)" v-else>
                    <svg t="1690052159982" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14050" width="200" height="200"><path d="M512 768l-249.941333 131.413333a28.444444 28.444444 0 0 1-41.244445-30.008889l47.701334-278.300444-202.183112-197.091556a28.444444 28.444444 0 0 1 15.758223-48.526222l279.438222-40.590222 124.956444-253.212444a28.444444 28.444444 0 0 1 51.029334 0l124.956444 253.212444 279.438222 40.590222a28.444444 28.444444 0 0 1 15.758223 48.526222l-202.183112 197.12 47.729778 278.272a28.444444 28.444444 0 0 1-41.272889 29.980445L512 768z" fill="#FFC500" p-id="14051"></path><path d="M512 768l-249.941333 131.413333a28.444444 28.444444 0 0 1-41.244445-30.008889l47.701334-278.300444c36.124444-190.805333 67.128889-286.208 93.013333-286.208 38.826667 0 393.955556 261.774222 393.955555 286.208 0 16.298667-81.180444 75.264-243.484444 176.896z" fill="#FED902" p-id="14052"></path></svg>
                  </el-icon>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <div class="pagination">
          <el-config-provider :locale="locale">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="pageSize"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
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

async function updatePostCollectionList() {
  const requestPostCollection = {
    currentPage: currentPage.value,
    pageSize: pageSize.value
  };
  let response = await axios.get('/api/PostCollection', requestPostCollection);
  let responseObj = response.data;
  if (responseObj.errorCode !== 200) {
    alert('错误代码' + responseObj.errorCode);
    return;
  }
  list.value = responseObj.data.list;
  total.value = parseInt(responseObj.data.total);
  cancelled.value = [];
  for(let i = 0; i < list.value.length; i++) {
    cancelled.value[list.value[i].id] = false;
  }
}

async function changeStar(id) {
  cancelled.value[id] = !cancelled.value[id];
  const requestCancelPostStar = {
    operate: 1,
    post_id: id
  }
  let response = await axios.post('/api/Post/Star', requestCancelPostStar)
  let responseObj = response.data
  if (responseObj.errorCode !== 200) {
    alert('错误代码' + responseObj.errorCode);
    return;
  }
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
};

onMounted(() => {
  updatePostCollectionList();
});
</script>

<style scoped>
  .postCollection {
    position: relative;
  }

  .body {
    padding-top:10px;
  }

  .title {
    font-size: 20px;
    color: #000000;
    margin-left: 4%;
    padding-top: 20px;
  }

  .postList {
    margin-top: 10px;
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
    top:120px;
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
  
</style>

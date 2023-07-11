<!--
健康资讯详情页面
作者：吴可非，张安琦
-->
<template>
  <div class="common-layout">
    <el-container>
      <!--大容器，包括一个侧边容器和一个主容器-->
      <el-aside width="400px" class="asideField">
        <el-affix :offset="1" target=".asideField">
          <div class="logoField">
            <div class="logoField">
              <div class="label">发布单位</div>
              <div class="logo">
                <img src="@/assets/logo.png" style="height: 90px" />
              </div>
            </div>
          </div>
        </el-affix>
      </el-aside>

      <el-main>
        <div class="contentField">
          <div class=“common-layout”>
            <el-container>
              <el-aside width="75%">
                <div class="content_header">
                  <p class="title">
                    {{this.news_detail.title}}
                  </p>
                  <el-row gutter="10" justify="center" style="width:100%">
                    <el-col span="1" v-for="tag in news_detail.tags" :key="tag">
                      <el-tag class="ml-2" type="warning" size="large">{{
                          tag
                        }}</el-tag>
                    </el-col>
                  </el-row>
                </div>
              </el-aside>
            </el-container>
          </div>
          <el-divider />
          <div class="contentMain">
            <p v-html="this.news_detail.content"></p>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import axios from "axios"
export default {
  name: "DetailedNewsPage",
  data() {
    return {
      flash_id:null,
      news_detail:{},
    }
  },
  methods:{
    getParams() {
      this.flash_id = this.$route.query.flash_id;

      const apiUrl = `https://mock.apifox.cn/m1/2961538-0-default/api/getNewsById?flash_id=${this.flash_id}`;
      axios.get(apiUrl)
          .then(res => {
            this.news_detail = res.data.data;
          })
    },
  },
  mounted() {
    this.getParams();
  }
}
</script>

<style scoped>
/*侧边容器栏的设置*/
.asideField{
  margin-bottom:40px;
}
/*侧边容器中的Logo部分的文字*/
.logoField .text{
  font-size: x-large;
  color: #409eff;
  font-family: SimSun;
  font-weight: bolder;
  margin-top: 20px;
  padding-bottom: 5px;
  border-bottom: #5c2705 solid;
  width: 250px;
  margin-left: 75px;
}
/*侧边容器的图片设置*/
.logoField .pic{
  margin-top: 15px;
}
/*侧边新闻卡片部分的样式*/
.cardField{
  margin-top: 20px;
}
/*新闻卡片内容的样式设置*/
.card{
  margin-bottom: 10px;
  margin-left: 25px;
}
/*新闻信息版块的样式*/
.contentField{
  background-color: white;
  min-height: 760px;
  border-radius:10px;
}
/*新闻文字内容部分的样式*/
.contentMain{
  width:80%;
  margin-left: 10%;
  text-align:left;
  padding-bottom: 50px;
  white-space: pre-line;
}
/*新闻信息大标题的样式*/
.title{
  font-size:xx-large;
  color:#409eff;
  font-family:SimSun;
  font-weight:bolder;;
  margin-bottom:15px;
}
/*最外层的侧边容器的样式设置*/
.asideField{
  margin-bottom: 40px;
}
</style>



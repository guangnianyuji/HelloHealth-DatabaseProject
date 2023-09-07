<!--
健康资讯详情页面
作者：吴可非，张安琦
-->
<template>
  <div class="common-layout">
    <el-container>
      <!--大容器，包括一个侧边容器和一个主容器-->
      <el-main  class="asideField" style="overflow-x:hidden;">
        <div class="contentField">
          <div class=“common-layout”>
            <el-container>
              <el-aside width="100%">
                <div style="align-items: center">
                  <p class="title" style="margin-bottom:20px;">
                    {{this.news_detail.title}}
                  </p>
                  <div style="margin-bottom:1%; text-align: center">
                    {{this.news_detail.time}}
                  </div>
                  <div class="tagWrapper">
                      <el-tag v-for="tag in news_detail.tags" :key="tag" class="ml-2" type="warning" size="large">
                          {{tag}}
                      </el-tag>
                  </div>
                </div>
              </el-aside>
            </el-container>
          </div>
          <el-divider />
          <div class="content">
            <TipTapEditorReadonly :content-json-string="this.news_detail.content"></TipTapEditorReadonly>
          </div>
        </div>
      </el-main>

      <el-aside>
        <el-affix :offset="1" target=".asideField">
          <div class="logoField">
            <div class="logoField">
              <div class="label">发布单位</div>
              <div class="logo" style="position: relative;">
                <hr style="position: absolute; top: -10px; width: 83%; border:none;border-top:2px solid var(--el-color-primary);margin-left: 30px;" />
                <img src="/static/logo1.png" style=" margin-top: 10px;width:250px;margin-left:40px" />
              </div>
            </div>
          </div>
        </el-affix>
      </el-aside>
    </el-container>
  </div>
</template>

<script>

import axios from "axios"
import TipTapEditorReadonly from "@/components/postView/TipTapEditorReadonly.vue";
export default {
  name: "DetailedNewsPage",
  components: {TipTapEditorReadonly},
  data() {
    return {
      flash_id:null,
      news_detail:{},
    }
  },
  methods:{
    getParams() {
      this.flash_id = this.$route.params.flash_id;

      const apiUrl = "/api/Flash/getNewsById/"+this.flash_id;
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
  width:1100px;
  max-width:100%;
}
/* “发布单位”的字样式 */
.label{
  /* font-family: SimSun; */
  font-weight: bolder;
  font-size:25px;
  color: black;
  text-align:center;
  margin-top:30px;
  margin-bottom:20px;
}
/*新闻信息版块的样式*/
.contentField{
  background-color: white;
  min-height: 800px;
  padding:2%;
}
/*新闻文字内容部分的样式*/
.contentMain{
  width:100%;
  margin-left: 5%;
  text-align:left;
  padding-bottom: 50px;
  white-space: pre-line;
  font-size: 20px;
  /* font-family: 宋体;*/
}
/*新闻信息大标题的样式*/
.title{
  font-size:35px;
  color:black;
  /*font-family: 黑体;*/
  font-weight:bolder;;
  margin-top:20px;
  text-align: center;
}
/*最外层的侧边容器的样式设置*/
.asideField{
  margin-bottom: 40px;
}

.common-layout{
    width: 85%;
    margin: 0 auto;
    position: relative;
}

.tagWrapper{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
}

.ml-2{
    font-size:16px;
    margin:5px;
}

.content {
  line-height: 1.7em;
  min-height: 200px;
}
</style>



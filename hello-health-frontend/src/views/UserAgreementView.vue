<!--
杏仁币用户协议页面
作者：蔡名雅
-->

<template>
      <el-container>
        <el-header class="title">
            杏仁币用户协议
        </el-header>
        <el-main>
            <div class="agreement">
                {{userAgreement}}
            </div>
        </el-main>
      </el-container>
  </template>
  
  <script>
  
  import axios from "axios"
  export default {
    name: "UserAgreementPage",
    data() {
      return {
        userAgreement:'1',
      }
    },
    methods:{
      getUserAgreement() {
        this.flash_id = this.$route.query.flash_id;
        const apiUrl = '1';
        axios.get(apiUrl)
            .then(res => {
              this.userAgreement = res.data.userAgreement;
            })
      },
    },
    created() {
      
    }
  }
  </script>
  
  <style scoped>
  .title{
    font-size: 25px;
    align-self: center;
  }
  .agreement{
    margin-bottom:40px;
  }
  
  </style>
  
  
  
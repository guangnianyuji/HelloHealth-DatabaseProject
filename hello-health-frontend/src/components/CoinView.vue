<template>
    <div>
        <el-row class="HF_title">
            <svg t="1688614393322" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2387" width="32" height="32">
            <path d="M512 85.333c23.573 0 42.667 20.118 42.667 44.907v763.52c0 24.79-19.094 44.907-42.667 44.907s-42.667-20.118-42.667-44.907V130.24c0-24.79 19.094-44.907 42.667-44.907z"
            p-id="2388" fill="#6cb16a"></path>
            </svg>
                <div style="padding-top: 5px">我的杏仁币</div>
        </el-row>
        <el-row>
            <div class="coin-number-title">杏仁币余额：  </div>
            <div class="coin-number">{{CoinNum}}</div>
        </el-row>
        <el-container>
            <el-aside class="left">
                <el-row>
                    <div style="font-size: 14px;">硬币记录</div>
                    <div style="font-size: 14px;color: grey;margin-left: 3px;">
                        您最近一周的变化情况
                    </div>
                </el-row>
                <el-table :data="CoinRecordList" 
                    :default-sort="{ prop: 'Time', order: 'ascending' }" 
                    height="250" style="width: 100%" class="table">
                <el-table-column prop="Time" label="时间" width="180" />
                <el-table-column prop="Num" label="变化" width="120" />
                <el-table-column prop="Reason" label="原因" width="250"/>
                </el-table>
            </el-aside>
            <el-main class="right">
                <el-row>
                    <div style="font-size: 14px;margin-bottom: 1%;">杏仁币有什么用</div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;color: grey;">
                        杏仁币是本平台中专用的虚拟货币，取自“杏林春暖 ，悬壶济世”之意。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;color: grey;">
                        • 用于对优秀帖子进行投币。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;color: grey;">
                        • 可以用来悬赏专业医生用户回答专业问题。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;margin-top: 5%;margin-bottom: 1%;">如何获得杏仁币</div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;color: grey;">
                        • 每日登录、完成健康计划。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 14px;color: grey;">
                        • 发帖被投杏仁币、发帖获得较大浏览量和获得高价值流量认可。
                    </div>
                </el-row>
            </el-main>
        </el-container>
        <el-row>
            <div class="buy-title">购买杏仁币 </div>
        </el-row>
        <el-row>
            <div style="font-size: 14px;color: grey;margin-top:1%;margin-left: 3%;">
                购买数量
            </div>
        </el-row>
        <el-row>
            <div style="margin-left: 3%;margin-top: 1%;">
                <el-radio-group v-model="BuyNum" 
                size="large">
                <el-radio-button v-for="num in numbers" :key="num" :label="num">
                    {{ num }}
                </el-radio-button>
                </el-radio-group>
            </div>
        </el-row>
        <el-row>
            <el-container>
                <el-aside class="pay-image">

                </el-aside>
                <el-main>
                    <el-row>
                        <div class="pay-number">{{BuyNum}}.00</div>
                    </el-row>
                    <el-row>
                        <div style="font-size: 16px;margin-top:1%;margin-left: 2%;">请先阅读并同意支付相关协议</div>
                    </el-row>
                    <el-row>
                        <el-checkbox 
                        v-model="checkedAgree" size="large" 
                        style="margin-left: 2%;margin-top: 3%;">
                        我已阅读并同意
                        </el-checkbox>
                        <a @click="GoUserAgreement" style="font-size:14px;margin-left: 0%;margin-top: 4%;text-decoration: underline;">《杏仁币用户协议》</a>
                    </el-row>
                </el-main>
            </el-container>
        </el-row>

    </div>


</template>

<style scoped>

.coin-number-title{
    margin-top: 1%;
    margin-left: 3%;
    font-size:22px;
    font-weight: bold;
    color: #000000;
}
.coin-number{
    margin-top: 1%;
    margin-left: 1%;
    text-align:left;
    font-size:22px;
    font-weight: bold;
    color:green;

}

.HF_title {
  font-size: 18px;
  color: #000000;
  margin-left: 2%;
  padding-top: 0px;
}

.left{
    width:auto;
    padding-left: 3%;
    padding-top: 20px;
}
.table{
    margin-top: 2%;

}
.right{
    width: auto;
    margin-left: 3%;
}
.buy-title{
    margin-top: 2%;
    margin-left: 3%;
    font-size:22px;
    font-weight: bold;
    color: #000000;
}
.pay-image{
    background-image: url("../assets/code.png");
    background-size:cover;
    background-position: center;
    margin-top: 2%;
    margin-left: 3%;
    width: 150px;
    height: 150px;
}
.pay-number{
    margin-top: 1%;
    margin-left: 2%;
    text-align:left;
    font-size:28px;
    font-weight:600 ;
    color:green;
}

</style>

<script scoped>

import axios from "axios";
import { ref } from 'vue';

export default
    {
        name: "CoinView",
        props:["user_id"],
        data:()=>
        ({
            BuyNum : ref('18'),
            numbers : ['6', '18', '68', '128','268'],
            CoinRecordList:[],
            RecordNum:0,
            CoinNum:100,
            checkedAgree:ref(false),
        }),
        watch:
        {
           
        },
        methods:
        {
            GoUserAgreement()
            { 
                //跳转到杏仁币用户协议网页
                this.$router.push({
                    name: 'UserAgreement',
                })
            },
            getCoinRecord()
            {
                const apiUrl = "/api/coinRecord";
                axios.get(apiUrl)
                .then(res => {
                this.CoinRecordList = res.data.data.coinRecordList;    // 获取全部硬币记录列表
                this.RecordNum = this.CoinRecordList.length;          // 总记录数
          })
            }
               
                
                
         },
        
        created(){
            this.getCoinRecord()
        }
    }
</script>

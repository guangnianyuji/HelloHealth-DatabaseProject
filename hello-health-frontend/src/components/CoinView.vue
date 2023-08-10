<template>
    <div>
        <el-row class="title-wrapper" style="">
        <el-button class="button" link @click="goToInfo">
            <i class="fi fi-br-angle-left" style="font-size:20px;"></i>
                <div style="margin-left: 3px;font-size:20px ;margin-right:5px;">返回</div>
        </el-button>

        <img alt="" src="../assets/coindraw.png" style="height: 50px;margin-top: 8px;margin-left: 24%;margin-right: 5px;">

        <div class="title">
            杏仁币详情
        </div>
        </el-row>

        <div class="content-wrapper">
            <el-row style="padding-left: 12px;margin-top: 0px;">

            <div class="coin-number-title">杏仁币余额：  </div>
            <div class="coin-number">{{CoinNum}}</div>
        </el-row>
        <el-container>
            <el-aside class="left">
                <el-row>
                    <div style="font-size: 15px;">杏仁币记录</div>
                    <div style="font-size: 15px;color: grey;margin-left: 3px;">
                        您最近一周的变化情况
                    </div>
                </el-row>
                <el-table :data="CoinRecordList" 
                    :default-sort="{ prop: 'Time', order: 'ascending' }" 
                    height="230" style="width: 100%" class="table">
                <el-table-column prop="Time" label="时间" width="150" />
                <el-table-column prop="Num" label="变化" width="120" />
                <el-table-column prop="Reason" label="原因" width="250"/>
                </el-table>
            </el-aside>
            <el-main class="right">
                <el-row>
                    <div style="font-size: 16px;margin-bottom: 1%;">杏仁币介绍</div>
                </el-row>
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

        <el-row style="padding-left: 14px;">

            <div style="font-size: 15px;color: grey;margin-top:1%;margin-left: 45px;">
                购买数量
            </div>
        </el-row>

        <el-row style="padding-left: 59px;padding-top: 5px;">

                <el-radio-group v-model="BuyNum" 
                size="large">
                <el-radio-button v-for="num in numbers" :key="num" :label="num">
                    {{ num }}
                </el-radio-button>
                </el-radio-group>
                <el-input-number
                v-model="BuyNum"
                :min="1"
                :max="999"
                size="large"
                placeholder="Please input"
                style="margin-left: 1%;"
                />
        </el-row>
        <el-row>
            <el-container style="padding-left: 4%;">
                <el-aside class="pay-image">

                </el-aside>
                <el-main>
                    <el-row>
                        <div class="pay-number">¥ {{BuyNum}}.00</div>
                        <div style="margin-top: 20px;margin-left: 30px;color: gray;">请扫码支付</div>
                    </el-row>
                    <el-row>
                        <div style="font-size: 16px;margin-top:1%;margin-left: 2%;">请先阅读并同意支付相关协议</div>
                    </el-row>
                    <el-row>
                        <el-checkbox 
                        v-model="checkedAgree" size="large" 
                        style="margin-left: 2%;margin-top: 2.8%;">
                        我已阅读并同意
                        </el-checkbox>
                        <a @click="GoUserAgreement" style="font-size:14px;margin-left: 0%;margin-top: 3.7%;text-decoration: underline;">《杏仁币用户协议》</a>
                    </el-row>
                </el-main>
            </el-container>
        </el-row>
        </div>
        

    </div>


</template>

<style scoped>
.content-wrapper{
    margin-left: 3%;
}


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

.title-wrapper {
    margin-top: 0.5%;

    vertical-align: center;
    height: 60px;
}
.title{
    font-size: 30px;
    margin-left: 0%;
    margin-top: 1%;
}

.button{
    width: 80px;
    height:37px;
    margin-left: 6%;

    margin-top: 1%;
    color: black;
}

.left{
    width:auto;
    padding-left: 4%;
    padding-top: 20px;
}
.table{
    margin-top: 2%;

}
.right{
    width: auto;
    padding-top: 30px;
    margin-left: 4%;
}
.buy-title{

    margin-top: 1.8%;
    margin-left: 58px;

    font-size:22px;
    font-weight: bold;
    color: #000000;
}
.pay-image{
    margin-left:2px;
    background-image: url("../assets/code.png");
    background-size:cover;
    background-position: center;
    margin-top: 2%;

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
            /*跳转到个人信息界面*/
            goToInfo(){
            this.$router.push('/user')
            },
            getCoinRecord()
            {
                const apiUrl = "/api/HB/record";
                axios.get(apiUrl)
                .then(res => {
                this.CoinRecordList = res.data.data.coinRecordList;    // 获取全部硬币记录列表
                this.RecordNum = this.CoinRecordList.length;          // 总记录数
                this.CoinNum=res.data.data.coinNum         // 硬币数
                console.log("123"+JSON.stringfy(this.CoinRecordList));
          })
            }
               
                
                
         },
        
        created(){
            this.getCoinRecord()
        }
    }
</script>

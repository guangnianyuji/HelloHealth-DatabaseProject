<template>
    <div>
        <el-row class="title-wrapper" style="">
<!--        <el-button class="button" link @click="goToInfo">-->
<!--            <i class="fi fi-br-angle-left" style="font-size:20px;"></i>-->
<!--                <div style="margin-left: 3px;font-size:20px ;margin-right:5px;">返回</div>-->
<!--        </el-button>-->
            <button link @click="goToInfo">返回</button>

        <img alt="" src="/static/杏仁币.png" style="height: 50px;margin-top: 10px;margin-left: 24%;margin-right: 5px;">

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
                    <div style="font-size: 15px;font-weight: bold">杏仁币记录</div>
                    <div style="font-size: 15px;color: grey;margin-left: 10px;">
                        您最近一周的变化情况
                    </div>
                </el-row>
                <el-table :data="CoinRecordList" 
                    :default-sort="{ prop: 'Time', order: 'ascending' }" 
                    height="230" style="    width: 100%" class="table" empty-text="您暂时没有杏仁币记录~">
                <el-table-column prop="Time" label="时间" width="150" />
                <el-table-column prop="Num" label="变化" width="120" />
                <el-table-column prop="Reason" label="原因" width="250"/>
                </el-table>
            </el-aside>
            <el-main class="right">
                <el-row>
                    <div style="font-size: 16px;margin-bottom: 1%;font-weight: bold">杏仁币介绍</div>
                </el-row>
                <el-row>
                    <div style="font-size: 15px;color: grey;">
                        杏仁币是本平台中专用的虚拟货币，取自“杏林春暖 ，悬壶济世”之意。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 15px;color: grey;">
                        • 用于对优秀帖子进行投币。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 15px;color: grey;">
                        • 可以用来悬赏专业医生用户回答专业问题。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 16px;margin-top: 5%;margin-bottom: 1%;font-weight: bold">如何获得杏仁币</div>
                </el-row>
                <el-row>
                    <div style="font-size: 15px;color: grey;">
                        • 每日登录。
                    </div>
                </el-row>
                <el-row>
                    <div style="font-size: 15px;color: grey;">
                        • 发帖被投杏仁币、发帖获得较大浏览量和获得高价值流量认可。
                    </div>
                </el-row>
            </el-main>
        </el-container>
            <el-row>
                <el-col :span="12">
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
            <el-container style="padding-left: 4%;">
                <el-aside class="pay-image">
                </el-aside>
                <el-main>
                    <el-row>
                        <div class="card-item"  @click="chargeClick">
                            <p class="t1" >余额+{{BuyNum}}杏仁币</p>
                            <p class="t3">{{(BuyNum/10).toFixed(2)}}</p>
                            <div class="card-foot">￥{{(BuyNum/10).toFixed(2)}}</div>
                       </div>
                        
                    </el-row>
                    <el-row>
                        <div style="font-size: 16px;margin-top:1%;">请先阅读并同意支付相关协议</div>
                    </el-row>
                    <el-row>
                        <el-checkbox 
                        v-model="checkedAgree" size="large" 
                        style="margin-top: 2.8%;">
                        我已阅读并同意
                            <a @click="GoUserAgreement" style="font-size:14px;margin-top: 5.5%;text-decoration: underline;">《杏仁币用户协议》</a>
                        </el-checkbox>

                    </el-row>
                </el-main>
            </el-container>
            </el-col>
            <el-col :span="12">
                <img src="/static/2.png" style="width: 90%;height: 90%;margin-top: 6%;margin-left: 4%">
            </el-col>
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
    margin-top: 1.5%;
    font-weight: bold;
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

.card-item {
    width: 204px;
    height: 134px;
    border-radius: 8px;
    border: 1px solid var(--el-color-primary);
    background-color: #fff;
    position: relative;
    text-align: center;
    margin-right: 26px;
    flex-shrink: 0;
    cursor: pointer;
}

.card-item .t1 {
    font-size: 16px;
    height: 22px;
    line-height: 22px;
    color: #222226;
    font-weight: 700;
    margin: 24px 0 12px;
    position: relative;
    z-index: 2;
}
.card-item .t3 {
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: var(--el-color-primary);
}
.card-item .card-foot {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 32px;
    background-color:var(--el-color-primary);
    font-size: 12px;
    line-height: 32px;
    color: #69421b;
    font-weight: 500;
    bottom: 0;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
}
.card-item:hover {
    border: 1px solid #02a7e3;
    color: #02a7e3;
    opacity: 0.6;
}

.card-item .custom-num{
    border: none;
    outline: none;
    background-color: transparent;
    max-width: 100%;
    text-align: center;
    color:var(--el-color-primary);
    font-weight: 700;
    font-size: 24px;
}
button {
    margin-left: 6%;
    margin-top: 1.5%;
    margin-bottom: 1%;
    padding: 0.7em 2.4em;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 1000;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
}

button:hover {
    background-color: RGB(0,191,168);
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
}

button:active {
    transform: translateY(-1px);
}
</style>

<script scoped>

import axios from "axios";
import { ref } from 'vue';
import { ElMessage } from "element-plus";
import globalData from "@/global/global";
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
            CoinNum:0,
            checkedAgree:ref(false),
        }),
        watch:
        {
           
        },
        methods:
        {
            chargeClick(){
                
                if(!this.checkedAgree){
                    ElMessage.warning("请阅读并同意《杏仁币用户协议》")
                    return
                }
                axios
              .post("/api/HB/order", {
            
            num: this.BuyNum/10,
          })
          .then((res) => {
            console.log(res.data.data.pay_page)
            let newWindow =window.open('about:blank');
            newWindow.document.write(res.data.data.pay_page);
            newWindow.focus();
            //如果要关闭这个页面
            //if (newWindow) {
              //  newWindow.close();
                //    newWindow = null;
                //}

          })
          .catch((errMsg) => {
            console.log(errMsg);
            console.log("获取跳转支付网页失败");
          });
            },
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
                 
                axios.get("/api/HB/record")
                .then(res => {
                this.CoinRecordList = res.data.data.coinRecordList;    // 获取全部硬币记录列表
                this.RecordNum = this.CoinRecordList.length;          // 总记录数
                this.CoinNum=res.data.data.coinNum;
                //console.log("123"+JSON.stringfy(this.CoinRecordList));
          })
            }
               
                
                
         },
        
        created(){
            if(!globalData.login)
            {
                ElMessage.error('请先登录!')
                this.$router.push("/login")
                return;
            }
            this.getCoinRecord()
        }
    }
</script>

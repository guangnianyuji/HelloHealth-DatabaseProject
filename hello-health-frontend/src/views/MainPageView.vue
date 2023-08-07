<template>
    <div class="HomeView">
        <div class="top">
            <div class="top-back"></div>

            <div class="main">
                <div class="text-content">
                    <div class="main-welcome">
                        <div class="welcome">Welcome To<br />HelloHealth</div>

                        <div class="contenttext">HelloHealth 网页简介</div>
                    </div>

                    <button class="btn" @click="go('login')">
                        <div>登录 / 注册</div>
                        <svg fill="none" viewBox="0 0 24 24" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"
                                stroke="white" d="M11.6801 14.62L14.2401 12.06L11.6801 9.5"></path>
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"
                                stroke="white" d="M4 12.0601H14.17"></path>
                            <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"
                                stroke="white" d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20"></path>
                        </svg>
                    </button>
                </div>

                <svg class="vector" width="600" height="600" viewBox="0 0 600 600" fill="none"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M600 0H0V600H600V0Z" fill="url(#pattern0)" />
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0_208_60" transform="translate(0 -0.0168634) scale(0.00084317)" />
                        </pattern>
                        <image xlink:href="@/assets/mainPage1.png" id="image0_208_60" width="1186" height="1226"/>
                    </defs>
                </svg>
            </div>
        </div>

        <div class="part">
        
        <el-row>
            <el-col :span="12">
                <NewsCarousel/>
        <!-- 
        <el-carousel >
            <el-carousel-item v-for="item in 4" :key="item">
                <img :src="flashPic(item)" style="width:100%;height: 100%;border-radius: 50px;">
            </el-carousel-item>
        </el-carousel>
        -->
            </el-col>

            <el-col :span="12">
                <div style="margin-left: 10%;margin-top:10%;">
                    <div style="font-size: xx-large;">
                        <b>健康资讯</b>
                    </div>
                         
                    <div style="margin-top:1%;color: #9eb4cb; ">
                        为您推荐最新的医疗健康讯息
                    </div>

                    <div style="margin-top:5%; ">
                        <button class="detailButton" @click="go('news')">
                            <i class="fi fi-rr-books"></i> &nbsp;&nbsp;点击进入
                        <div class="detailHoverEffect">
                        <div>
                        </div>
                         </div>
                        </button>
                    </div>

                </div>     

            </el-col>
        

        </el-row>
        
        </div>


        <div class="part">
            <div class="functionTitle">
                    <div style="font-size: xx-large;">
                        <b>特色功能</b>
                    </div>

                    <div style="color: #9eb4cb; " class="functionDesc">
                      我们提供全方位、用户友好的健康管理和交流平台。通过HH找药查看和收藏药品信息；通过健康日历便捷管理健康日程，设置提醒，记录体征数据；在HH论坛参与社区互动。
                    </div>

            </div>

            <div class="functionRow">
                    <div class="part-el-card">
                        
                        <div class="icon-circle" style="background-color: #f3effb">

                          
                        <i class="fi fi-rs-medicine" style="color:#c6b4e8"></i>
                         
                         
                        </div>

                        <div class="part-el-card-title">
                            HH找药
                        </div>

                        <div class="part-el-card-space" style="color: #9eb4cb; ">
                            <p>系统全面的药品专栏库和科学权威的药品信息。</p>
                            <p>药品分类查找和搜索功能，药品收藏功能。</p>
                            <p>囊括常见可靠的保健品和药膳，智能推荐药品。</p>
                        </div>

                        <div class="part-el-card-space" style="text-align: center;">
                        
                            <button class="detailButton" @click="go('medicine')">
                            <i class="fi-rr-capsules"></i> &nbsp;&nbsp;点击进入
                            <div class="detailHoverEffect">
                                <div>
                                </div>
                            </div>
                        </button>
                        
                    </div>
                         
                    </div>

                    <div class="part-el-card">
                        
                        <div div class="icon-circle" style="background-color: #eaf7f0">

                          
                        <i class="fi fi-rr-pulse" style="color:#64c58d"></i>
                        
                        </div>   

                        <div class="part-el-card-title">
                            健康日程管理
                        </div>                        
                        
                        <div class="part-el-card-space" style="color: #9eb4cb; ">
                          <p>在日历中管理您的每日健康事项：饮食、运动、服药、医嘱提示...</p>
                          <p>设置HH健康助手跟踪您的事项完成情况，一切尽在掌握。</p>
                          <p>记录您的体检报告，动态监测血糖、血压、血脂等体征数据。</p>
                        </div>

                        <div class="part-el-card-space" style="text-align: center;">
                        <button class="detailButton" @click="go('calendar')">
                            <i class="fi-rr-calendar-clock"></i> &nbsp;&nbsp;点击进入
                        <div class="detailHoverEffect">
                        <div>
                        </div>
                         </div>
                        </button>
                        </div>
                         
                    </div>

                    <div class="part-el-card">
                        
                        <div div class="icon-circle" style="background-color: #ebf3fe">

                        
                        <i class="fi fi-rs-syringe" style="color:#2f80ed"></i>
                         
                         
                        </div>
                         
                        <div class="part-el-card-title">
                            HH论坛
                        </div>

                        <div class="part-el-card-space" style="color: #9eb4cb; ">
                          <p>发布您的提问或者分享您的经验，具有专业医生资质的用户将为您答疑解惑。</p>
                          <p>为优质帖子点赞、收藏、投币，参与社区互动，共享信息，建立联系。</p>
                        </div>

                        <div class="part-el-card-space" style="text-align: center;">
                        <button class="detailButton" @click="go('forum')">
                            <i class="fi-rr-user-md-chat"></i> &nbsp;&nbsp;点击进入
                        <div class="detailHoverEffect">
                        <div>
                        </div>
                         </div>
                        </button>
                        </div>

                    </div>

            </div>

        </div>

        <div >
            <div style="background-color: #00bfa8;">
                <el-row style="width: 80%; margin: 0 auto;">
                    <el-col :span="8">
                       <div class="footer-part">

                         <div class="footer-title">
                            HelloHealth
                        </div>

                      </div> 
                    </el-col>

                    <el-col :span="8">
                       <div class="footer-part">

                         <div class="footer-title">
                            Our Team
                        </div>

                        <div class="footer-content">
                        <el-row>
                            <el-col :span="12" v-for="name in We" :key="name">
                               <div style="margin-top:10%"> {{name}} </div>
                            </el-col>
                        </el-row>
                        </div>

                      </div> 
                    </el-col>


                    <el-col :span="8">
                       <div class="footer-part">

                         <div class="footer-title">
                            Contact Us
                        </div>

                      </div> 
                    </el-col>

                </el-row>

                <el-divider />

                <div>
                    <br/>
                </div>
            </div>
        </div>
        
         
    </div>
</template>
<script>
import globalData from "@/global/global";
import router from "@/router";
import {ElMessage} from "element-plus";
import NewsCarousel from "../components/NewsCarousel.vue";
export default {
    
    components: {NewsCarousel},
    props: {},
    data() {
          
        return {
            We:['guangnianyuji','Huge_Black','bulu','luriak','a-little-dust','cicada1212','wukef2425','Karrr-Angel','mint3242','wyfjc'],
        }
    },
    methods:{
        flashPic(item)
        {
            return "src/assets/homeview"+item+".jpg";
        },
        go(place)
        {
            console.log(place);
            if(place==='login')
            {
                if(globalData.login)
               {
                    ElMessage.success('您已登录！')
                    return;
               }
            }
            
            let pathname="/"+place;
            console.log(pathname);
             router.push(pathname)
        }
    },
};
</script>
<style scoped>
.footer-content{
    color:ghostwhite;
    font-size:100%;
    font-weight:300;
}
.footer-part{
    margin-left:20%;
}
.footer-title{
    margin-top:20%;
    color:ghostwhite;
    font-size:300%;
    font-weight:600;
}
.icon-circle{
    width: 5vw; 
    height: 5vw;
    border-radius: 50%;  
    text-align: center;
    
}

.part-el-card-space{
    margin: 5% 0;
}
.part-el-card-title{
    font-size:xx-large;
    font-weight:600;
    margin-top: 8%;
}
.part-el-card{
    border-radius:25px ;
    background-color: #fff;
    padding: 40px;
    box-shadow: 0 6px 6px rgba(36,37,38,.02)
}

.part{
    margin: 10%;
}

.top,
.top * {
    box-sizing: border-box;
}

.top {
    width: 100%;
    position: relative;
    background: #f2f7ff;
    padding: 40px 0;
}

.main {
    display: flex;
    flex-direction: row;
    width: 80%;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
}

.text-content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: flex-start;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
}

.main-welcome {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
    left: 8px;
}

.welcome {
    background-image: linear-gradient(96.14deg,
            rgba(0, 191, 168, 1) 0%,
            #0093bf 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;

    text-align: left;
    font: 700 84px "Poppins", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    left: 8px;
}

.contenttext {
    color: var(--second, #6c87ae);
    text-align: left;
    font: 400 16px/24px "Sora", sans-serif;
    position: relative;
    left: 8px;
}

.btn {
    --color: #00bfa8;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s;
    border: none;
    background-color: transparent;
    z-index: 2;
    left: 20px;
}

.btn div {
    letter-spacing: 2px;
    font-weight: bold;
    background: var(--color);
    border-radius: 2rem;
    color: white;
    padding: 1rem;
    z-index: 2;
}

.btn::before {
    content: '';
    z-index: 1;
    background-color: var(--color);
    border: 2px solid white;
    border-radius: 2rem;
    width: 110%;
    height: 100%;
    position: absolute;
    transform: rotate(10deg);
    transition: .5s;
    opacity: 0.2;
}

.btn:hover {
    cursor: pointer;
    filter: brightness(1.2);
    transform: scale(1.1);
    z-index: 2;
}

.btn:hover::before {
    transform: rotate(0deg);
    opacity: 1;
}

.btn svg {
    transform: translateX(-200%);
    transition: .5s;
    width: 0;
    opacity: 0;
    z-index: 2;
}

.btn:hover svg {
    width: 25px;
    transform: translateX(0%);
    opacity: 1;
    z-index: 2;
}

.btn:active {
    filter: brightness(1.4);
}

.vector {
    flex-shrink: 0;
    position: relative;
    overflow: visible;
}

.detailButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 30px;
    border: 0;
    position: relative;
    overflow: hidden;
    border-radius: 10rem;
    transition: all 0.02s;
    font-weight: bold;
    color: rgb(90, 90, 90);
    z-index: 0;
    box-shadow: 0 0px 7px -5px rgba(0, 0, 0, 0.5);
}

.detailButton:hover {
    background: #e8f7f6a7;
    color: rgb(0, 0, 0);
}

.detailButton:active {
    transform: scale(0.97);
}

.detailHoverEffect {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.detailHoverEffect div {
    background: #00BFA8;
    background: linear-gradient(90deg, #00BFA8 0%, rgb(0, 255, 204) 49%, rgb(0, 140, 255) 100%);
    border-radius: 40rem;
    width: 10rem;
    height: 10rem;
    transition: 0.4s;
    filter: blur(20px);
    animation: effect infinite 3s linear;
    opacity: 0.5;
}

.button:hover .hoverEffect div {
    width: 8rem;
    height: 8rem;
}

@keyframes effect {

    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.icon-circle{
    display: flex;
    align-items: center;
    justify-content: center;
}
.icon-circle>.fi{
    height: 44px;
    font-size: 40px;
}

.functionTitle{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 30px 0;
}

.functionTitle>.functionDesc{
    max-width: 50%;
}

.functionRow{
    display: flex;
    gap: 5%;
}
</style>
  
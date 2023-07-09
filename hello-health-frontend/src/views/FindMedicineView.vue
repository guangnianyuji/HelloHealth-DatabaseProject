<template>
    <div class="FM_body">
        <el-row class="FM_title">
            <div style="padding-top: 3px; position: relative" class="title-with-line">HH找药</div>
        </el-row>

        <!--    筛选条件-->
        <div class="filter-drug-box">
            <el-card class="box-card">
                <el-row>
                    <el-col :span="2" class="text item">分类：</el-col>
                    <el-col :span="22" class="text select-item">
                        <el-radio-group v-model="category">
                            <el-radio :label="0" class="option-box">全部</el-radio>
                            <el-radio :label="1" class="option-box">西药</el-radio>
                            <el-radio :label="2" class="option-box">中药</el-radio>
                            <el-radio :label="3" class="option-box">保健品</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="text item">品牌：</el-col>
                    <el-col :span="22" class="text select-item">
                        <el-radio-group v-model="brand">
                            <el-radio :label="0" class="option-box">全部</el-radio>
                            <el-radio :label="1" class="option-box">白云山</el-radio>
                            <el-radio :label="2" class="option-box">曼秀雷敦</el-radio>
                            <el-radio :label="3" class="option-box">哈药集团制药六厂</el-radio>
                            <el-radio :label="4" class="option-box">天大药业</el-radio>
                            <el-radio :label="5" class="option-box">国药</el-radio>
                            <el-radio :label="6" class="option-box">香雪</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="text item">剂型：</el-col>
                    <el-col :span="22" class="text select-item">
                        <el-radio-group v-model="form">
                            <el-radio :label="0" class="option-box">全部</el-radio>
                            <el-radio :label="1" class="option-box">注射剂</el-radio>
                            <el-radio :label="2" class="option-box">口服液体剂型</el-radio>
                            <el-radio :label="3" class="option-box">胶囊剂</el-radio>
                            <el-radio :label="4" class="option-box">片剂</el-radio>
                            <el-radio :label="5" class="option-box">颗粒剂</el-radio>
                            <el-radio :label="6" class="option-box">软膏剂</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="text item">医保药物：</el-col>
                    <el-col :span="22" class="text select-item">
                        <el-radio-group v-model="insurance">
                            <el-radio :label="0" class="option-box">全部</el-radio>
                            <el-radio :label="1" class="option-box">医保药物</el-radio>
                            <el-radio :label="2" class="option-box">非医保药物</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="2" class="text item">处方药物：</el-col>
                    <el-col :span="22" class="text select-item">
                        <el-radio-group v-model="recipe">
                            <el-radio :label="0" class="option-box">全部</el-radio>
                            <el-radio :label="1" class="option-box">处方药物</el-radio>
                            <el-radio :label="2" class="option-box">非处方药物</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </el-card>

        </div>
        <!--    药品列表-->
        <el-row style="width: 80%; margin: 3px auto;">
            <el-col :span="18" >
                <el-row class="FM_r_title">
                    <div style="padding-top: 3px" class="title-with-line">找药结果</div>
                </el-row>
                <el-row class="result_title">
                    <el-col >
                        <el-input
                                v-model="input"
                                class="search-box"
                                placeholder="更多关键词"
                                :suffix-icon="Search"
                        />
                    </el-col>
                    <el-col  style="padding-top: 5px">
                        <div>查询结果共xx条</div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6"><img class="img" style="margin-top:10px"   alt="" src="@/assets/FindMedicine.png"/></el-col>
        </el-row>

        <el-tabs type="border-card" class="result_title result_box">
            <el-tab-pane label="综合排序">
                <el-table :data="tableData" stripe style="width: 100%" height="350">
                    <el-table-column prop="star" label="收藏" width="60">
                        <label class="container">
                            <input type="checkbox">
                            <svg height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px"
                                 xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g></svg>
                        </label>
                    </el-table-column>
                    <el-table-column prop="name" label="药品名称" width="180"/>
                    <el-table-column prop="categories" label="类别" width="100"/>
                    <el-table-column prop="form" label="剂型" width="110"/>
                    <el-table-column prop="adaption" label="适应症" width="280"/>
                    <el-table-column prop="company" label="公司" width="180"/>
                    <el-table-column prop="operation" label="操作">
                        <!--                            <el-button>查看详情</el-button>-->
                        <button class="cssbuttons-io-button"> 查看详情
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path fill="currentColor"
                                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                                </svg>
                            </div>
                        </button>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="按价格排序">
                按价格排序
            </el-tab-pane>
        </el-tabs>
<!--        分页-->
        <div class="pagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {ref} from 'vue'
import {Search} from '@element-plus/icons-vue'

const category = ref(0)
const brand = ref(0)
const form = ref(0)
const insurance = ref(0)
const recipe = ref(0)
const input = ref('')
const tableData = [
    {
        name: '感冒清热颗粒',
        categories: '中药',
        form: '颗粒剂',
        adaption: '头痛 恶寒 流清涕 咳嗽 风寒感冒 感冒',
        company: '同仁堂',
    },
    {
        name: '小儿氨酚黄那敏颗粒',
        categories: '西药',
        form: '颗粒剂',
        adaption: '普通感冒 流行性感冒 头痛 打喷嚏 流鼻涕 鼻塞 咽痛',
        company: '哈药集团制药六厂',
    },
    {
        name: '阿莫西林胶囊',
        categories: '西药',
        form: '胶囊剂',
        adaption: '溶血 肺炎 中耳炎 鼻窦炎 咽炎 扁桃体炎 急性支气管炎 支气管炎 气管炎 淋病 伤寒 钩端螺旋体病 上呼吸道感染 皮肤软组织感染 软组织感染 下呼吸道感染 溃疡',
        company: '珠海联邦制药股份有限公司中山分公司',
    },
    {
        name: '布洛芬混悬液',
        categories: '西药',
        form: '口服液体剂型',
        adaption: '缓解儿童感冒引起的发热、头痛和轻至中度疼痛如关节痛、偏头痛、牙痛、肌肉痛、神经痛、痛经。',
        company: '天大药业有限公司',
    },
    {
        name: '复方对乙酰氨基酚片',
        categories: '中药',
        form: '颗粒剂',
        adaption: '头痛 恶寒 流清涕 咳嗽 风寒感冒 感冒',
        company: '同仁堂',
    },
    {
        name: '氨麻苯美片',
        categories: '西药',
        form: '片剂',
        adaption: '普通感冒 流行性感冒 头痛 打喷嚏 流鼻涕 鼻塞 咽痛',
        company: '哈药集团制药六厂',
    },
    {
        name: '复方锌布颗粒剂',
        categories: '西药',
        form: '颗粒剂',
        adaption: '溶血 肺炎 中耳炎 鼻窦炎 咽炎 扁桃体炎 急性支气管炎',
        company: '珠海联邦制药股份有限公司中山分公司',
    },
    {
        name: '复方甘草口服溶液',
        categories: '西药',
        form: '口服液体剂型',
        adaption: '缓解儿童感冒引起的发热、头痛和轻至中度疼痛如关节痛、偏头痛、牙痛、肌肉痛、神经痛、痛经。',
        company: '天大药业有限公司',
    },
]
export default {
    name: "FindMedicineView",
    data() {
        return {
            category,
            brand,
            form,
            insurance,
            recipe,
            input,
            Search,
            tableData,
        }
    }
}

</script>

<style>
.FM_body {
    background-color: RGB(232, 246, 246);
    height: 950px;
}

.FM_title {
    font-size: 20px;
    color: #000000;
    margin-left: 3.5%;
    width: 80%;
    padding-top: 20px;
    padding-left: 17px;
}

.FM_r_title {
    padding-left: 17px;
    font-size: 20px;
    color: #000000;
    margin-left: 5%;
    margin-top: 20px;
}

.text {
    font-size: 16px;
    text-align: justify;
    text-justify: distribute-all-lines; /*ie6-8*/
    text-align-last: justify; /* ie9*/
    -moz-text-align-last: justify; /*ff*/
    -webkit-text-align-last: justify; /*chrome 20+*/
}

.item {
    padding-top: 5px;
    padding-bottom: 10px;
}

.select-item {
    padding-top: 0px;
}

.box-card {
    width: 90%;
    margin-left: 5%;
    margin-right:5%;
    margin-top: 1.5%;
}

.option-box {
    font-size: 16px;
    margin-right: 40px;
    margin-left: 10px;
}

.result_title {
<<<<<<< HEAD
    margin-left: 7%;
=======

>>>>>>> master
    margin-top: 1%;
}

.result_box {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
}

.search-box {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 50%;
}

.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.container {
    display: block;
    position: relative;
    cursor: pointer;
    user-select: none;
}

.container svg {
    position: relative;
    top: 0;
    left: 0;
    height: 30px;
    width: 30px;
    transition: all 0.3s;
    fill: #666;
}

.container svg:hover {
    transform: scale(1.1);
}

.container input:checked ~ svg {
    fill: RGB(253, 190, 45);
}

.cssbuttons-io-button {
    background: RGB(0, 191, 168);
    color: white;
    font-family: inherit;
    padding: 0em;
    padding-left: 1em;
    font-size: 13px;
    font-weight: 400;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em RGB(0, 191, 168);
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding-right: 3.1em;
}

.cssbuttons-io-button .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    box-shadow: 0.1em 0.1em 0.6em 0.2em RGB(49, 201, 184);
    right: 0.3em;
    transition: all 0.3s;
}

.cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
}

.cssbuttons-io-button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: RGB(49, 201, 184);
}

.cssbuttons-io-button:hover .icon svg {
    transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon {
    transform: scale(0.95);
}

.img {
    width: 150px;
    height: 130px;
}
.pagination{
    margin-left: 33%;
    margin-top: 20px;
}

.title-with-line:before{
    content:"";
    top:50%;
    width: 1px;
    height: 1.2em;
    display: inline-block;
    position: absolute;
    background-color: var(--el-color-primary);
    border: 1px solid var(--el-color-primary);
    border-radius: 2px;
    transform: translate(-16px , -50%);
}
</style>
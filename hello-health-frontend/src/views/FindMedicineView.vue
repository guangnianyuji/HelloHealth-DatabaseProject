<!--
描述：HH找药
作者：陈雨彤、张恺瑞
-->

<script>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from "axios";
import StarMedicineButton from "@/components/StarMedicineButton.vue";

const category = ref(0)
const brand = ref(0)
const form = ref(0)
const insurance = ref(0)
const recipe = ref(0)
// Filtered data based on selected options
//const filteredData = ref(tableData)
export default {
    name: "FindMedicineView",
    components: { StarMedicineButton },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 5, // 设置每页记录数为 5
            category,
            brand,
            form,
            insurance,
            recipe,
            search_value: '',
            constData: [],  // 总列表，不可动
            tableData: [],  // 初始化为空数组，总列表基础上的搜索、筛选列表
            //filteredData, // Use the filteredData instead of tableData in the template
            medicine: [
                {
                    id: "medicine_id",
                    label: "批准文号",
                    content: null,
                    span: 1,
                },
                {
                    id: "medicine_ch_name",
                    label: "中文名称",
                    content: null,
                    span: 1,
                },
                {
                    id: "medicine_en_name",
                    label: "英文名称",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_category',
                    label: "分类",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_abbreviation',
                    label: "简称",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_introduction',
                    label: "简介",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_country',
                    label: "来源",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_manufacturer',
                    label: "生产厂商",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_form',
                    label: "剂型",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_character',
                    label: "药品性状",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_ingredient',
                    label: "药品成分",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_validityperiod',
                    label: "有效期",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_usage',
                    label: "用法",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_indications',
                    label: "适应症",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_taboo',
                    label: "禁忌",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_storage',
                    label: "贮藏方法",
                    content: null,
                    span: 1,
                },
                {
                    id: 'is_prescription_medicine',
                    label: "是否为处方药",
                    content: null,
                    span: 1,
                },
                {
                    id: 'is_medical_insurance_medicine',
                    label: "是否为医保药",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_image',
                    label: "图片",
                    content: null,
                    span: 1,
                },
                {
                    id: 'medicine_reference_quote',
                    label: "参考报价",
                    content: null,
                    span: 1,
                },
            ],
        }
    },
    // TODO 增加api
    mounted() {
        axios.get('api/Medicine/medicineList')
            .then(response => {
                if (response.data.errorCode === 200) {
                    this.tableData = response.data.data.medicine_list; // Assuming the response contains the medicine data
                    this.constData = response.data.data.medicine_list;
                    console.log(response.data.data.medicine_list)
                    //const filteredData = this.tableData;
                    //const responseData = response.data.data.medicine_list;
                    //this.tableData = responseData; // 将获取的数据赋值给tableData数组
                } else {
                    console.error("Error fetching medicine data:", response.data.errorCode);
                }
            })
            .catch(error => {
                console.error(error);
            });
        console.log(this.tableData)
    },

    methods: {
        handleEnterKey() {
            console.log('Enter key pressed');
            this.medicineSearch(); // Call the search method here
        },
        medicineSearch() {
            console.log("Filtered Table Data:", this.tableData); // Check the value of filteredTableData
            if (this.tableData) {
                //在标签筛选过的基础上进行搜索
                const filteredData = this.constData.filter((item) => {
                    // Filter by search_value
                    if (this.search_value !== '') {// 如果搜索框不为空,则进行筛选,否则返回全部数据
                        if (!item.medicine_ch_name.includes(this.search_value))
                            return false;
                        else
                            return true;
                    }
                    else // 如果搜索框为空,则返回全部数据
                        return true;
                });
                console.log("Filtered Data:", filteredData); // Check the filtered data
                this.tableData = filteredData; // 更新filteredTableData
            }
            return [];
        },
        CardButtonClicked(row) {
            const medicineId = row.medicine_id;
            this.$router.push(`/medicineCard?medicine_id=${medicineId}`);
        },
        sizeChange(val) {
            this.itemsPerPage = val;
        },
        currentChange(val) {
            this.currentPage = val; // 更新当前页码
        }
    },
    computed: {
        filteredTableData() {
            if (this.tableData) {
                const filteredData = this.tableData.filter((item) => {
                    // Filter by category
                    if (this.category !== 0) {
                        switch (this.category) {
                            case 1:
                                if (item.medicine_category !== "西药")
                                    return false;
                                break;
                            case 2:
                                if (item.medicine_category !== "中药")
                                    return false;
                                break;
                            case 3:
                                if (item.medicine_category !== "保健品")
                                    return false;
                                break;
                        }
                    }
                    // Filter by form
                    if (this.form !== 0) {
                        switch (this.form) {
                            case 1:
                                if (item.medicine_form !== "注射剂")
                                    return false;
                                break;
                            case 2:
                                if (item.medicine_form !== "口服液体剂型")
                                    return false;
                                break;
                            case 3:
                                if (item.medicine_form !== "胶囊剂")
                                    return false;
                                break;
                            case 4:
                                if (item.medicine_form !== "片剂")
                                    return false;
                                break;
                            case 5:
                                if (item.medicine_form !== "颗粒剂")
                                    return false;
                                break;
                            case 6:
                                if (item.medicine_form !== "软膏剂")
                                    return false;
                                break;
                        }
                    }
                    //后端返回的是 是  / 否

                    // Filter by medical insurance medicine
                    if (this.insurance !== 0 && item.is_medical_insurance_medicine !== (this.insurance === 1 ? '是' : '否')) {
                        return false;
                    }
                    // Filter by prescription medicine
                    if (this.recipe !== 0 && item.is_prescription_medicine !== (this.recipe == 1 ? '是' : '否')) {
                        return false;
                    }
                    return true;
                });

                return filteredData;
            }
            return [];
        },
        // TODO 修改分页功能
        totalPages() {
            return Math.ceil(this.filteredTableData.length / this.itemsPerPage); // 使用每页记录数进行计算
        },
        paginatedTableData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;

            return this.filteredTableData.slice(start, end);
        },
    },  // end of computed
    watch: {
        search_value: {
            handler: 'search', // This will call the search method whenever search_value changes
            immediate: true // This will trigger the handler immediately after adding the watch
        }
    },  // end of watch

}
</script>

<template>
    <div class="FM_body">
        <el-row class="FM_title">
            <div class="viewTitle tracking-in-expand" style="padding-top: 3px">HH找药</div>
        </el-row>

        <!--  筛选条件  -->
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
        <!--  药品列表  -->
        <el-row>
            <el-col :span="18">
                <el-row class="FM_r_title">
                    <svg t="1688614393322" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2387" width="32" height="32">
                        <path
                            d="M512 85.333c23.573 0 42.667 20.118 42.667 44.907v763.52c0 24.79-19.094 44.907-42.667 44.907s-42.667-20.118-42.667-44.907V130.24c0-24.79 19.094-44.907 42.667-44.907z"
                            p-id="2388" fill="#6cb16a"></path>
                    </svg>
                    <div style="padding-top: 3px">找药结果</div>
                </el-row>
                <el-row class="result_title">
                    <el-col>
                        <el-input class="search-box" v-model="search_value" clearable @keyup.enter.native="handleEnterKey"
                            placeholder="请输入药品中文名称" :prefix-icon="Search" />
                    </el-col>
                    <el-col style="padding-top: 5px">
                        <div>查询结果共{{ this.filteredTableData.length }}条</div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6"><img class="img fade-in-fwd" style="margin-top:10px;" alt="" src="/static/FindMedicine.png" /></el-col>
        </el-row>

        <el-tabs type="border-card" class="result_title result_box">
            <el-tab-pane label="综合排序">
                <el-table :data="paginatedTableData" stripe style="width: 100%">
                    <el-table-column label="是否收藏" width="60">

                        <!--
                        <label class="container">
                            <input type="checkbox">
                            <svg height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px"
                                xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g>
                                    <g>
                                        <path
                                            d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </label>
                        -->
                        <template #default="scope">
                            <StarMedicineButton :collected="scope.row.isCollected" :medicine_id="scope.row.medicine_id">
                            </StarMedicineButton>

                        </template>
                    </el-table-column>
                    <el-table-column prop="medicine_ch_name" label="药品名称" width="200" />
                    <el-table-column prop="medicine_category" label="类别" width="100" />
                    <el-table-column prop="medicine_form" label="剂型" width="100" />
                    <el-table-column prop="medicine_indications" label="适应症" width="auto" />
                    <el-table-column prop="medicine_manufacturer" label="生产厂商" width="150" />
                    <el-table-column prop="operation" label="操作" width="150">
                        <template #default="{ row }">
                            <button class="cssbuttons-io-button" @click="CardButtonClicked(row)">
                                查看详情
                                <div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path fill="currentColor"
                                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z">
                                        </path>
                                    </svg>
                                </div>
                            </button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!--  分页  -->
        <div class="pagination">
            <el-pagination background @size-change="sizeChange" @current-change="currentChange"
                :page-sizes="[5, 10, 15, 20]" :page-size="this.itemsPerPage"
                layout="total, sizes, prev, pager, next, jumper" :total="this.filteredTableData.length"
                v-model="currentPage">
            </el-pagination>
        </div>
    </div>
</template>

<style>
.FM_body {
    z-index: 999;
}

.FM_title {
    font-size: 20px;
    color: #000000;
    margin-left: 5%; 
    padding-top: 20px;
}

.FM_r_title {
    font-size: 20px;
    color: #000000;
    margin-left: 5%;
    margin-top: 20px;
}

.viewTitle {
    background-image: linear-gradient(96.14deg,
            rgba(0, 191, 168, 1) 0%,
            #0093bf 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    text-align: left;
    font: 600 32px "Poppins", sans-serif;
}

.text {
    font-size: 16px;
    text-align: justify;
    text-justify: distribute-all-lines;
    /*ie6-8*/
    text-align-last: justify;
    /* ie9*/
    -moz-text-align-last: justify;
    /*ff*/
    -webkit-text-align-last: justify;
    /*chrome 20+*/
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
    margin-right: 5%;
    margin-top: 1.5%;
}

.option-box {
    font-size: 16px;
    margin-right: 40px;
    margin-left: 10px;
}

.result_title {
    margin-left: 7%;
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

.container input:checked~svg {
    fill: RGB(253, 190, 45);
}

.cssbuttons-io-button {
    background: RGB(0, 191, 168);
    color: white;
    font-family: inherit;
    padding: 0em;
    padding-left: 1em;
    font-size: 13px;
    font-weight: 500;
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

.pagination {
    margin-left: 30%;
    margin-top: 20px;
    margin-bottom: 40px;
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

.fade-in-fwd {
	animation: fade-in-fwd 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
@keyframes fade-in-fwd {
  0% {
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}

</style>
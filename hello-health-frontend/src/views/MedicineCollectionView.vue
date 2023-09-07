<!--
描述：药品收藏界面
作者：张恺瑞
-->

<template>
  <div class="Medicine-Collection">
    <div class="FM_body">
      <el-row class="FM_title">
        <div class="viewTitle tracking-in-expand" style="padding-top: 3px">药品收藏</div>
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
            <svg t="1688614393322" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="2387" width="32" height="32">
              <path
                d="M512 85.333c23.573 0 42.667 20.118 42.667 44.907v763.52c0 24.79-19.094 44.907-42.667 44.907s-42.667-20.118-42.667-44.907V130.24c0-24.79 19.094-44.907 42.667-44.907z"
                p-id="2388" fill="#6cb16a"></path>
            </svg>
            <div style="padding-top: 3px">找药结果</div>
          </el-row>
          <el-row class="result_title">
            <el-col>
              <el-input class="search-box" v-model="search_value" clearable @keyup.enter.native="handleEnterKey"
                placeholder="请输入药品中文名称" :prefix-icon="Search"/>
            </el-col>
            <el-col style="padding-top: 5px">
              <div>收藏共{{ this.filteredTableData.length }}条</div>
              <div class="tips" v-if="this.filteredTableData.length===0">
                <img class="sadImg jello-horizontal" style="height: 256px;" alt="" src="/static/thinking.png" />
                <div class="sadTip jello-horizontal">暂时还没有收藏的药品哦~快去浏览吧！</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="card-container">
      <div class="card" v-for="(item, index) in filteredTableData" :key="index" @click="BriefCardClicked(item)">
        <div class="medicine-image">
          <img :src="item.medicine_image" style="width: 100%;height: 100%;objec-fit: cover;" alt="Medicine Image" />
        </div>
        <div class="card__content">
          <p class="medicine_name">{{ item.medicine_ch_name }}</p>
          <p class="medicine_description">分类：{{ item.medicine_category }}</p>
          <p class="medicine_description">剂型：{{ item.medicine_form }}</p>
          <p class="medicine_description">适应症：{{ item.medicine_indications }}</p>
          <p class="medicine_description">简介：{{ item.medicine_introduction||'暂无' }}</p>
          <p class="medicine_description">我的备注：{{ item.collect_memory||'无' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import BackButton from "@/components/BackButton.vue";
import WebLoading from "@/components/WebLoading.vue";
import { Search } from '@element-plus/icons-vue'
import axios from "axios";
import { ref } from "vue";

const category = ref(0)
const brand = ref(0)
const form = ref(0)
const insurance = ref(0)
const recipe = ref(0)

export default {
  name: "MedicineCollectionView",
  components: { WebLoading, BackButton },
  data() {
    return {
      category,
      brand,
      form,
      insurance,
      recipe,
      search_value: '',
      constData: [],  // 总列表，不可动
      tableData: [],  // 初始化为空数组，总列表基础上的搜索、筛选列表
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
  created() {
    axios.get('/api/Medicine/collectionList')
      .then(response => {
        if (response.data.errorCode === 200) {
          this.tableData = response.data.data.medicine_list; // Assuming the response contains the medicine data
          this.constData = response.data.data.medicine_list;
          //console.log(response.data.data.medicine_list)
        } else {
          console.error("Error fetching medicine data:", response.data.errorCode);
        }
      })
      .catch(error => {
        console.error(error);
      });
    
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
    BriefCardClicked(item) {
      const medicineId = item.medicine_id;
      this.$router.push(`/medicineCard?medicine_id=${medicineId}`);
    },
  },  // end of methods
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

          // Filter by medical insurance medicine
          if (this.insurance !== 0 && item.is_medical_insurance_medicine !== (this.insurance === 1 ? '是' : '否')) {
            return false;
          }
          // Filter by prescription medicine
          if (this.recipe !== 0 && item.is_prescription_medicine !== (this.recipe === 1 ? '是' : '否')) {
            return false;
          }
          return true;
        });

        return filteredData;
      }
      return [];
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
  
<style scoped>
.FM_body {
  z-index: 999;
  padding-top: 30px;
}

.FM_title {
  font-size: 20px;
  color: #000000;
  margin-left: 4%;
}

.FM_r_title {
  font-size: 20px;
  color: #000000;
  margin-left: 5%;
  margin-top: 20px;
}

.viewTitle {
  margin-left: 1%;
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

.search-box {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 50%;
}


.Medicine-Collection {
  position: relative;
}

.card-container {

  width: 85%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.card {
  position: relative;
  width: 300px;
  height: 400px;
  background: linear-gradient(-45deg, #00bea8 0%, rgba(35, 137, 220, 0.8) 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  margin: 15px;
}

.card:hover {
  transform: rotate(-5deg) scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.card:hover .img {
  scale: 0;
  transform: rotate(-45deg);
  z-index: 2;
}

.card:hover .card__content {
  //transform: translate(-50%, -50%) rotate(-45deg);
  opacity: 0;
}

.card__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  opacity: 1;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.medicine_name {
  margin: 0;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}

.medicine_description {
  margin: 10px 0 0;
  font-size: 14px;
  color: #777;
  line-height: 1.4;
}

.tips {
  position:relative;
  display: flex;
  flex-direction: column;
  align-items: center; /* 在主轴上居中对齐 */
  text-align: center; /* 也可以在文本上进行居中对齐 */
  margin-top: 10px;
  margin-left: 30%;
}

.sadTip {
  background-image: linear-gradient(96.14deg,
    #8DBEF8 0%,
    #377EB6 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;

  text-align: left;
  font: 600 18px "Poppins", sans-serif;

  margin-top: 5px;
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

.jello-horizontal {
	animation: jello-horizontal 0.9s both;
}

@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }
  30% {
    transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
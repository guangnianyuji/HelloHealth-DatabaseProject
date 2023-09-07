<!--
描述：药品详情卡片组件
作者：张恺瑞
-->

<template>
    <div class="wrapper">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3">
            <div class="add-favorite-wrapper">
        <span class="AddCollection">
          <StarMedicineButton :collected="isCollected" :medicine_id="$route.query.medicine_id"
                              @father-update="getMedicineCard"></StarMedicineButton>
        </span>
            </div>
        </div>
        <div class="card">
            <section class="top">
        <span class="u-l">
          <i class="fi fi-rr-capsules"></i>
          药品基本信息
        </span>
            </section>
            <section class="bottom">
                <ul class="properties">
                    <li class="property" v-for="item in items" :key="item.id">
                        <span class="label">{{ item.label }}:</span>
                        <span class="content">
              <!-- 检查 label 是否为 "medicine_image" -->
              <div v-if="item.id === 'medicine_image'">
              <img :src="item.content" style="width: 100%;height: 100%;objec-fit: cover;"><!--alt="Medicine Image"-->
              </div>
              <div v-else-if="item.id === 'collect_memory'" class="collectionMemory">
                <div v-if="isCollected">
                <el-input v-model="collectMemory" placeholder="Please input" class="input-with-select">
                  <template #append>
                    <el-button class="updateButton" @click="Update"><i class="fi fi-rr-refresh">更新</i></el-button>
                  </template>
                </el-input>
                </div>
                <div v-else>
                 <strong> 您还没有收藏此药品！！</strong>
                </div>
              </div>
                            <!-- 如果不是 "medicine_image"，则显示内容 -->
              <span v-else>{{ item.content || "-" }} </span>
            </span>
                    </li>

                </ul>
            </section>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import globalData from "@/global/global";
import {reactive, ref} from "vue";
import {Refresh} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import StarMedicineButton from "./StarMedicineButton.vue"

export default {
    name: "MedicineCard",
    components: {StarMedicineButton},


    setup() {
        const items = reactive([
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
                label: "参考报价(/元)",
                content: null,
                span: 1,
            },
            {
                id: 'collect_memory',
                label: "药品收藏备注",
                content: null,
                span: 1,
            },
        ]);

        const medicineId = ref(null); // 使用 ref 来包装 medicineId

        medicineId.value = items.find((item) => item.id === "medicine_id").content

        const isCollected = ref(null);
        const collectMemory = ref(null);

        return {
            items,
            medicineId,
            isCollected,
            collectMemory
        };
    },
    created() {
        console.log("created")
        this.getMedicineCard();
    },
    methods: {
        getMedicineCard() {
            const medicine_Id = this.$route.query.medicine_id;
            console.log(medicine_Id)
            if (medicine_Id) {
                axios
                    .post(`/api/Medicine/medicineCard`, {medicine_id: medicine_Id})
                    .then((res) => {
                        const response = res.data;
                        if (response.errorCode === 200) {
                            const medicineData = response.data;
                            this.items.forEach((item) => {
                                item.content = medicineData[item.id] || "-";
                            });
                            this.isCollected = medicineData.isCollected;
                            this.medicineId = medicine_Id
                            this.collectMemory = medicineData.collect_memory

                        } else {
                            console.error("Error fetching medicine data:", response.errorCode);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching medicine data:", error);
                    });
            } else {
                console.error("No medicine ID provided");
            }
            window.scrollTo(0, 0); //将滚动条回滚至最顶端
        },
        Update() {
            if (!globalData.login) {
                ElMessage.warning('请先登录！')
                return;
            }
            console.log(this.medicineId);
            axios.post('/api/Medicine/addCollection', {
                medicine_id: this.medicineId,
                memory: this.collectMemory,
            }).then((res) => {
                this.isCollected = true;
                ElMessage({
                    message: "更新药品备注成功！",
                    type: "success",
                })
            }).catch(error => {
                if (error.network) return false;
                switch (error.errorCode) {
                    default:
                        error.defaultHandler("更新药品备注失败")
                }
            });
        },

    },//end of methods
}

</script>

<style scoped>
.wrapper {
    position: absolute;
    --white: #e3e3e3;
    --bc: rgba(15, 70, 115, 0.6);
    --bc-al: rgba(12, 133, 119, 0.62);
    --bc-st: rgba(12, 133, 119, 0.3);
    left: 50%;
    /* 将左侧位置设置为 50% */
    transform: translate(-50%);
    /* 使用 transform 将元素水平和垂直居中 */
    width: 100%;
    max-width: 60%;
    border-collapse: collapse;
    margin-top: 60px;
    margin-bottom: 60px;
    min-height: 100vh;
}

.add-favorite-wrapper {
    position: absolute;
    bottom: 30%;
    right: 30%;
    z-index: 20;
}

.card {
    width: 100%;
    margin: 0 auto 60px;
    padding: 1rem 0;
    display: grid;
    grid-template-areas: "top" "bottom";
    grid-template-rows: auto 1fr;
    border-radius: .75rem;
    background: var(--bc-al);
    color: var(--white);
    backdrop-filter: blur(14px);
    box-shadow: 0 15px 30px -15px var(--bc-al);
    isolation: isolate;
}

.circle-1 {
    position: absolute;
    content: '';
    width: 8rem;
    height: 8rem;
    left: 0rem;
    top: 35%;
    transform: translate(-50%);
    background-color: var(--bc-al);
    border-radius: 50%;
}

.circle-2 {
    position: absolute;
    content: '';
    width: 6rem;
    height: 6rem;
    right: -3rem;
    top: 20%;
    background-color: var(--bc-al);
    border-radius: 50%;
}

.circle-3 {
    position: absolute;
    content: '';
    width: 5rem;
    height: 5rem;
    right: -4rem;
    top: 55%;
    background-color: var(--bc-st);
    border-radius: 50%;
}

.top {
    padding: .5rem 4rem;
    z-index: 10;
}

.bottom {
    z-index: 10;
    padding-bottom: 10px;
}

.properties {
    width: 100%;
    /* 添加此行 */
    display: flex;
    flex-direction: column;
    padding: .5rem 0;
}

.property {
    padding: .75rem 4rem;
    display: grid;
    grid-template-columns: 20% 80%;
    gap: .1rem;
    flex-direction: column;
    align-items: center;
    font-size: 1.1rem;
    border-bottom: 1px solid var(--bc-al);
    position: relative;
}

.property:hover {
    background: linear-gradient(82.3deg,
    rgb(0, 190, 168) 10.8%,
    rgba(35, 137, 220, 0.8) 94.3%);
}

.property:nth-last-child(1) {
    border-bottom: none;
}

.property::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    left: 1.75rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--white);
    border-radius: 50%;
}

.label {
    font-weight: 700;
    font-style: italic;
}

.content {
    opacity: .8;
}

.u-l {
    font-size: 1.5rem;
    font-weight: 700;
    font-style: normal;
}
</style>
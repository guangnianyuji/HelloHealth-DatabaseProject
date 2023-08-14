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
          <i v-if="!is_Collected" class="fi fi-rr-star" style="color: white;" @click="collect">
            {{ items.find((item) => item.id ==="medicine_collection_num").content }}
          </i>
          <i v-else class="fi fi-sr-star" style="color: white;" @click="unCollect">
            {{ items.find((item) => item.id ==="medicine_collection_num").content }}
          </i>
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
            <span class="content">{{ item.content || "-" }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "MedicineCard",

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
        label: "参考报价",
        content: null,
        span: 1,
      },
      {
        id: 'medicine_collection_num',
        label: "收藏总数",
        content: null,
        span: 1,
      },
    ]);

    const medicineId = ref(null); // 使用 ref 来包装 medicineId
    const collectionNum = ref(null); // 使用 ref 来包装 collectionNum
    medicineId.value = items.find((item) => item.id ==="medicine_id").content
    collectionNum.value = items.find((item) => item.id ==="medicine_collection_num").content

    const isLogin = ref(false);
    const userInfo = reactive({
      user_id: 123456,
    });

    const router = useRouter();

    const collect = () => {
      //判断是否登录
      if (!isLogin.value) {
        //若未登录
        ElMessage({
          message: "请先登录",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        // TODO 之后此处需记录当前页面路径，以便于登陆完成后跳转
        this.$router.push({
          path: "/login",
          query: { redirect: router.currentRoute.value.fullPath },
        });
      } else {
        axios
          .post(
            `/api/Medicine/addCollection?user_id=${userInfo.user_id}&medicine_id=${medicineId.value}`
          )
          .then((res) => {
            console.log(res);
            if (res.data.errorCode === 200) {
              is_Collected.value = res.data.data.status;
              collectionNum.value = res.data.data.medicine_collection_num;
              // 收藏添加成功
              console.log("收藏添加成功！");
              items.find((item) => item.id === "medicine_collection_num").content += 1; // 增加收藏总数
              updateCollectionData(); // 更新后台数据
              is_Collected.value = true; // 设置收藏状态为已收藏
            } else {
              console.log("收藏添加失败...");
            }
          })
          .catch((errMsg) => {
            alert(
              "对id为" +
              medicineId.value +
              "的药品收藏,相关API此时未完成"
            );
            console.log(errMsg);
          });
      }
    };

    const unCollect = () => {
      axios
      .post(
            `/api/Medicine/removeCollection?user_id=${userInfo.user_id}&medicine_id=${medicineId.value}`
          )
        .then((res) => {
          if (res.data.errorCode === 200) {
            is_Collected.value = res.data.data.status;
            collectionNum.value = res.data.data.medicine_collection_num;
            // 收藏移除成功
            console.log("收藏移除成功！");
            items.find((item) => item.id === "medicine_collection_num").content -= 1; // 减少收藏总数
            updateCollectionData(); // 更新后台数据
            is_Collected.value = false; // 设置收藏状态为已收藏
          } else {
            console.log("收藏移除失败...");
          }
        })
        .catch((errMsg) => {
          alert(
            "取消对id为" +
            medicineId +
            "的药品收藏,相关API此时未完成"
          );
          console.log(errMsg);
        });
    };

    onMounted(() => {
      (async () => {
        let response = await axios.get("/api/UserInfo");

        console.log(response.data);
        if (response.data.errorCode !== 200) return;
        let responseObj = response.data.data;
        isLogin.value = responseObj.login;
        console.log(responseObj.login);
        if (!responseObj.login) return;
        userInfo.user_id = responseObj.user_id;
      })();
    });
    const is_Collected = ref(false);

    // 添加药品收藏
    const handleAddCollection = (value) => {
      if (value && !is_Collected.value) {
        // 收藏添加成功
        console.log("收藏添加成功！");
        items.find((item) => item.id === "medicine_collection_num").content += 1; // 增加收藏总数
        updateCollectionData(); // 更新后台数据
        is_Collected.value = true; // 设置收藏状态为已收藏
      } else {
        console.log("收藏添加失败...");
        // 更新相关操作
      }
    };

    // 移除药品收藏
    const handleRemoveCollection = (value) => {
      if (value && is_Collected.value) {
        // 收藏移除成功
        console.log("收藏移除成功！");
        items.find((item) => item.id === "medicine_collection_num").content -= 1; // 减少收藏总数
        updateCollectionData(); // 更新后台数据
        is_Collected.value = false; // 设置收藏状态为已收藏
      } else {
        console.log("收藏移除失败...");
        // 更新相关操作
      }
    };

    // 药品收藏数据更新
    const updateCollectionData = () => {
      // 构建请求参数
      const params = new URLSearchParams();
      params.append("user_id", userInfo.user_id);
      params.append("medicine_id", medicineId.value);
      params.append("medicine_collection_num", collectionNum.value);

      axios
        .post(
          "/api/medicine/medicineCollection/updateCollection",
          params
        )
        .then((response) => {
          // 更新成功的处理逻辑
          console.log("收藏数据更新成功");
        })
        .catch((error) => {
          // 更新失败的处理逻辑
          console.error("收藏数据更新失败", error);
        });
    }

    return {
      items,
      medicineId,
      collectionNum,
      userInfo,
      is_Collected,
      updateCollectionData,
      handleAddCollection,
      handleRemoveCollection,
      collect,
      unCollect,
    };
  },
  created() {
    this.getMedicineCard();
  },
  methods: {
    getMedicineCard() {
      const medicine_Id = this.$route.query.medicine_id;
      if (medicine_Id) {
        axios
          .post(`/api/Medicine/medicineCard?medicine_id=${medicine_Id}`)
          .then((res) => {
            const response = res.data;
            if (response.errorCode === 200) {
              const medicineData = response.medicine_data;
              this.items.forEach((item) => {
                item.content = medicineData[item.id] || "-";
              });
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
  },//end of methods
}

</script>

<style scoped>
.wrapper {
  position: absolute;
  --white: #e3e3e3;
  --bc: rgba(15, 70, 115, 0.6);
  --bc-al: rgba(12, 133, 119, 0.62);
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
  /* 修改为适当的宽度 */
  margin: 0 auto;
  /* 添加此行 */
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
  background-color: var(--bc-al);
  border-radius: 50%;
}

.top {
  padding: .5rem 4rem;
  z-index: 10;
}

.bottom {
  z-index: 10;
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
}</style>
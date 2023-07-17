<!--
描述：收藏按钮组件
作者：张恺瑞
-->

<template>
    <span class="AddCollection">
        <i v-if="!is_Collected" class="fi fi-rr-star" @click="collect">
            {{ collectionContent }}
        </i>
        <i v-else class="fi fi-sr-star" @click="unCollect">
            {{ collectionContent }}
        </i>
    </span>
</template>
  
<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import { ref, reactive, watch, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

export default {
    name: "AddCollection",
    setup(props, context) {
        const isLogin = ref(false);
        const userInfo = reactive({
            user_id: 123456,
        });

        const is_Collected = ref(false);
        const medicineData = reactive([
            {
                id: "medicine_id",
                label: "批准文号",
                content: ref(''),
                span: 1,
            },
            {
                id: 'medicine_collection_num',
                label: "收藏总数",
                content: ref(0), // 初始化收藏数
                span: 1,
            },
        ]);
        const collectionContent = computed(() => medicineData[1].content);


        const router = useRouter();

        //watch(isLogin, (value) => {
            // 用户登录状态变化时更新收藏信息
            //updateCollectionInfo(value);
        //});

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
                        "https://mock.apifox.cn/m1/2961538-0-default/api/medicine/medicineCollection/addCollection?user_id=" +
                        userInfo.user_id +
                        "&medicine_id=" +
                        medicineData[0].content.value
                    )
                    .then((res) => {
                        console.log(res);
                        if (res.data.errorCode === 200) {
                            is_Collected.value = res.data.data.status;
                            medicineData[1].content = res.data.data.medicine_collection_num;
                            // 触发 addCollection 事件
                            context.emit("addCollection", true, is_Collected.value);
                        } else {
                            // 触发 addCollection 事件
                            context.emit("addCollection", false, is_Collected.value);
                        }
                    })
                    .catch((errMsg) => {
                        alert(
                            "对id为" +
                            medicineData[0].content.value +
                            "的药品收藏，相关API此时未完成"
                        );
                        console.log(errMsg);
                    });
            }
        };

        const unCollect = () => {
            axios
                .post(
                    "https://mock.apifox.cn/m1/2961538-0-default/api/medicine/medicineCollection/removeCollection?user_id=" +
                    userInfo.user_id +
                    "&medicine_id=" +
                    medicineData[0].content.value
                )
                .then((res) => {
                    if (res.data.errorCode === 200) {
                        is_Collected.value = res.data.data.status;
                        medicineData[1].content = res.data.data.medicine_collection_num;
                        // 触发 removeCollection 事件
                        context.emit("removeCollection", true);
                    } else {
                        // 触发 removeCollection 事件
                        context.emit("removeCollection", false);
                    }
                })
                .catch((errMsg) => {
                    alert(
                        "取消对id为" +
                        medicineData[0].content.value +
                        "的药品收藏，相关API此时未完成"
                    );
                    console.log(errMsg);
                });
        };

        /*
        const updateCollectionInfo = (isLogin) => {
            if (isLogin.value) {
                axios
                    .get(
                        "https://mock.apifox.cn/m1/2961538-0-default/api/medicine/medicineCollection?user_id=" +
                        userInfo.user_id +
                        "&medicine_id=" +
                        medicineData[0].content.value
                    )
                    .then((res) => {
                        console.log(res);
                        medicineData[1].content = res.data.data.medicine_collection_num;
                        is_Collected.value = res.data.data.status;
                    })
                    .catch((errMsg) => {
                        console.log(errMsg);
                    });
            } else {
                axios
                    .get(
                        "https://mock.apifox.cn/m1/2961538-0-default/api/medicine/medicineCollection?user_id=" +
                        userInfo.user_id +
                        "&medicine_id=" +
                        medicineData[0].content.value
                    )
                    .then((res) => {
                        medicineData[1].content = res.data.data.medicine_collection_num;
                        is_Collected.value = false;
                    })
                    .catch((errMsg) => {
                        console.log(errMsg);
                    });
            }
        };
        */

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

                // 获取路由参数中的 medicine_id
                const medicineId = router.currentRoute.value.query.medicine_id;
                medicineData[0].content = ref(medicineId || '');

                // 更新收藏信息
                //updateCollectionInfo(isLogin.value);
            })();
        });

        return {
            medicineData,
            is_Collected,
            collectionContent,
            collect,
            unCollect,
        };
    },

};
</script>
  
<style scoped>
i {
    color: white;
}
</style>
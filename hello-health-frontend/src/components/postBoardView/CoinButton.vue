<template>
    <div class="wrapper" @click="coinIn">
        <el-tooltip class="box-item" placement="top" content="投币">
            <i class="fi fi-rr-usd-circle centerIcon" v-if="!is_coined"></i>
            <i class="fi fi-sr-usd-circle centerIcon" v-else></i>
        </el-tooltip>
        <span>
            {{coin_num}}
        </span>
    </div>
</template>

<style scoped>
.wrapper{
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
}

.wrapper:hover{
    color: var(--el-color-primary);
}
</style>

<script>
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import axios from "axios";

import globalData from "@/global/global"
export default {
    props:{
        comment_id: Number,
        coinInfo: Object
    },
    data: () =>
        ({
            is_coined: false,
            coin_num: 0,
        }),
    methods:
        {
            coinIn() {

                if (!globalData.login) {
                    ElMessage.error('请先登录再参与讨论。')
                    return;
                }

                this.changeCoin(1);
            },
            changeCoin(op) {//op为0，只查询；op为1 要操作
                let coinValue = 0;//投币数
                let coin_status = true;//如果投币，投币状态成功或失败

                if (op === 1)//有操作，则弹出框设置投币数
                {
                    ElMessageBox.prompt('输入杏仁币枚数', '投币', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern:
                            /^[1-9]\d*$/,
                        inputErrorMessage: '投币数为大于0的整数',
                    })
                        .then(({value}) => {
                            coinValue = value;
                            axios.post("/api/Forum/Coin", {
                                operate: op,
                                comment_id: this.comment_id,
                                coin_value: coinValue
                            })
                                .then((res) => {
                                   
                                    this.is_coined = res.json.status;
                                    this.coin_num = res.json.comment_coin_num;
                                    console.log(this.coin_num)
                                    ElMessage({
                                        message: "投币成功！",
                                        type: "success",

                                    })
                                }).catch(error => {
                                    if(error.network) return false;
                                    switch (error.errorCode){
                                        case 116:
                                            ElMessage.error("币数不足，投币失败！")
                                            break;
                                        case 111:
                                            ElMessage.error("不能给自己投币！")
                                            break;
                                        default:
                                            error.defaultHandler("投币失败")
                                    }
                            })

                        }).catch(()=>{})
                }

                // op为0代表不操作，只重新获取硬币数
                // axios.post("/api/Forum/Coin", {
                //     operate: op,
                //     comment_id: this.comment_id,
                //     coin_value: coinValue
                // }).then((res) => {
                //     this.is_coined = res.data.data.status;
                //     this.coin_num = res.data.data.comment_coin_num;
                //     coin_status = res.data.data.coin_status;//投币是否成功
                // })


            }
        },

    created() {
        this.is_coined = this.coinInfo.status;
        this.coin_num = this.coinInfo.num;
    }

}
</script>

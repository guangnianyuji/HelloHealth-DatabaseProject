<template>
    <div class="PB_title">
        <div>
            <el-row >
                <el-col :span="20">
                    <div class="forum-title title-with-line" >
                        HH论坛
                    </div>

                </el-col>

                <el-col :span="4">
                    <img alt="" src="../assets/10.png" style="height: 100px">
                </el-col>
            </el-row>
        </div>

        <div class="post_field">
            <el-tabs
                v-model="type_sort.type"
                class="demo-tabs"

                @tab-click="sortSwitcher">
                <el-tab-pane  label="最新论坛" name="Time"> </el-tab-pane>
                <el-tab-pane  label="最热论坛" name="Heat"> </el-tab-pane>
            </el-tabs>

            <el-row v-if="post_list">
                <el-col :span="8" v-for="post in post_list" :key="post">
                    <post-card :post_info="post" style="margin-left:10% ;margin-right:10% ;margin-bottom: 15%;"></post-card>
                </el-col>
            </el-row>
        </div>


    </div>

    <el-dialog
        v-model="dialogVisible"
        title="这是个编辑框~"
        width="30%"
    >
        <span>编辑框放这里~</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
        </template>
    </el-dialog>

    <WritePostButton  @click="openPostEditor" v-if="gdata.login"></WritePostButton>
</template>

<style scoped>
.post_field {
    margin-bottom: 3%;
    /*border-radius: 28px;*/
}
/*起不了作用，切换栏不能变大小
{
  padding: 32px;
  color: #6b778c;
  font-size: 100px !important;
  font-weight: 600;
}*/
.PB_title {
    font-size: 20px;
    color: #000000;
    margin-left: 8.5%;
    padding-top: 20px;
    margin-right: 8.5%;
}
.forum-title {
    position: relative;
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

<script>
import PostCard from "../components/postBoardView/PostCard.vue"
import axios from "axios";
import {reactive} from 'vue'
import WritePostButton from "@/components/postBoardView/WritePostButton.vue";
import globalData from "@/global/global";
import {ElMessage} from "element-plus";
export default{
    components:
        {
            WritePostButton,
            PostCard,
        },

    data:()=> (
        {
            type_sort: reactive({
                type: "Time",
            }) ,//之前选择的类型
            dialogVisible: false,
            post_list: [],
            gdata: globalData
        }),
    methods:
        {
            sortSwitcher ( res) {
                console.log(res.paneName );
                if(res.paneName===this.type_sort.type){
                    return;
                }
                this.type_sort.type=res.paneName;
                this.sortBy();
            },
            sortBy(){
                axios
                    .post("/api/Post/SortBy", this.type_sort)
                    .then((res)=> {
                        this.post_list= res.data.data.post_list;
                    })
                    .catch((errMsg) => {
                        console.log(errMsg);
                        this.loading = false;
                    });
            },
            openPostEditor() {
                if(!globalData.login){
                    ElMessage.error('请先登录再参与讨论。')
                    return;
                }
                this.dialogVisible = true
            }
        },
    created(){
        this.sortBy();
    }
}

</script>

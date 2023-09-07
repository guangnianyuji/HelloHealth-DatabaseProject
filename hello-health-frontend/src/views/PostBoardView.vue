<template>
    <div class="PB_title">
        <div>
            <el-row >
                <el-col :span="20">
                    <div class="viewTitle tracking-in-expand" >
                        HH论坛
                    </div>
                </el-col>

                <el-col :span="4">
                    <img class="fade-in-fwd" alt="" src="/static/10.png" style="height: 100px">
                </el-col>
            </el-row>
        </div>

        <div class="post_field">
            <el-tabs
                v-model="type_sort.type"
                class="demo-tabs"

                @tab-click="sortSwitcher">
                <el-tab-pane  label="论坛最新" name="Time"> </el-tab-pane>
                <el-tab-pane  label="论坛最热" name="Heat"> </el-tab-pane>
            </el-tabs>

            <el-row v-if="post_list">
                <el-col :span="8" v-for="post in page_post_list" :key="post">
                    <post-card :post_info="post" style="margin-left:10% ;margin-right:10% ;margin-bottom: 15%;"></post-card>
                </el-col>
            </el-row>
        </div>
         
        <div style="margin-left: 30%;margin-bottom: 10%;">
            <el-pagination background  @current-change="currentChange"
                 :page-size="postsPerPage"
                layout="total, prev, pager, next, jumper" :total="post_list.length"
                v-model="currentPage">
            </el-pagination>
        </div>
         
    </div>

    <el-dialog
        v-model="dialogVisible"
        class="editorDialog"
        modal-class="editorDialogModal"
        title="发布帖子"
        width="70%"
        top="0"
    >
        <el-form label-width="50px" label-position="left" :model="newPostInfo">
            <el-form-item label="标题">
                <el-input v-model="newPostInfo.title" />
            </el-form-item>
            <el-form-item label="悬赏">
                <el-radio-group v-model="newPostInfo.is_bounty">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
                <el-form-item label="赏金" class="bountyLabel" v-if="newPostInfo.is_bounty">
                    <el-input v-model="newPostInfo.bounty_value" type="number" min="0" step="1"/>
                </el-form-item>
            </el-form-item>
            <el-form-item label="标签">
                <el-select
                    class="tagSelector"
                    v-model="newPostInfo.tags"
                    multiple
                    placeholder="选择2~4个标签"
                    style="width: 240px"
                    :allow-create="true"
                    :filterable="true"
                    :multiple-limit="4"
                >
                    <el-option
                        v-for="item in tags"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <TipTapEditable ref="editor"/>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="submitNewPost">
                    发布
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

.bountyLabel{
    margin-left: 30px;
}

.tagSelector{
    width: 100% !important;
}

.viewTitle {
    margin-top: 20px;
    background-image: linear-gradient(96.14deg,
            rgba(0, 191, 168, 1) 0%,
            #0093bf 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    text-align: left;
    font: 600 32px "Poppins", sans-serif;
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

<script>
import PostCard from "../components/postBoardView/PostCard.vue"
import axios from "axios";
// import reactive from 'vue'
import WritePostButton from "@/components/postBoardView/WritePostButton.vue";
import globalData from "@/global/global";
import {ElMessage} from "element-plus";
import TipTapEditable from "@/components/postView/TipTapEditable.vue";
export default{
    components:
        {
            TipTapEditable,
            WritePostButton,
            PostCard,
        },

    data:()=> (
        {
            type_sort: {
                type: "Time",
                number: -1,
                 
                // TODO: 加个页号选择

            } ,//之前选择的类型
            postsPerPage:9,
            currentPage:1,
            dialogVisible: false,
            post_list: [],
            page_post_list:[],
            gdata: globalData,
            newPostInfo:{
                title:"",
                is_bounty: false,
                bounty_value: 0,
                content: "",
                tags: []
            },
            tags:[],
        }),
    methods:
        {
            changePagePost(){
                let start = (this.currentPage - 1) * this.postsPerPage;
                let end = start + this.postsPerPage;
             
                this.page_post_list=this.post_list.slice(start, end);
              
            },
            currentChange(val) {
            this.currentPage = val; // 更新当前页码
            this.changePagePost();
            },
            sortSwitcher ( res) {
                console.log(res.paneName );
                if(res.paneName===this.type_sort.type){
                    return;
                }
                this.type_sort.type=res.paneName;
                this.currentPage=1;
                this.sortBy();
            },
            sortBy(){
                axios.post("/api/Forum/SortBy", this.type_sort)
                    .then((res)=> {
                        this.post_list= res.json.post_list;
                        this.tags = res.json.tags;
                        this.changePagePost();
                    })
                    .catch((error) => {
                        if(error.network) return;
                        error.defaultHandler("加载帖子出错");
                    });

            },
            openPostEditor() {
                if(!globalData.login){
                    ElMessage.error('请先登录再参与讨论。')
                    return;
                }
                  
                if(globalData.locked){
                    ElMessage.error('抱歉，您的账号已经被封禁！')
                    return;
                }

                this.dialogVisible = true
            },

            async submitNewPost() {
                if(this.$refs.editor.editor.state.doc.textContent.length < 15) {
                    ElMessage.error('请输入更多内容。');
                    return;
                }
                if(this.newPostInfo.title.length < 5) {
                    ElMessage.error('请输入更长的标题。');
                    return;
                }
                if(this.newPostInfo.tags.length < 2) {
                    ElMessage.error('请选择更多标签。');
                    return;
                }
                if(this.newPostInfo.is_bounty &&(parseInt(this.newPostInfo.bounty_value) <= 0 || Math.floor(parseFloat(this.newPostInfo.bounty_value))!==parseInt(this.newPostInfo.bounty_value))) {
                    ElMessage.error('请输入正数整悬赏值。');
                    return;
                }
                this.newPostInfo.content = JSON.stringify(this.$refs.editor.editor.getJSON())
                axios.post("/api/Forum/SendPost",this.newPostInfo).then( res =>{
                    ElMessage.success('发送成功，请等待审核通过。');
                    this.dialogVisible = false;
                    this.$refs.editor.editor.commands.clearContent();
                    this.newPostInfo = {
                        title:"",
                        is_bounty: false,
                        bounty_value: 0,
                        content: "",
                        tags: []
                    }
                }).catch(error => {
                    if(error.network) return;
                    error.defaultHandler("发送失败");
                })

            }
        },
    created(){
        this.sortBy();
    }
}

</script>

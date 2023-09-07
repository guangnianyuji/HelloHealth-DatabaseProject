<template>

    <el-card class="card-wrapper"
             shadow="never">
        <div style="height: 250px">
            <img alt="" :src="post_info.post_pic" class="card_image" @click="goDetail"/>
        </div>
        <!--
       <img v-else
           src="/static/loading.gif"
           class="image"
           />
         -->
        <!--显示标签 -->
        <div style="padding: 14px">
            <div class="post-tag-bar">
                <el-tag type="success" size="small" v-for="tag in post_info.post_tag">{{ tag }}</el-tag>
            </div>
        </div>
        <div style="height: 85px">
            <!--显示帖子名称-->
            <div class="card_title" @click="goDetail">
                <span>{{ PostTitleSummary(post_info.post_title) }}</span>
            </div>
        </div>
        <div style="height: 40px">
            <!--显示发帖人-->
            <section class="card_author">
                <el-row align="middle" style="margin-left:5%;">
                    <el-col :span="10" style="display: flex; align-items: center">
                        <el-avatar :size="25" :src="post_info.author_portrait" style="margin-right: 5px"></el-avatar>
                        <span class="card_author">
                        {{ post_info.author_name }}
                    </span>
                    </el-col>
                    <!--ref是为了在创建时能执行语句，不是用来绑定引用-->
                    <el-col :span="6">
                        <like-button :comment_id="post_info.post_first_comment_id" :likeInfo="post_info.reward.like"/>
                    </el-col>
                    <el-col :span="6">
                        <coin-button :comment_id="post_info.post_first_comment_id" :coinInfo="post_info.reward.coin"/>
                    </el-col>
                </el-row>
            </section>
        </div>
    </el-card>

</template>

<style>
.card_image {
    object-fit: cover;
    height: 100%;
    width: 100%;
    cursor: pointer;
}

.card_title {
    font-size: x-large;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
    transition: 0.3s ease;
    cursor: pointer;
}

.card_title:hover {
    color: var(--el-color-primary)
}

.card_author {
    display: inline;
    text-align: center;
    font-size: medium;
}

.post-tag-bar {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    margin: -3px -3px;
}

.post-tag-bar > * {
    margin: 3px;
}

.card-wrapper .el-card__body {
    padding: 0 !important;
    margin-bottom: 10px;
//height: 200px;
}

.card-wrapper {
    transition: 0.3s ease;
}

.card-wrapper:hover {
    box-shadow: 0 6px 6px rgba(36, 37, 38, .1);
    transform: translateY(-2px);
}

</style>

<script>
import LikeButton from "./LikeButton.vue";
import CoinButton from "./CoinButton.vue";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
    components:
        {
            LikeButton,
            CoinButton,
            ElMessage,
        },
    props: ["post_info"],
    watch:
        {
            post_info: function (newData) {
                this.comment_id = newData.post_first_comment_id;
            }
        },
    data: () =>
        ({
            comment_id: 0,//这个帖子的一楼评论，帖子内容本身
            post_id: 0,
        }),
    methods:
        {
            goDetail() {
                router.push({
                    path: "/forum/" + this.post_info.post_id,
                });
            },
            //防止标题过长
            PostTitleSummary(title) {
                if (title.length < 10) {
                    return title;
                } else {
                    return title.slice(0, 12) + "...";
                }
            }
        },
    created() {

    }
}
</script>
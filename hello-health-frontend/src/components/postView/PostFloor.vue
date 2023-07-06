<script setup>
//显示帖子的一个楼层

import UserInfoCard from "@/components/UserInfoCard.vue";
import LinkButtonWithIcon from "@/components/LinkButtonWithIcon.vue";
import FloorComment from "@/components/postView/FloorComment.vue";

const prop = defineProps(['authorUserInfo'])
</script>

<template>
    <div class="floorWrapper">
        <div class="userInfoWrapper">
            <div class="header">
                <UserInfoCard :src="authorUserInfo.avatarUrl" :user-name="authorUserInfo.userName" :group-id="authorUserInfo.groupId"></UserInfoCard>
                <el-button type="primary">
                    <i class="fi fi-rr-plus addIcon"></i><span> 关注</span>
                </el-button>
            </div>
            <div class="info">
                <div><p>粉丝</p><p>8</p></div>
                <div><p>关注</p><p>6</p></div>
            </div>

        </div>
        <div class="contentWrapper">
            <div class="title">Title Text Here</div>
            <!-- 这里得换成TipTap的readonly编辑器!，现在仅作展示-->
            <div class="content">
                1. 布局<br>
                1-1 两侧定宽，中间自适应<br>
                浮动 左侧设置左浮动，右侧设置右浮动即可，中间会自动地自适应。<br>
                绝对定位 左侧设置为绝对定位， left：0px。右侧设置为绝对定位， right：0px。中间设置为绝对定位，left 和 right 都为 300px，即可。中间的宽度会自适应。<br>
                flexbox布局 将左中右所在的容器设置为 display: flex，设置两侧的宽度后，然后让中间的 flex = 1，即可。<br>
                <img src="@/assets/logo.png"><br>
                表格布局 设置整个容器的宽度为 100%，设置三个部分均为表格(display:table-cell)，然后左边的单元格为 300px，右边的单元格为 300px，即可。中间的单元格会自适应。<br>
                网格布局grid 设置容器为网格布局，宽度为 100%，设置网格为三列，并设置每列的宽度，即可。<br>
                ————————————————<br>
                版权声明：本文为CSDN博主「宇六岁鸭」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。<br>
                原文链接：https://blog.csdn.net/weixin_60364883/article/details/123036560<br>
            </div>
            <div class="contentStatus">
                <div class="time">
                    2023年7月6日
                </div>
                <div class="rewards">
                    点赞 投币 收藏 回复组件放这里

                </div>
            </div>
            <div class="commentsHolder">
                <FloorComment :user-info="authorUserInfo">sddsfdsfsfdsfdsdsfdsfdsf</FloorComment>
                <FloorComment :user-info="authorUserInfo">sddsfdsfsfdsfdsdsfdsfdsf</FloorComment>
                <FloorComment :user-info="authorUserInfo">sddsfdsfsfdsfdsdsfdsfdsf</FloorComment>
            </div>
        </div>
    </div>
</template>

<style scoped>
.floorWrapper{
    display: flex;
    flex-direction: row;

    width: 100%;
    justify-items: stretch;
    margin-bottom: 10px;
}

.floorWrapper>*{
    box-shadow: 0 3px 3px rgba(36,37,38,.05);
    border-radius: 3px;
}

.userInfoWrapper{
    flex: 1;
    padding: 15px;
    background-color: #fff;
    height: 150px;
    min-height: 150px;
    box-sizing: border-box;
    margin-right: 10px;
}

.userInfoWrapper .header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 10px;

}

.userInfoWrapper .info{
    display: flex;
    flex-direction: row;
    height: 50px;
    align-items: center;
}

.userInfoWrapper .info>*{
    flex: 1;
    text-align: center;
    line-height: 1.5em;
}
.addIcon{
    margin-right: 5px;
}

.contentWrapper{
    min-height: 150px;
    background-color: #fff;
    flex:3;
    padding: 20px;
    box-sizing: border-box;
}

.title{
    font-weight: bold;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px #ccc solid;
    font-size: 1.5em;
}

.content {
    line-height: 1.7em;
}

.contentStatus {
    display: flex;
    justify-content: space-between;
    margin:10px 0;
    color: #999;
}



.rewards{
    display: flex;
    flex-direction: row;
}

.rewards>*{
    margin: 0 5px
}

</style>
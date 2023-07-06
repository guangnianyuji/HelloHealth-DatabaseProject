<script setup>
//显示帖子的一个楼层，首先检测title是否存在，存在才会去显示悬赏信息
// position: sticky这个属性特别好玩，各位可以试一试
import UserInfoCard from "@/components/UserInfoCard.vue";
import FloorComment from "@/components/postView/FloorComment.vue";

const prop = defineProps({
    floorInfo:Object,
    title:String,
    isBounty:Boolean,
    bountyValue:Number,
    solution:Number
})
</script>

<template>
    <div class="floorWrapper">
        <div class="userInfoWrapper">
            <div class="header">
                <UserInfoCard :user-info="floorInfo.author"></UserInfoCard>
                <el-button type="primary">
                    <i class="fi fi-rr-plus addIcon"></i><span> 关注</span>
                </el-button>
            </div>
            <div class="info">
                <div><p>粉丝</p><p>{{floorInfo.author.follower}}</p></div>
                <div><p>关注</p><p>{{floorInfo.author.follows}}</p></div>
            </div>

        </div>
        <div class="contentWrapper">
            <div v-if="title" class="title">{{title}}</div>
            <el-tag v-if="title && isBounty && solution !== -1" class="bountyTag">赏金{{bountyValue}}杏仁币，点击查看最佳答案。</el-tag>
            <el-tag v-if="title && isBounty && solution === -1" class="bountyTag" type="warning">正在进行悬赏！赏金{{bountyValue}}杏仁币。</el-tag>
            <!-- 这里得换成TipTap的readonly编辑器!，现在仅作展示-->
            <div class="content">
                {{floorInfo.content}}
            </div>
            <div class="contentStatus">
                <div class="time">
                    {{floorInfo.post_time}}
                </div>
                <div class="rewards">
                    点赞 投币 收藏 回复组件放这里
                    {{JSON.stringify(floorInfo.reward_count)}}
                </div>
            </div>
            <div class="commentsHolder">
                <FloorComment v-for="item in floorInfo.comments" :comment-info="item"></FloorComment>
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
    position: sticky;
    flex: 1;
    top: 0;
    padding: 15px;
    background-color: #fff;
    height: 150px;
    min-height: 150px;
    box-sizing: border-box;
    margin-right: 10px;
    width: 300px;
    max-width: 300px;
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

.bountyTag{
    font-size: 1em;
    padding: 5px 10px;
    box-sizing: content-box;
    margin-bottom: 10px;
}

</style>
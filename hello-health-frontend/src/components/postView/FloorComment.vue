<script setup>
import UserInfoCard from "@/components/UserInfoCard.vue";

defineProps(['commentInfo'])
</script>

<template>
<div class="commentWrapper">
    <UserInfoCard :user-info="commentInfo.author"></UserInfoCard>
    <div class="content">
        {{commentInfo.content}}
    </div>
    <div class="reward_info">
        {{JSON.stringify(commentInfo.reward_count)}}
    </div>
</div>
</template>

<style scoped>
.commentWrapper{
    padding-top: 10px;

    border-top: 1px solid #ccc;
    margin-bottom: 10px;
}
.content{
    padding-left: 60px;
    font-size: 0.9em;
    line-height: 1.6em;
    color: #222;
}
</style>
<script setup>
import UserInfoCard from "@/components/UserInfoCard.vue";

defineProps(['userInfo','content'])
</script>

<template>
<div class="commentWrapper">
    <UserInfoCard :user-name="userInfo.userName" :group-id="userInfo.groupId" :src="userInfo.avatarUrl"></UserInfoCard>
    <div class="content">
        <slot></slot>
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
}
</style>
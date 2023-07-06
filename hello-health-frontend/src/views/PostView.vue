<script setup>

import UserInfoCard from "@/components/UserInfoCard.vue";
import PostUserCard from "@/components/postView/PostUserCard.vue";
import PostFloor from "@/components/postView/PostFloor.vue";
const userInfo = {
    avatarUrl: "/src/assets/101933351.jpg",
    userName: "UserNameHere",
    groupId: "normal"
}
</script>

<template>
    <div class="viewWrapper">
        <post-floor :author-user-info="userInfo"></post-floor>
        <post-floor :author-user-info="userInfo"></post-floor>
    </div>
</template>

<style scoped>
.viewWrapper{
    width: 80%;
    margin: 0 auto;
}
</style>
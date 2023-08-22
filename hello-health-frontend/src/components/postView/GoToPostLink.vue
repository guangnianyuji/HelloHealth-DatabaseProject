<script setup>
import globalData from "@/global/global";
const props = defineProps({
    post_id: Number,
    floor_number:Number
})
const goOriginPost = () => {
    window.open(`${globalData.userWebsite}/forum/${props.post_id}?floor=${props.floor_number}`)
}
</script>

<template>
    <el-button class="visitPostButton" round @click="goOriginPost">
        <span class="iconWrapper"><span>查看原帖</span>
         <i class="fi fi-rr-angle-small-right arrow centerIcon"></i></span>
    </el-button>
</template>

<style scoped>


.visitPostButton{
    margin-left: 10px;
}

.visitPostButton .arrow{
    margin-left: 0;
    transition: 0.3s ease;
}

.visitPostButton:hover .arrow{
    margin-left: 2px;
}

.visitPostButton .iconWrapper{
    display: flex;
    align-items: center;
    user-select: none;
}
</style>
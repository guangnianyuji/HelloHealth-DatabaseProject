<template>
    <span class="like">
        <i v-if="!isCollection" class="fi fi-rr-star" :key="'star-unselected'">
            {{ blogData.f_collection_sum }}
        </i>
        <i v-else class="fi fi-sr-star" :key="'star-selected'">
            {{ blogData.f_collection_sum }}
        </i>
    </span>
</template>
  
<script>
export default {
    name: "AddCollection",
    data() {
        return {
            isCollection: false,
            blogData: {
                f_collection_sum: 0 // 初始化收藏数为0
            },
        };
    },
};
</script>
  
<style scoped>
i {
    color: white;
}
</style>
  
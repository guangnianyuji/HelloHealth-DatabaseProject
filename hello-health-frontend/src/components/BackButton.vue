<template>
    <button class="back-button" @click="goBack">
        <span class="button-content">返回</span>
    </button>
</template>
  
<script>
export default {
    name: "BackButton",
    methods: {
        goBack() {
            this.$router.go(-1);//返回上一层// 添加返回功能
        },
    },
}
</script>
  
<style scoped>
.back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    overflow: hidden;
    height: 2rem;
    padding: 0 2rem;
    border-radius: 1.5rem;
    background: #3d3a4e;
    background-size: 400%;
    color: #fff;
    border: none;
    z-index: 999;
}

.back-button:hover::before {
    transform: scaleX(1);
}

.button-content {
    position: relative;
    z-index: 1;
}

.back-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    width: 100%;
    height: inherit;
    border-radius: inherit;
    background: linear-gradient(82.3deg,
            rgb(169, 232, 205) 10.8%,
            rgb(103, 195, 252) 94.3%);
    transition: all 0.475s;
}
</style>
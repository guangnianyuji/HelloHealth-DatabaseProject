<script setup>

</script>

<template>
    <div class="writeFloorButton">
        <i class="fi fi-sr-feather"></i>
    </div>
</template>

<style scoped>
.writeFloorButton{
    position: absolute;
    right: 7.5%;
    bottom: 100px;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    background-color: var(--el-color-primary);
    color: #fff;
    font-size: 25px;
    box-shadow: 0 6px 15px rgba(36,37,38,.2);
    text-align: center;
    line-height: 75px;
    cursor: pointer;
}

.writeFloorButton:hover{
    background-color: var(--el-color-primary-light-2);
}
</style>
<script setup>

import {Search} from "@element-plus/icons-vue";
</script>

<template>
<div class="searchBox">
    <input placeholder="搜索">
    <i class="icon fi fi-br-search"></i>
</div>
</template>

<style scoped>
.searchBox{
    display: flex;
    justify-items: center;
    align-items: center;
    width: 200px;
    height: 30px;
    box-sizing: border-box;
    border-radius: 15px;
    background-color: #fff;
    padding: 5px 15px 5px 15px;
}

.searchBox input{
    width: 150px;
    height: 20px;
    outline: none;
}

.searchBox .icon{
    margin-left: 8px;
    color: #00bfa8;
    height: 1em;
    width: 1em;
}
</style>
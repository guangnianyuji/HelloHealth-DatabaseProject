<script setup>
import {ref} from "vue";

const emit = defineEmits(['searchStart'])

const searchInput = ref()
const emitSearchStart = () => {
    if(searchInput.value.value==="") return
    emit('searchStart',searchInput.value.value)
}

</script>

<template>
<div class="searchBox">
    <input ref="searchInput" placeholder="搜索"  v-on:keyup.enter="emitSearchStart">
    <i class="icon fi fi-br-search" @click="emitSearchStart"></i>
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
    font-size: 10px;
}

.searchBox .icon{
    margin-left: 8px;
    color: #00bfa8;
    height: 1em;
    width: 1em;
    cursor: pointer;
}
</style>
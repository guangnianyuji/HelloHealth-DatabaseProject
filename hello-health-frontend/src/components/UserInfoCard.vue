<script setup>
//这是个展示用户的头像、用户名、用户组的组件，具体参考首页左上角
// groupName和groupId选一个即可，两者都有选择groupName
const props = defineProps({
    src: String,
    userName: String,
    groupName: String,
    groupId: String,
    showAvatarBorder: Boolean
})

let userGroupNameDict = {
    "none": "点击登录",
    "normal": "普通用户",
    "doctor": "医生"
}

</script>

<template>
    <div class="avatarHolder">
        <el-avatar class="avatar" :size="50" :src="src" :class="{showAvatarBorder: showAvatarBorder}"/>
        <div class="userInfoHolder">
            <div class="userName">{{ userName }}</div>
            <div class="userGroup">{{ typeof(groupName) == "undefined" ? userGroupNameDict[groupId] : groupName }}</div>
        </div>
    </div>
</template>

<style scoped>

.avatarHolder{
    display: flex;
    align-items: center;
    flex-direction: row;
}


.avatarHolder .avatar{
    margin-right: 10px;
}
.showAvatarBorder {
    border: 5px var(--el-color-primary-light-7) solid;
}

.avatarHolder .userName{
    font-weight: bold;
    font-size: 15px;
}

.avatarHolder .userGroup{
    font-size: 10px;
}

.userInfoHolder{
    margin-top:7px;
    line-height: 18px;
}
</style>
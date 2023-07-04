<script setup>

</script>

<template>
    <div class="logo">
        <a href="https://august-soft.com">オーガスト</a>
    </div>
    <div class="title">
        <div class="inner">
            <div class="title_container">
                <p class="title_cn">{{ title_cn }}</p>
                <p class="title_en">{{ title_en }}</p>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title_cn: 'Hello world!',
        title_en: 'Hello EN!'
    },
    data() {
        return {

        }
    }
}

</script>

<style scoped>
.logo {
    padding: 12px 0 10px 20px;
}
.logo a {
    display: block;
    width: 96px;
    height: 40px;
    background-image: url(@/assets/logo.svg);
    background-size: contain;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    font-size: 0;
    line-height: 0;
}
.title {
    width: 100%;
    height: 100px;
    padding: 25px 0;
    position: relative;
    background-image: url(@/assets/title_bk.png);
    background-position: 50% 50%;
    background-color: #4a7fc0;
    margin-bottom: 30px;
}
.title:before {
    display: block;
    position: absolute;
    width: 100%;
    height: 8px;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    content: "";
}
.inner {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
}
.title_container {
    width: 100%;
}
.inner .title_cn {
    font-size: 30px;
    font-weight: 500;
}
.inner .title_en {
    font-size: 10px;
    font-weight: 500;
}
.inner p {
    width: 100%;
    font-size: 30px;
    text-align: center;
    font-weight: 500;
    letter-spacing: 2px;
    text-shadow: 3px 4px 1px #37659e;
    color: #fff;
}
</style>
<!--
药品详情页面
作者：张恺瑞
-->

<template>
    <div class="MedicineInformationView">
        <MedicineCard />
    </div>
</template>
  
<script>
import BackButton from "@/components/BackButton.vue";
import WebLoading from "@/components/WebLoading.vue";
import MedicineCard from "@/components/MedicineCard.vue";
export default {
    name: "MedicineInformationView",
    components: { MedicineCard, WebLoading, BackButton }
}
</script>
  
<style scoped>
.MedicineInformationView {
    position: relative;
}
</style>
  
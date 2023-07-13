<template>
    <div class="MedicineInformationView">
        <BackButton />
        <WebLoading />
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
  
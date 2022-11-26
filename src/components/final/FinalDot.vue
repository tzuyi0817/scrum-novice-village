<script setup lang="ts">
import { onMounted } from 'vue';
import { flash } from '@/utils/gsap';

function flashDot() {
  flash('.final_dot_area > .dot_1');
  flash('.final_dot_area > .dot_2', 0.5);
  flash('.final_dot_area > .dot_3', 1);
  flash('.final_dot_area > .dot_4', 1.5);
  flash('.final_dot_area > .dot_5', 1.5);
  flash('.final_dot_area > .dot_6', 0.5);
  flash('.final_dot_area > .dot_7', 1);
  flash('.final_dot_area > .dot_8');
}

onMounted(flashDot);
</script>

<template>
  <div class="final_dot">
    <div class="final_dot_area items-end">
      <img src="@/assets/logo/logo_dot_blue.png" alt="" class="dot_1 -translate-x-[280%]">
      <img src="@/assets/logo/logo_dot_purple.png" alt="" class="dot_2 -translate-x-[480%]">
      <img src="@/assets/logo/logo_dot_red.png" alt="" class="dot_3 -translate-x-[330%]">
      <img src="@/assets/logo/logo_dot_yellow.png" alt="" class="dot_4 -translate-x-[430%]">
    </div>
    <div class="final_dot_area">
      <img src="@/assets/logo/logo_dot_yellow.png" alt="" class="dot_5 translate-x-[280%]">
      <img src="@/assets/logo/logo_dot_red.png" alt="" class="dot_6 translate-x-[480%]">
      <img src="@/assets/logo/logo_dot_blue.png" alt="" class="dot_7 translate-x-[330%]">
      <img src="@/assets/logo/logo_dot_purple.png" alt="" class="dot_8 translate-x-[430%]">
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.final_dot {
  @apply absolute pointer-events-none flex justify-between w-full top-10;
  img {
    @apply w-[130px];
  }
  &_area {
    @apply flex flex-col gap-7 w-1/2;
  }
}
</style>
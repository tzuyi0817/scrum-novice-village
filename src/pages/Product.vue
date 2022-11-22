<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFlagStore, useProgressStore } from '@/store';
import { gsap, showRole, showDialog } from '@/utils/gsap';
import { sleep } from '@/utils/common';

async function illustratePo() {
  await showRole('.role_box');
  await showDialog('.dialog', '.content');
}

async function init() {
  gsap.set('.role_box', { autoAlpha: 0 });
  gsap.set('.dialog', { autoAlpha: 0 });
  useFlagStore().setLoadingFlag(false);
  useProgressStore().setProgress(20);
  await sleep(1000);
  illustratePo();
}

onMounted(init);
</script>

<template>
  <div class="product">
    <div class="product_role">
      <div class="role_box">
        <img src="@/assets/role/hole.svg" alt="" class="hole">
        <img src="@/assets/role/role_po_light.png" alt="" class="light">
        <img src="@/assets/role/role_po.png" alt="" class="role">
      </div>

      <div class="dialog mx-10 mt-5 max-h-[224px]">
        <div class="title">
          <img src="@/assets/role/title_po.svg" alt="">
          <h3>PO</h3>
        </div>

        <div class="content">
          <p><span class="text-text-tint">\ 碰 /</span> 我是短衝小精靈 ， 開發 A 組的 PO 。</p>
          <p>
            <span class="text-text-tint">PO 也就是產品負責人（Product Owner）</span>
            ， 產品負責人會負責評估產品待辦清單的價值與重要性， 依序排列要執行的優先順序 ， 對齊產品目標 。 
            最後排出產品待辦清單（Product Backlog） 唷 ！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.product {
  @apply
  w-full
  h-screen
  bg-cover
  bg-[url('@/assets/bg/bg_village.png')];
  &_role {
    @apply flex pt-10;
  }
}
</style>
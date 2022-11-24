<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import { useFlagStore, useProgressStore } from '@/store';
import ScrumPo from '@/components/ScrumPo.vue';
import ProductPo1 from '@/components/product/ProductPo1.vue';
import ProductPo2 from '@/components/product/ProductPo2.vue';
import ProductPo3 from '@/components/product/ProductPo3.vue';
import ProductPo4 from '@/components/product/ProductPo4.vue';
import ProductPo5 from '@/components/product/ProductPo5.vue';
import ProductList from '@/components/product/ProductList.vue';
import useRedirect from '@/hooks/useRedirect';
import { gsap, fadeIn, fadeOut } from '@/utils/gsap';
import { sleep } from '@/utils/common';

const po = ref<InstanceType<typeof ScrumPo> | null>(null);
const list = ref<InstanceType<typeof ProductList> | null>(null);
const isShowContinue = ref(true);
const isDisabledComplete = ref(true);
const illustrate = shallowRef(ProductPo1);
const { goPage } = useRedirect();

async function init() {
  gsap.set('.frame_primary', { autoAlpha: 0 });
  gsap.set('.product_complete, .product_start', { autoAlpha: 0 });
  gsap.set('.mask, .mask_backdrop', { autoAlpha: 0 });

  useFlagStore().setLoadingFlag(false);
  useProgressStore().setProgress(17);
  po.value?.init();
  await sleep(1000);
  await po.value?.illustrate();
  await fadeIn('.frame_primary');
  window.onclick = continueDialog;
}

async function continueDialog() {
  window.onclick = null;
  illustrate.value = ProductPo2;
  isShowContinue.value = false;
  fadeOut('.frame_primary');
  await po.value?.continueDialog();
  fadeIn('.product_start');
}

async function showProductList() {
  list.value?.showList();
  await fadeOut('.product_start');
  illustrate.value = ProductPo3;
  isShowContinue.value = true;
  list.value?.education();
  await po.value?.continueDialog();
  window.onclick = educationEnd;
}

function educationEnd() {
  window.onclick = null;
  illustrate.value = ProductPo4;
  isShowContinue.value = false;
  list.value?.educationEnd();
  gsap.set('.product_complete', { autoAlpha: 1 });
  po.value?.continueDialog();
}

async function complete() {
  fadeOut('.product_complete');
  await fadeIn('.mask, .mask_backdrop');
  illustrate.value = ProductPo5;
  isShowContinue.value = true;
  po.value?.continueDialog();
  fadeIn('.frame_primary');
  window.onclick = goNext;
}

async function goNext() {
  window.onclick = null;
  await fadeOut('.product_list, .frame_primary');
  await fadeOut('.mask, .mask_backdrop');
  goPage('plan');
}

onMounted(init);
</script>

<template>
  <div class="product">
    <scrum-po ref="po" :isShowContinue="isShowContinue" class="absolute w-full top-0 z-10 pointer-events-none">
      <component :is="illustrate" />
    </scrum-po>

    <div class="w-full flex justify-center absolute top-1/2 z-10">
      <div class="frame_primary">點擊畫面任意處繼續</div>
    </div>
    <product-list ref="list" v-model:isDisabledComplete="isDisabledComplete" />
    <button class="product_start btn" @click="showProductList">準備好了</button>
    <button
      class="product_complete btn z-[4]" 
      @click="complete"
      :disabled="isDisabledComplete"
    >我完成了</button>

    <div class="mask"></div>
    <div class="mask_backdrop"></div>
  </div>
</template>

<style lang="postcss" scoped>
.product {
  @apply
  w-full
  h-screen
  bg-cover
  pt-[290px]
  bg-[url('@/assets/bg/bg_village.png')];
  &_start, .product_complete {
    @apply absolute right-10 bottom-20;
  }
}
</style>
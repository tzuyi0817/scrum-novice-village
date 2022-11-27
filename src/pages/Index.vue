<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFlagStore, useProgressStore } from '@/store';
import { gsap, fadeOut, showDialog, fadeIn } from '@/utils/gsap';
import useRedirect from '@/hooks/useRedirect';

const leafTint1 = ref<HTMLImageElement | null>(null);
const leafTint2 = ref<HTMLImageElement | null>(null);
const leafTint3 = ref<HTMLImageElement | null>(null);
const leafTint4 = ref<HTMLImageElement | null>(null);
const leafDarkT = ref<HTMLImageElement | null>(null);
const leafDarkR = ref<HTMLImageElement | null>(null);
const leafDarkL = ref<HTMLImageElement | null>(null);
const leafDarkB = ref<HTMLImageElement | null>(null);
const { goPage } = useRedirect();

async function enter() {
  await fadeOut('.index_logo');
  await moveLeafTint();
  await showDialog('.index_illustrate', '.index_illustrate > .content');
  fadeIn('.index_challenge');
}

async function challenge() {
  await fadeOut('.index_illustrate, .index_challenge', 1);
  await moveLeafDark();
  goPage('product');
}

function moveLeafTint() {
  return new Promise(resolve => {
    gsap.to(leafTint1.value, 1, { xPercent: -100, yPercent: -100 });
    gsap.to(leafTint2.value, 1, { xPercent: -100, yPercent: 100 });
    gsap.to(leafTint3.value, 1, { yPercent: -100 });
    gsap.to(leafTint4.value, 1, { xPercent: 100, yPercent: 100 });
    gsap.delayedCall(0.5, resolve);
  });
}

function moveLeafDark() {
  return new Promise(resolve => {
    gsap.to(leafDarkT.value, 1, { yPercent: -100 });
    gsap.to(leafDarkR.value, 1, { xPercent: 100 });
    gsap.to(leafDarkL.value, 1, { xPercent: -100 });
    gsap.to(leafDarkB.value, 1, { yPercent: 100 });
    gsap.delayedCall(0.5, resolve);
  });
}

function init() {
  gsap.set('.index_illustrate', { autoAlpha: 0 });
  gsap.set('.index_challenge', { autoAlpha: 0 });
  useFlagStore().setLoadingFlag(false);
  useProgressStore().setProgress(1);
}

onMounted(init);
</script>

<template>
  <div class="index">
    <img src="@/assets/bg/bg_leafDark_4_t.png" alt="" class="index_leaf top-0 left-1/2 -translate-x-1/2" ref="leafDarkT">
    <img src="@/assets/bg/bg_leafDark_3_r.png" alt="" class="index_leaf top-1/2 right-0 -translate-y-1/2" ref="leafDarkR">
    <img src="@/assets/bg/bg_leafDark_1_l.png" alt="" class="index_leaf top-1/2 left-0 -translate-y-1/2" ref="leafDarkL">
    <img src="@/assets/bg/bg_leafDark_2_b.png" alt="" class="index_leaf bottom-0 left-1/2 -translate-x-1/2" ref="leafDarkB">

    <img src="@/assets/bg/bg_leafTint_1_lt.png" alt="" class="index_leaf top-0 left-0" ref="leafTint1">
    <img src="@/assets/bg/bg_leafTint_2_lb.png" alt="" class="index_leaf bottom-0 left-0" ref="leafTint2">
    <img src="@/assets/bg/bg_leafTint_3_t.png" alt="" class="index_leaf top-0 left-1/2 -translate-x-1/2" ref="leafTint3">
    <img src="@/assets/bg/bg_leafTint_4_rb.png" alt="" class="index_leaf bottom-0 right-0 small" ref="leafTint4">

    <div class="index_logo">
      <img src="@/assets/logo/logo_hole.png" alt="" class="w-1/2 translate-x-1/2">
      <h2 class="absolute text-white bottom-[23.5%] left-[41%]">深入敏捷の村一探究竟</h2>
      <button class="btn absolute bottom-[11%] left-[45.3%]" @click="enter">進入村莊</button>
    </div>

    <div class="index_illustrate dialog">
      <h3 class="title">(謎之音)</h3>

      <div class="content">
        <h3 class="font-normal">
          呦呼 ， 歡迎進入 
          <span class="text-text-tint">「SCRUM 新手村」</span> 
          ， 在正式加入專案開發之前 ，需要請你先了解 Scrum 的流程與精神 ！
        </h3>
        <h3 class="font-normal mt-10">請接受挑戰任務 ， 成功通過 Scrum 新手村的挑戰任務吧～</h3>
      </div>
    </div>

    <button class="index_challenge btn" @click="challenge">接受挑戰</button>
  </div>
</template>

<style lang="postcss" scoped>
.index {
  @apply
  w-full
  h-screen
  relative
  flex
  flex-col
  items-center
  justify-center;
  &_leaf {
    @apply absolute w-1/2 -z-[1];
    &.small {
      @apply w-[35%];
    }
  }
  &_logo {
    @apply relative -translate-y-20;
  }
  &_illustrate {
    @apply
    absolute
    w-[65%]
    h-[50%]
    -translate-y-10
    rounded-[80px]
    max-w-[908px]
    max-h-[430px];
    .title {
      @apply
      bg-primary
      flex
      justify-center
      items-center
      px-6
      py-1
      before:content-['']
      before:absolute
      before:w-[12px]
      before:h-[45px]
      before:bg-primary
      before:top-2
      before:left-0
      before:skew-y-[45deg]
      before:shadow-[0px_0px_2px_0px_rgba(0,255,224,0.8),0px_0px_8px_2px_rgba(0,255,224,0.95)];
    }
    .content {
      @apply mt-[15%]
    }
  }
  &_challenge {
    @apply absolute top-[72%];
  } 
}
</style>

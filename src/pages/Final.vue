<script setup lang="ts">
import { onMounted } from 'vue';
import { useFlagStore, useProgressStore } from '@/store';
import FinalDot from '@/components/final/FinalDot.vue';
import useRedirect from '@/hooks/useRedirect';
import useBackground from '@/hooks/useBackground';
import { gsap, fadeIn, floatMove, showRole } from '@/utils/gsap';
import { sleep } from '@/utils/common';

const { goPage } = useRedirect();
const { moveBackground } = useBackground();

async function init() {
  useFlagStore().setLoadingFlag(false);
  useProgressStore().setProgress(100);
  gsap.set('.final_logo', { scale: 0 });
  gsap.set('.final_title, .final_frame > h2, button', { autoAlpha: 0 });
  gsap.set('.final_frame', { scaleX: 0.01, scaleY: 0.1, autoAlpha: 0 });
  gsap.set('.role_box, .final_dialog, .final_dot', { autoAlpha: 0 });
  await sleep(1000);
  floatDialog();
  await showLogo();
  await fadeIn('.final_title');
  await scaleFrame();
  await fadeIn('.final_frame > h2');
  showRole('.role_box.gg');
  await sleep();
  showRole('.role_box.ee');
  await sleep();
  showRole('.role_box.mm', 'down');
  await sleep();
  showRole('.role_box.po');
  await sleep();
  await fadeIn('.final_dialog.gg');
  await fadeIn('.final_dialog.ee');
  await fadeIn('.final_dialog.mm');
  await fadeIn('.final_dialog.po');
  gsap.fromTo('.final_dot', { yPercent: 25 }, { yPercent: 0 });
  await fadeIn('button, .final_dot');
}

function floatDialog() {
  floatMove('.final_dialog.gg');
  floatMove('.final_dialog.ee', 1);
  floatMove('.final_dialog.mm', 0.3);
  floatMove('.final_dialog.po', 0.5);
}

function showLogo() {
  return new Promise(resolve => {
    gsap.to('.final_logo', { scale: 1, ease: 'back' });
    gsap.delayedCall(0.5, resolve);
  });
}

function scaleFrame() {
  return new Promise(resolve => {
    const timeLine = gsap.timeline();

    timeLine
      .to('.final_frame', { autoAlpha: 1 })
      .to('.final_frame', { scaleY: 1, duration: 0.3 })
      .to('.final_frame', { scaleX: 1, duration: 0.2 })
      .call(resolve);
  });
}

function replay() {
  goPage('index');
}

onMounted(init);
</script>

<template>
  <div class="final" @mousemove="moveBackground">
    <img src="@/assets/logo/logo_txt.png" class="final_logo" alt="" width="600">
    <h2 class="final_title">恭喜你通過</h2>
    <div class="final_frame frame_primary">
      <h2>《 敏捷任務 - 最初の試煉 》</h2>
    </div>
    <button class="text-base text-primary font-bold" @click="replay">再玩一次</button>

    <div class="final_roles">
      <div class="role_box gg rotate-180">
        <p class="final_dialog gg text-role-team2 rotate-180 -bottom-5">窩的冰淇淋ㄋ？</p>
        <img src="@/assets/role/hole.svg" alt="" class="hole">
        <img src="@/assets/role/role_team2_light.png" alt="" class="light">
        <img src="@/assets/role/role_team2.png" alt="" class="role">
      </div>
      <div class="role_box ee rotate-180 mr-[130px]">
        <p class="final_dialog ee text-role-team1 rotate-180 bottom-0">嗚嗚我會想尼QQ</p>
        <img src="@/assets/role/hole.svg" alt="" class="hole">
        <img src="@/assets/role/role_team1_light.png" alt="" class="light">
        <img src="@/assets/role/role_team1.png" alt="" class="role">
      </div>
      <div class="role_box mm">
        <p class="final_dialog mm text-role-sm-tint -top-5">不愧似窩ㄉ學生</p>
        <img src="@/assets/role/role_sm_light.png" alt="" class="light mm">
        <img src="@/assets/role/role_sm.png" alt="" class="role mm">
        <img src="@/assets/role/hole.svg" alt="" class="hole">
      </div>
      <div class="role_box po rotate-180">
        <p class="final_dialog po text-primary rotate-180 bottom-0">哇喔太厲害ㄌㄅ</p>
        <img src="@/assets/role/hole.svg" alt="" class="hole">
        <img src="@/assets/role/role_po_light.png" alt="" class="light">
        <img src="@/assets/role/role_po.png" alt="" class="role">
      </div>
    </div>

    <final-dot />
  </div>
</template>

<style lang="postcss" scoped>
.final {
  @apply
  px-14
  w-screen
  h-screen
  flex
  flex-col
  items-center;
  &_title {
    @apply text-white mb-5;
  }
  &_frame {
    @apply
    w-[600px]
    py-8
    text-center
    shadow-[0px_0px_2px_0px_rgba(0,255,224,0.8),0px_0px_8px_2px_rgba(0,255,224,0.95)]
    mb-6
    rounded-[40px];
    background: linear-gradient(180deg, rgba(0, 255, 224, 0) 0%, rgba(0, 255, 224, 0.03) 59.9%, rgba(0, 255, 224, 0.12) 78.12%, rgba(0, 255, 224, 0.36) 100%), rgba(10, 13, 20, 0.6);
  }
  &_roles {
    @apply flex justify-center items-center pt-14;
    .role_box {
      @apply w-[205px];
      &.mm {
        @apply pt-[195px];
      }
    }
    .role.mm {
      @apply top-12 origin-bottom z-[1];
    }
    .light.mm {
      @apply absolute z-[1] -top-1;
    }
  }
  &_dialog {
    @apply absolute font-bold left-5 whitespace-nowrap;
  }
}
</style>
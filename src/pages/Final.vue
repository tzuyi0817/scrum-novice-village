<script setup lang="ts">
import { ref, computed, shallowRef, onMounted } from 'vue';
import { useFlagStore, useProgressStore } from '@/store';
import useRedirect from '@/hooks/useRedirect';
import { gsap, fadeIn, fadeOut} from '@/utils/gsap';
import { sleep } from '@/utils/common';

async function init() {
  useFlagStore().setLoadingFlag(false);
  useProgressStore().setProgress(100);
  // gg.value?.init();
  // gsap.set('.retro_question, .retro_question_role', { autoAlpha: 0 });
  // gsap.set('.retro_select', { autoAlpha: 0 });
  // gsap.set('.mask, .mask_backdrop, .retro_screen', { autoAlpha: 0 });
  await sleep(1000);
  // await gg.value?.show();
  // await gg.value?.visibleDialog();
  // isShowIllustrate.value = true;
  // await gg.value?.continueDialog();
  // isShowContinue.value = true;
  // window.onclick = nextIntroduce;
}

onMounted(init);
</script>

<template>
  <div class="final">
    <img src="@/assets/logo/logo_txt.png" class="final_logo" alt="" width="600">
    <h2 class="final_title">恭喜你通過</h2>
    <h2 class="final_frame frame_primary">《 敏捷任務 - 最初の試煉 》</h2>
    <button class="text-base text-primary font-bold">再玩一次</button>
  </div>
</template>

<style lang="postcss" scoped>
.final {
  @apply
  w-full
  h-screen
  px-14
  bg-cover
  flex
  flex-col
  items-center
  bg-[url('@/assets/bg/bg_village.png')];
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
}
</style>
<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import { useFlagStore, useProgressStore } from '@/store';
import ScrumTeam1 from '@/components/ScrumTeam1.vue';
import CircuitSprint from '@/components/circuit/CircuitSprint.vue';
import CircuitProcess from '@/components/circuit/CircuitProcess.vue';
import CircuitEe1 from '@/components/circuit/CircuitEe1.vue';
import CircuitEe2 from '@/components/circuit/CircuitEe2.vue';
import CircuitEe3 from '@/components/circuit/CircuitEe3.vue';
import CircuitEe4 from '@/components/circuit/CircuitEe4.vue';
import CircuitEe5 from '@/components/circuit/CircuitEe5.vue';
import useRedirect from '@/hooks/useRedirect';
import useBackground from '@/hooks/useBackground';
import { gsap, fadeIn, fadeOut, slideIn, dialog } from '@/utils/gsap';
import { sleep } from '@/utils/common';

const ee = ref<InstanceType<typeof ScrumTeam1> | null>(null);
const isShowContinue = ref(false);
const isShowIllustrate = ref(false);
const isDisabledComplete = ref(true);
const illustrate = shallowRef(CircuitEe1);
const { goPage } = useRedirect();
const { moveBackground } = useBackground();

async function init() {
  useFlagStore().setLoadingFlag(false);
  useProgressStore().setProgress(66);
  ee.value?.init();
  gsap.set('.circuit_sprint, .circuit_sprint_box > section', { autoAlpha: 0 });
  gsap.set('.circuit_exercise, .circuit_complete', { autoAlpha: 0 });
  gsap.set('.circuit_process > img, .circuit_process > ul > .frame_team1', { autoAlpha: 0 });
  gsap.set('.circuit_process > .frame_primary, .circuit_process_drop', { autoAlpha: 0 });
  gsap.set('.mask, .mask_backdrop, .circuit_screen', { autoAlpha: 0 });
  await sleep(1000);
  await ee.value?.show();
  await ee.value?.visibleDialog();
  isShowIllustrate.value = true;
  await ee.value?.continueDialog();
  isShowContinue.value = true;
  window.onclick = nextIntroduce;
}

async function nextIntroduce() {
  window.onclick = null;
  isShowContinue.value = false;
  illustrate.value = CircuitEe2;
  slideIn('.circuit_sprint');
  await ee.value?.continueDialog();
  await dialog('.circuit_sprint_box.daily > section', 252);
  await dialog('.circuit_sprint_box.review > section', 72);
  await dialog('.circuit_sprint_box.retro > section', 200);
  isShowContinue.value = true;
  window.onclick = nextExercise;
}

async function nextExercise() {
  window.onclick = null;
  isShowContinue.value = false;
  illustrate.value = CircuitEe3;
  await ee.value?.continueDialog();
  fadeIn('.circuit_exercise');
}

async function exercise() {
  isShowIllustrate.value = false;
  await fadeOut('.circuit_exercise');
  gsap.set('.circuit_sprint_box > img, .circuit_sprint_box > section', { autoAlpha: 0 });
  gsap.to('.circuit_sprint_box > .frame_team1', { width: 300 });
  gsap.to('.circuit_sprint_box.daily > .frame_team1', { xPercent: 289, yPercent: -214 });
  gsap.to('.circuit_sprint_box.review > .frame_team1', { xPercent: 137, yPercent: -87 });
  await gsap.to('.circuit_sprint_box.retro > .frame_team1', { xPercent: -15, yPercent: 40 });
  gsap.set('.circuit_sprint_box > .frame_team1', { autoAlpha: 0 });
  gsap.set('.circuit_process > ul > .frame_team1', { autoAlpha: 1 });
  illustrate.value = CircuitEe4;
  isShowIllustrate.value = true;
  fadeIn('.circuit_process > img');
  fadeIn('.circuit_process > .frame_primary.product');
  await ee.value?.continueDialog();
  await fadeIn('.circuit_process > .frame_primary.planning');
  await fadeIn('.circuit_process > .frame_primary.backlog');
  await fadeIn('.circuit_process > .frame_primary.sprint');
  await fadeIn('.circuit_process_drop');
  await fadeIn('.circuit_complete');
}

async function complete() {
  fadeOut('.circuit_complete');
  isShowIllustrate.value = false;
  await fadeIn('.mask, .mask_backdrop');
  illustrate.value = CircuitEe5;
  isShowIllustrate.value = true;
  fadeIn('.circuit_screen');
  await ee.value?.continueDialog();
  isShowContinue.value = true;
  window.onclick = goRetro;
}

async function goRetro() {
  window.onclick = null;
  fadeOut('.circuit_screen');
  await fadeOut('.circuit_process');
  fadeOut('.mask, .mask_backdrop');
  await ee.value?.hide();
  await ee.value?.hideDialog();
  goPage('retro');
}

onMounted(init);
</script>

<template>
  <div class="circuit" @mousemove="moveBackground">
    <scrum-team1 ref="ee" :isShowContinue="isShowContinue" class="w-full z-[15]">
      <component :is="illustrate" v-show="isShowIllustrate" />
    </scrum-team1>

    <circuit-sprint />
    <circuit-process v-model:isDisabledComplete="isDisabledComplete" />

    <button class="circuit_exercise btn" @click="exercise">練習去囉</button>
    <button class="circuit_complete btn" @click="complete" :disabled="isDisabledComplete">我完成了</button>

    <div class="circuit_screen">
      <div class="frame_primary">點擊畫面任意處繼續</div>
    </div>

    <div class="mask z-[10]"></div>
    <div class="mask_backdrop z-[10]"></div>
  </div>
</template>

<style lang="postcss" scoped>
.circuit {
  @apply
  px-14
  pt-[310px]
  flex
  w-screen
  h-screen
  gap-20;
  .btn {
    @apply absolute right-10 bottom-20;
  }
  &_screen {
    @apply w-full flex justify-center absolute top-1/2 z-[15];
  }
}
</style>
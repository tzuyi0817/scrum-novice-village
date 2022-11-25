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
import { gsap, fadeIn, fadeOut, slideIn, dialog } from '@/utils/gsap';
import { sleep } from '@/utils/common';

const ee = ref<InstanceType<typeof ScrumTeam1> | null>(null);
const isShowContinue = ref(false);
const isShowIllustrate = ref(false);
const isDisabledComplete = ref(true);
const illustrate = shallowRef(CircuitEe1);

async function init() {
  // useFlagStore().setLoadingFlag(false);
  // useProgressStore().setProgress(66);
  // ee.value?.init();
  // gsap.set('.circuit_sprint, .circuit_sprint_box > section', { autoAlpha: 0 });
  // gsap.set('.circuit_exercise, .circuit_complete', { autoAlpha: 0 });
  // gsap.set('.circuit_process > img, .circuit_process > ul > .frame_team1', { autoAlpha: 0 });
  // gsap.set('.circuit_process > .frame_primary, .circuit_process_drop', { autoAlpha: 0 });
  // gsap.set('.mask, .mask_backdrop, .circuit_screen', { autoAlpha: 0 });
  // await sleep(1000);
  // await ee.value?.show();
  // await ee.value?.visibleDialog();
  // isShowIllustrate.value = true;
  // await ee.value?.continueDialog();
  // isShowContinue.value = true;
  // window.onclick = nextIntroduce;
}

onMounted(init);
</script>

<template>
  <div class="retro">
    <!-- <scrum-team1 ref="ee" :isShowContinue="isShowContinue" class="w-full z-[15]">
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
    <div class="mask_backdrop z-[10]"></div> -->
  </div>
</template>

<style lang="postcss" scoped>
.retro {
  @apply
  w-full
  h-screen
  px-14
  bg-cover
  bg-[url('@/assets/bg/bg_village.png')];
  .btn {
    @apply absolute right-10 bottom-20;
  }
  &_screen {
    @apply w-full flex justify-center absolute top-1/2 z-[15];
  }
}
</style>
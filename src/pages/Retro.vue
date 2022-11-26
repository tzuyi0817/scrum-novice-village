<script setup lang="ts">
import { ref, computed, shallowRef, onMounted } from 'vue';
import { useFlagStore, useProgressStore } from '@/store';
import ScrumTeam2 from '@/components/ScrumTeam2.vue';
import RetroGg1 from '@/components/retro/RetroGg1.vue';
import RetroGg2 from '@/components/retro/RetroGg2.vue';
import RetroGg3 from '@/components/retro/RetroGg3.vue';
import useRedirect from '@/hooks/useRedirect';
import useBackground from '@/hooks/useBackground';
import { gsap, fadeIn, fadeOut } from '@/utils/gsap';
import { sleep } from '@/utils/common';

const gg = ref<InstanceType<typeof ScrumTeam2> | null>(null);
const isShowContinue = ref(false);
const isShowIllustrate = ref(false);
const well = ref('');
const better = ref('');
const illustrate = shallowRef(RetroGg1);
const { goPage } = useRedirect();
const { moveBackground } = useBackground();

const isDisabled = computed(() => well.value !== 'correct' || better.value !== 'correct');

async function init() {
  useFlagStore().setLoadingFlag(false);
  useProgressStore().setProgress(83);
  gg.value?.init();
  gsap.set('.retro_question, .retro_question_role', { autoAlpha: 0 });
  gsap.set('.retro_select', { autoAlpha: 0 });
  gsap.set('.mask, .mask_backdrop, .retro_screen', { autoAlpha: 0 });
  await sleep(1000);
  await gg.value?.show();
  await gg.value?.visibleDialog();
  isShowIllustrate.value = true;
  await gg.value?.continueDialog();
  isShowContinue.value = true;
  window.onclick = nextIntroduce;
}

async function nextIntroduce() {
  window.onclick = null;
  isShowContinue.value = false;
  illustrate.value = RetroGg2;
  fadeIn('.retro_question');
  await gg.value?.continueDialog();
  gsap.fromTo('.retro_question_role', { yPercent: 50 }, { yPercent: 0 });
  await fadeIn('.retro_question_role');
  fadeIn('.retro_select');
}

async function select() {
  fadeOut('.retro_select');
  isShowIllustrate.value = false;
  await fadeIn('.mask, .mask_backdrop');
  illustrate.value = RetroGg3;
  isShowIllustrate.value = true;
  fadeIn('.retro_screen');
  await gg.value?.continueDialog();
  isShowContinue.value = true;
  window.onclick = goFinal;
}

async function goFinal() {
  window.onclick = null;
  fadeOut('.retro_screen');
  await fadeOut('.retro_question');
  fadeOut('.mask, .mask_backdrop');
  await gg.value?.hide();
  await gg.value?.hideDialog();
  goPage('final');
}

onMounted(init);
</script>

<template>
  <div class="retro" @mousemove="moveBackground">
    <scrum-team2 ref="gg" :isShowContinue="isShowContinue" class="w-full z-[15]">
      <component :is="illustrate" v-show="isShowIllustrate" />
    </scrum-team2>

    <div class="retro_question">
      <h2>Q1.做得好的地方?</h2>
      <div class="retro_question_options">
        <label>
          <div class="retro_question_role role_box">
            <img src="@/assets/role/role_sm_light.png" alt="" class="light">
            <img src="@/assets/role/role_sm.png" alt="" class="role sm">
            <img src="@/assets/role/hole.svg" alt="" class="hole">
          </div>
          <input type="radio" value="wrong" class="radio radio_danger" v-model="well" />
          <div class="frame_list">這次我幫了很多人救火耶～</div>
        </label>
        <label>
          <div class="retro_question_role role_box rotate-180">
            <img src="@/assets/role/hole.svg" alt="" class="hole">
            <img src="@/assets/role/role_po_light.png" alt="" class="light">
            <img src="@/assets/role/role_po.png" alt="" class="role">
          </div>
          <input type="radio" value="correct" class="radio" v-model="well" />
          <div class="frame_list">大家在開發上都會互相 cover ， 讓任務都有準在時間內完成 。</div>
        </label>
      </div>
    </div>

    <div class="retro_question">
      <h2>Q2.有哪些可以做得更好？</h2>
      <div class="retro_question_options">
        <label>
          <div class="retro_question_role role_box rotate-180">
            <img src="@/assets/role/hole.svg" alt="" class="hole">
            <img src="@/assets/role/role_team1_light.png" alt="" class="light">
            <img src="@/assets/role/role_team1.png" alt="" class="role">
          </div>
          <input type="radio" value="correct" class="radio" v-model="better" />
          <div class="frame_list">可以記錄這次的開發時間 ， 讓預估團隊點數可以更精準 。</div>
        </label>
        <label>
          <div class="retro_question_role role_box rotate-180">
            <img src="@/assets/role/hole.svg" alt="" class="hole">
            <img src="@/assets/role/role_team2_light.png" alt="" class="light">
            <img src="@/assets/role/role_team2.png" alt="" class="role -scale-x-[1]">
          </div>
          <input type="radio" value="wrong" class="radio radio_danger" v-model="better" />
          <div class="frame_list">開發時間預估不準確 ， 請後端下次改進 ， 避免 delay 到我 。</div>
        </label>
      </div>
    </div>

    <button class="retro_select btn" @click="select" :disabled="isDisabled">我選好了</button>

    <div class="retro_screen">
      <div class="frame_primary">點擊畫面任意處繼續</div>
    </div>

    <div class="mask z-[10]"></div>
    <div class="mask_backdrop z-[10]"></div>
  </div>
</template>

<style lang="postcss" scoped>
.retro {
  @apply
  px-14
  pt-[310px]
  flex
  justify-center
  items-start
  w-screen
  h-screen
  gap-28;
  &_question {
    @apply flex flex-col items-center gap-10;
    h2 {
      @apply bg-primary px-8 py-1;
    }
    &_options {
      @apply flex gap-5 justify-center;
      label {
        @apply flex flex-col items-center gap-5;
      }
      .frame_list {
        @apply flex-1 text-center max-w-[260px];
      }
    }
    &_role {
      @apply w-[165px];
      .sm {
        @apply top-9;
      }
    }
  }
  .btn {
    @apply absolute right-10 bottom-20;
  }
  &_screen {
    @apply w-full flex justify-center absolute top-1/2 z-[15];
  }
}
</style>
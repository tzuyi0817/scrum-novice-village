<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import { useFlagStore, useProgressStore } from '@/store';
import ScrumPo from '@/components/ScrumPo.vue';
import PlanPo1 from '@/components/plan/PlanPo1.vue';
import ScrumSm from '@/components/ScrumSm.vue';
import PlanSm1 from '@/components/plan/PlanSm1.vue';
import PlanSm2 from '@/components/plan/PlanSm2.vue';
import ScrumTeam1 from '@/components/ScrumTeam1.vue';
import PlanEe1 from '@/components/plan/PlanEe1.vue';
import PlanEe2 from '@/components/plan/PlanEe2.vue';
import PlanEe3 from '@/components/plan/PlanEe3.vue';
import ScrumTeam2 from '@/components/ScrumTeam2.vue';
import PlanGg1 from '@/components/plan/PlanGg1.vue';
import useRedirect from '@/hooks/useRedirect';
import { gsap, fadeIn, fadeOut, slideIn, slideOut, scaleIn } from '@/utils/gsap';
import { sleep, createImageSrc } from '@/utils/common';

const po = ref<InstanceType<typeof ScrumPo> | null>(null);
const sm = ref<InstanceType<typeof ScrumSm> | null>(null);
const team1 = ref<InstanceType<typeof ScrumTeam1> | null>(null);
const team2 = ref<InstanceType<typeof ScrumTeam2> | null>(null);
const isShowPoContinue = ref(false);
const isShowSmContinue = ref(false);
const isShowEeContinue = ref(false);
const isShowGgContinue = ref(false);
const isShowIllustratePo = ref(false);
const isShowIllustrateSm = ref(false);
const isShowIllustrateEe = ref(false);
const isShowIllustrateGg = ref(false);
const illustratePo = shallowRef(PlanPo1);
const illustrateSm = shallowRef(PlanSm1);
const illustrateEe = shallowRef(PlanEe1);
const illustrateGg = shallowRef(PlanGg1);
const { goPage } = useRedirect();

async function init() {
  gsap.set('.plan_sprint, .plan_team, .plan_sprintPlan, .plan_exercise', { autoAlpha: 0 });
  gsap.set('.plan_story_spine, .plan_story_time, .plan_story_item', { autoAlpha: 0 });
  hideTime();
  useFlagStore().setLoadingFlag(false);
  useProgressStore().setProgress(33);
  sm.value?.init();
  team1.value?.init();
  team2.value?.init();
  await sleep(1000);
  isShowIllustratePo.value = true;
  await po.value?.continueDialog();
  await sm.value?.show();
  await fadeIn('.plan_sprint');
  isShowPoContinue.value = true;
  window.onclick = nextSprint;
}

function hideTime() {
  const time = [1, 2, 3, 5, 8, 13, 21];

  time.forEach(num => {
    gsap.set(`.story_item${num} > .point`, { autoAlpha: 0 });
    gsap.set(`.story_item${num} > .time`, { autoAlpha: 0 });
  });
  gsap.set(`.story13, .story21`, { autoAlpha: 0 });
}

async function nextSprint() {
  window.onclick = null;
  sm.value?.visibleDialog();
  fadeOut('.plan_sprint');
  await po.value?.hideDialog();
  isShowIllustrateSm.value = true;
  sm.value?.continueDialog();
  await po.value?.hide();
  await fadeIn('.plan_team');
  isShowSmContinue.value = true;
  window.onclick = nextTeam;
}

async function nextTeam() {
  window.onclick = null;
  isShowSmContinue.value = false;
  illustrateSm.value = PlanSm2;
  isShowIllustrateSm.value = false;
  await fadeOut('.plan_team');
  isShowIllustrateSm.value = true;
  sm.value?.continueDialog();
  await team1.value?.show();
  await team2.value?.show();
  await fadeIn('.plan_sprintPlan');
  isShowSmContinue.value = true;
  window.onclick = nextSprintPlan;
}

async function nextSprintPlan() {
  window.onclick = null;
  fadeOut('.plan_sprintPlan');
  sm.value?.hideDialog();
  team1.value?.visibleDialog();
  fadeIn('.plan_story_spine');
  gsap.to('.plan_story_spine', { translateX: -350, translateY: 0 });
  await sm.value?.hide();
  fadeOut('.plan_story_spine');
  slideIn('.plan_story_item');
  isShowIllustrateEe.value = true;
  await team1.value?.continueDialog();
  await scaleIn('.plan_story_time');
  isShowEeContinue.value = true;
  window.onclick = nextStory;
}

async function nextStory() {
  window.onclick = null;
  isShowEeContinue.value = false;
  illustrateEe.value = PlanEe2;
  team1.value?.continueDialog();
  await slideOut('.plan_story_time');
  const timeLine = gsap.timeline();
  const time = [1, 2, 3, 5, 8, 13, 21];

  time.forEach(num => {
    timeLine.to(
      `.story_item${num} > .point, .story_item${num} > .time, .story_item${num} > .story${num}`,
      { autoAlpha: 1, duration: 0.3 },
    );
    if (num !== 21) return;
    timeLine.call(timeComplete);
  });
}

function timeComplete() {
  isShowEeContinue.value = true;
  window.onclick = nextGg;
}

async function nextGg() {
  window.onclick = null;
  fadeOut('.plan_story');
  await team1.value?.hideDialog();
  await team2.value?.visibleDialog();
  isShowIllustrateGg.value = true;
  await team2.value?.continueDialog();
  isShowGgContinue.value = true;
  window.onclick = nextEe;
}

async function nextEe() {
  window.onclick = null;
  gsap.set('.scrum_team1 > .dialog', { xPercent: 20, yPercent: 200 });
  isShowGgContinue.value = isShowEeContinue.value = isShowIllustrateEe.value = false;
  await team1.value?.visibleDialog();
  illustrateEe.value = PlanEe3;
  isShowIllustrateEe.value = true;
  await team1.value?.continueDialog();
  fadeIn('.plan_exercise');
}

async function exercise() {
  await team1.value?.hideDialog();
  await team2.value?.hideDialog();
  await team1.value?.hide();
  goPage('inventory');
}

onMounted(init);
</script>

<template>
  <div class="plan">
    <scrum-po ref="po" :isShowContinue="isShowPoContinue">
      <component :is="illustratePo" v-show="isShowIllustratePo" />
    </scrum-po>

    <div class="plan_sprint plan_bg frosted">
      <div class="flex gap-8">
        <div class="plan_sprint_item">Sprint</div>
        <div class="plan_sprint_item">Sprint Backlog</div>
      </div>
      <img src="@/assets/attached/sprint.png" alt="" width="415">
    </div>

    <div class="plan_team plan_bg frosted">
      <img src="@/assets/attached/planning_team.png" alt="">
    </div>

    <div class="plan_sprintPlan plan_bg frosted">
      <div class="plan_sprintPlan_item -translate-y-1 before:top-[65px] after:h-5 after:top-[45px]">
        team limit
      </div>
      <img src="@/assets/attached/img_sprintPlan.png" alt="" width="300">
      <div class="plan_sprintPlan_point">20</div>
      <div class="plan_sprintPlan_item -translate-x-4 before:-top-[65px] after:h-20 after:-top-[60px]">
        Story Point
      </div>
    </div>

    <div class="plan_story">
      <img src="@/assets/attached/story_spine.png" alt="" width="56" class="plan_story_spine">
      <img src="@/assets/attached/time.png" alt="" width="165" class="plan_story_time">
      <ul class="plan_story_item">
        <li v-for="num in 3" :key="num" :class="`relative story_item${num}`">
          <img src="@/assets/attached/story.png" alt="" width="195" class="story">
          <img :src="createImageSrc(`attached/time_${num}.png`)" alt="" width="110" class="time">
          <div class="point">{{ num }}</div>
        </li>
      </ul>
      <ul class="plan_story_item">
        <li v-for="num in [5, 8, 13, 21]" :key="num" :class="`relative story_item${num}`">
          <img src="@/assets/attached/story.png" alt="" width="195" class="story">
          <img 
            v-if="num == 13 || num === 21"
            :src="createImageSrc(`attached/story_${num}.png`)"
            alt=""
            width="195"
            :class="`story${num} absolute top-0 left-0`"
          >
          <img :src="createImageSrc(`attached/time_${num}.png`)" alt="" width="110" class="time">
          <div :class="`point point_${num}`">{{ num }}</div>
        </li>
      </ul>
    </div>

    <button class="plan_exercise absolute right-10 bottom-20 z-10 btn" @click="exercise">練習去囉</button>

    <scrum-sm ref="sm" :isShowContinue="isShowSmContinue">
      <component :is="illustrateSm" v-show="isShowIllustrateSm" />
    </scrum-sm>

    <scrum-team1 ref="team1" :isShowContinue="isShowEeContinue" class="w-[calc(100%-400px)] right-[360px]">
      <component :is="illustrateEe" v-show="isShowIllustrateEe" />
    </scrum-team1>

    <scrum-team2 ref="team2" :isShowContinue="isShowGgContinue" class="w-[calc(100%-400px)]">
      <component :is="illustrateGg" v-show="isShowIllustrateGg" />
    </scrum-team2>
  </div>
</template>

<style lang="postcss" scoped>
.plan {
  @apply
  w-full
  h-screen
  bg-cover
  bg-[url('@/assets/bg/bg_village.png')];
  &_item {
    @apply
    px-5 
    py-1
    font-bold
    relative
    before:content-['']
    before:absolute
    before:rounded-full
    before:w-3
    before:h-3
    before:left-1/2
    before:-translate-x-[5px]
    after:content-['']
    after:absolute
    after:border-[1px]
    after:left-1/2;
  }
  &_bg {
    @apply
    absolute
    w-[580px]
    h-[580px]
    flex
    flex-col
    justify-center
    items-center
    rounded-full;
  }
  &_point {
    @apply
    text-[44px]
    text-white
    font-bold
    flex
    justify-center
    items-center
    bg-primary/90
    rounded-full
    w-[80px]
    h-[80px];
  }
  &_sprint {
    @apply 
    bg-primary/30
    top-1/2
    left-1/2
    -translate-y-1/3
    -translate-x-1/2
    before:w-[580px]
    before:h-[580px]
    before:rounded-full
    before:bg-primary/[0.15]
    after:w-[580px]
    after:h-[580px]
    after:rounded-full;
    &:after {
      background: radial-gradient(50% 50% at 50% 50%, #00FFE0 0%, rgba(0, 255, 224, 0) 100%);
    }
    &_item {
      @apply
      plan_item
      bg-primary 
      -translate-y-7
      before:top-[65px]
      before:-translate-x-[5px]
      before:bg-primary
      after:border-primary
      after:h-5
      after:top-[45px];
    }
  }
  .team_bg {
    @apply
    bg-role-sm-tint/[0.35]
    before:w-[580px]
    before:h-[580px]
    before:rounded-full
    before:bg-role-sm-tint/[0.25]
    after:w-[580px]
    after:h-[580px]
    after:rounded-full;
    &:after {
      background: radial-gradient(50% 50% at 50% 50%, #FF00F5 0%, rgba(255, 48, 247, 0) 100%, rgba(255, 0, 245, 0) 100%);
    }
  }
  &_team {
    @apply top-12 left-1/2 -translate-x-1/2 team_bg;
  }
  &_sprintPlan {
    @apply top-12 left-[120px] team_bg;
    &_item {
      @apply
      plan_item
      text-white
      bg-role-sm-dark 
      before:-translate-x-[5px]
      before:bg-role-sm-dark
      after:border-role-sm-dark;
    }
    &_point {
      @apply
      absolute
      top-1/2
      left-1/2
      -translate-x-[70px]
      -translate-y-[15px]
      plan_point;
    }
  }
  &_story {
    @apply relative flex flex-col justify-center items-center gap-10;
    &_spine {
      @apply absolute top-0 left-1/2 -translate-x-[450px] -translate-y-20;
    }
    &_time {
      @apply absolute top-0 left-1/2 -translate-x-[650px] -translate-y-20;
    }
    &_item {
      @apply flex gap-[60px];
      .time {
        @apply absolute -right-10 -top-10;
      }
      .point {
        @apply absolute top-1/2 left-1/2 -translate-x-[20px] -translate-y-1/2 plan_point;
        &_13 {
          @apply bg-[#FF7A00]/70;
        }
        &_21 {
          @apply bg-[#FF0000]/70;
        } 
      }
    }
  }

  :deep(.scrum_team2 > .dialog) {
    @apply -translate-x-[350px];
  }
}
</style>
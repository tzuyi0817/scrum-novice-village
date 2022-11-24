<script setup lang="ts">
import {
  gsap,
  showRole,
  hideRole,
  dialog,
  fadeIn,
  fadeOut,
} from '@/utils/gsap';

interface Props {
  isShowContinue: boolean;
}

interface Props {
  isShowContinue: boolean;
}

const props = defineProps<Props>();

function init() {
  gsap.set('.scrum_sm > .role_box', { autoAlpha: 0 });
  gsap.set('.scrum_sm > .dialog', { autoAlpha: 0 });
}

async function show() {
  await showRole('.scrum_sm > .role_box', 'down');
}

async function hide() {
  await hideRole('.scrum_sm > .role_box', 'down');
}

async function visibleDialog() {
  await fadeIn('.scrum_sm > .dialog');
}

async function hideDialog() {
  await fadeOut('.scrum_sm > .dialog');
}

async function continueDialog() {
  await dialog('.scrum_sm > .dialog > .content');
}

defineExpose({
  init,
  show,
  hide,
  visibleDialog,
  hideDialog,
  continueDialog,
});
</script>

<template>
  <div class="scrum_sm">
    <div class="dialog ml-20 mr-10 mb-5">
      <div class="title">
        <img src="@/assets/role/title_sm.svg" alt="">
        <h3>MM</h3>
      </div>

      <div class="content">
        <slot></slot>
        <img
          v-show="isShowContinue"
          src ="@/assets/icon/ic_continue_sm.svg"
          alt=""
          class="continue"
        >
      </div>
    </div>

    <div class="role_box">
      <img src="@/assets/role/role_sm_light.png" alt="" class="light">
      <img src="@/assets/role/role_sm.png" alt="" class="role">
      <img src="@/assets/role/hole.svg" alt="" class="hole">
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.scrum_sm {
  @apply fixed bottom-16 right-5 flex w-full items-end;
  .dialog {
    @apply border-role-sm shadow-[0px_0px_2px_0px_rgba(211,85,255,0.8),0px_0px_8px_2px_rgba(211,85,255,0.95)]
  }
  .role {
    @apply -top-[230px] origin-bottom z-[1];
  }
  .light {
    @apply absolute -top-[310px] z-[1];
  }
}
</style>

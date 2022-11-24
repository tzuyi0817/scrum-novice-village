<script setup lang="ts">
import {
  gsap,
  showRole,
  showDialog,
  dialog,
  fadeIn,
  fadeOut,
  hideRole,
} from '@/utils/gsap';

interface Props {
  isShowContinue: boolean;
}

const props = defineProps<Props>();

async function illustrate() {
  await showRole('.scrum_team1 > .role_box');
  await showDialog('.scrum_team1 > .dialog', '.scrum_team1 > .dialog > .content');
}

async function continueDialog() {
  await dialog('.scrum_team1 > .dialog > .content');
}

async function visibleDialog() {
  await fadeIn('.scrum_team1 > .dialog');
}

async function hideDialog() {
  await fadeOut('.scrum_team1 > .dialog');
}

async function show() {
  await showRole('.scrum_team1 > .role_box');
}

async function hide() {
  await hideRole('.scrum_team1 > .role_box');
}

function init() {
  gsap.set('.scrum_team1 > .role_box', { autoAlpha: 0 });
  gsap.set('.scrum_team1 > .dialog', { autoAlpha: 0 });
}

defineExpose({
  init,
  illustrate,
  continueDialog,
  visibleDialog,
  hideDialog,
  show,
  hide,
});
</script>

<template>
  <div class="scrum_team1">
    <div class="dialog mx-10 mt-5">
      <div class="title">
        <img src="@/assets/role/title_team1.svg" alt="">
        <h3>EE</h3>
      </div>

      <div class="content">
        <slot></slot>
        <img
          v-show="isShowContinue"
          src ="@/assets/icon/ic_continue_team1.svg"
          alt=""
          class="continue"
        >
      </div>
    </div>

    <div class="role_box">
      <img src="@/assets/role/hole.svg" alt="" class="hole">
      <img src="@/assets/role/role_team1_light.png" alt="" class="light">
      <img src="@/assets/role/role_team1.png" alt="" class="role">
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.scrum_team1 {
  @apply fixed top-10 right-[360px] flex items-start;
  .dialog {
    @apply border-role-team1 shadow-[0px_0px_2px_0px_rgba(255,199,0,0.8),0px_0px_8px_2px_rgba(255,199,0,0.95)]
  }
}
</style>

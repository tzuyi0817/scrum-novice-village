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
  await showRole('.scrum_team2 > .role_box');
  await showDialog('.scrum_team2 > .dialog', '.scrum_team2 > .dialog > .content');
}

async function continueDialog() {
  await dialog('.scrum_team2 > .dialog > .content');
}

async function visibleDialog() {
  await fadeIn('.scrum_team2 > .dialog');
}

async function hideDialog() {
  await fadeOut('.scrum_team2 > .dialog');
}

async function show() {
  await showRole('.scrum_team2 > .role_box');
}

async function hide() {
  await hideRole('.scrum_team2 > .role_box');
}

function init() {
  gsap.set('.scrum_team2 > .role_box', { autoAlpha: 0 });
  gsap.set('.scrum_team2 > .dialog', { autoAlpha: 0 });
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
  <div class="scrum_team2">
    <div class="dialog mx-10 mt-5">
      <div class="title">
        <img src="@/assets/role/title_team2.svg" alt="">
        <h3>GG</h3>
      </div>

      <div class="content">
        <slot></slot>
        <img
          v-show="isShowContinue"
          src ="@/assets/icon/ic_continue_team2.svg"
          alt=""
          class="continue"
        >
      </div>
    </div>

    <div class="role_box">
      <img src="@/assets/role/hole.svg" alt="" class="hole">
      <img src="@/assets/role/role_team2_light.png" alt="" class="light">
      <img src="@/assets/role/role_team2.png" alt="" class="role">
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.scrum_team2 {
  @apply fixed top-10 right-5 flex items-start pl-10;
  .dialog {
    @apply border-role-team2 shadow-[0px_0px_2px_0px_rgba(255,122,0,0.8),0px_0px_8px_2px_rgba(255,122,0,0.95)]
  }
}
</style>

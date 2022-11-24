<script setup lang="ts">
import {
  gsap,
  showRole,
  showDialog,
  dialog,
  fadeOut,
  hideRole,
} from '@/utils/gsap';

interface Props {
  isShowContinue: boolean;
}

const props = defineProps<Props>();

async function illustrate() {
  await showRole('.scrum_po > .role_box');
  await showDialog('.scrum_po > .dialog', '.scrum_po > .dialog > .content');
}

async function continueDialog() {
  await dialog('.scrum_po > .dialog > .content');
}

async function hideDialog() {
  await fadeOut('.scrum_po > .dialog');
}

async function hide() {
  await hideRole('.scrum_po > .role_box');
}

function init() {
  gsap.set('.scrum_po > .role_box', { autoAlpha: 0 });
  gsap.set('.scrum_po > .dialog', { autoAlpha: 0 });
}

defineExpose({
  init,
  illustrate,
  continueDialog,
  hideDialog,
  hide,
});
</script>

<template>
  <div class="scrum_po">
    <div class="role_box">
      <img src="@/assets/role/hole.svg" alt="" class="hole">
      <img src="@/assets/role/role_po_light.png" alt="" class="light">
      <img src="@/assets/role/role_po.png" alt="" class="role">
    </div>

    <div class="dialog mx-10 mt-5">
      <div class="title">
        <img src="@/assets/role/title_po.svg" alt="">
        <h3>PO</h3>
      </div>

      <div class="content">
        <slot></slot>
        <img
          v-show="isShowContinue"
          src ="@/assets/icon/ic_continue_po.svg"
          alt=""
          class="continue"
        >
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.scrum_po {
  @apply flex pt-10 items-start;
}
</style>

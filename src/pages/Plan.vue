<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import { useFlagStore, useProgressStore } from '@/store';
import ScrumPo from '@/components/ScrumPo.vue';
import { gsap, fadeIn, fadeOut } from '@/utils/gsap';
import { sleep } from '@/utils/common';

const po = ref<InstanceType<typeof ScrumPo> | null>(null);
const isShowContinue = ref(true);

async function init() {
  useFlagStore().setLoadingFlag(false);
  useProgressStore().setProgress(40);
  await sleep(1000);
}

onMounted(init);
</script>

<template>
  <div class="plan">
    <scrum-po ref="po" :isShowContinue="isShowContinue">
      <!-- <component :is="illustrate" /> -->
    </scrum-po>
  </div>
</template>

<style lang="postcss" scoped>
.plan {
  @apply
  w-full
  h-screen
  bg-cover
  bg-[url('@/assets/bg/bg_village.png')];
}
</style>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProgressStore } from '@/store';

const { progress } = storeToRefs(useProgressStore());
</script>

<template>
  <div class="scrum_progress">
    <div class="scrum_progress_bar" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<style lang="postcss" scoped>
.scrum_progress {
  @apply fixed w-full top-0 left-0 h-3 bg-primary-dark z-10;
  &_bar {
    @apply
    bg-gradient-270 from-[#00FFE0] to-[rgba(0,255,224,0.1)]
    transition-all
    duration-500
    h-full;
  }
}
</style>
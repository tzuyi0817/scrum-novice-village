<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFlagStore } from '@/store';
import { sleep } from '@/utils/common';

const loadingPercent = ref(0);
const { isLoading } = storeToRefs(useFlagStore());
const isComplete = computed(() => !isLoading.value && loadingPercent.value >= 95);

async function setLoading() {
  if (loadingPercent.value === 95) return;
  const addPercent = loadingPercent.value >= 90 ? 1 : 30;

  await sleep(loadingPercent.value);
  loadingPercent.value += addPercent;
  requestAnimationFrame(setLoading);
}

onMounted(setLoading);
</script>

<template>
  <transition name="fade">
    <div class="scrum_loading" v-if="!isComplete">
      <div class="absolute top-0 left-0 bg-primary-linear rotate-[-180deg] h-40 w-full"></div>
      <img src="@/assets/loading.gif" alt=""/>
      <div class="scrum_loading_progress">
        <div class="scrum_loading_bar" :style="{ width: `${loadingPercent}%` }"></div>
      </div>
    </div>
  </transition>
</template>

<style lang="postcss" scoped>
.scrum_loading {
  @apply fixed w-full h-full flex flex-col items-center justify-center z-20 bg-bg-dark;
  &_progress {
    @apply bg-primary-dark w-[80%] max-w-[500px] h-2 mt-6;
  }
  &_bar {
    @apply 
    bg-gradient-270 from-[#00FFE0] to-[rgba(0,255,224,0.1)]
    h-full
    transition-all
    duration-500;
  }
}
</style>
<script setup lang="ts">
import { computed } from 'vue';
import { useProgressStore } from '@/store';

const isShowBackground = computed(() => {
  const { progress } = useProgressStore();
  return progress > 1;
});
</script>

<template>
  <div class="background" v-show="isShowBackground"></div>
</template>

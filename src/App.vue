<script setup lang="ts">
import ScrumLoading from '@/components/ScrumLoading.vue';
import ScrumFooter from '@/components/ScrumFooter.vue';
import ScrumProgress from '@/components/ScrumProgress.vue';
import ScrumBackground from '@/components/ScrumBackground.vue';
</script>

<template>
  <scrum-loading />
  <scrum-background />
  <router-view />
  <!-- <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" ref="component" />
    </transition>
  </router-view> -->
  <scrum-progress />
  <scrum-footer />
</template>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>

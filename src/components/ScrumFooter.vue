<script setup lang="ts">
const year = new Date().getFullYear();

</script>

<template>
  <div class="scrum_footer" >
    <p class="text-primary-dark text-sm font-bold">
      {{ `© ${year} The F2E | UI Design - EG | F2E - Tzuyi` }}
    </p>
  </div>
</template>

<style lang="postcss" scoped>
.scrum_footer {
  @apply fixed h-11 w-full flex justify-center items-center bg-bg-dark/80 bottom-0 z-20;
}
</style>
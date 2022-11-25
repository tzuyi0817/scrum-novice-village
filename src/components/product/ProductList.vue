<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue';
import Draggable from '@/components/Draggable.vue';
import { gsap, fadeIn } from '@/utils/gsap';

interface DropItem {
  id: number;
  text: string;
}

const emit = defineEmits(['update:isDisabledComplete']);
const list = reactive<Array<DropItem>>([]);
const dropLeft = reactive([
  { id: 3, text: '應徵者的線上履歷編輯器' },
  { id: 1, text: '後台職缺管理功能（資訊上架、下架、顯示應徵者資料）' },
]);

const dropRight = reactive([
  { id: 2, text: '會員系統（登入、註冊、權限管理）' },
  { id: 4, text: '前台職缺列表、應徵' },
]);

async function showList() {
  await fadeIn('.product_list');
}

function education() {
  gsap.to('.drop1, .drop2, .drop3', { autoAlpha: 0.5 });
  gsap.to('.education_arrow', { autoAlpha: 1 });
  gsap.to('.education_drop', {  xPercent: -81, yPercent: -113, width: 416, maxWidth: 416, height: 96 });
}

function educationEnd() {
  gsap.to('.drop1, .drop2, .drop3', { autoAlpha: 1 });
  gsap.to('.education_arrow', { autoAlpha: 0 });
  gsap.to('.education_drop', { autoAlpha: 0 });
}

function init() {
  gsap.set('.product_list', { autoAlpha: 0 });
  gsap.set('.education_arrow', { autoAlpha: 0 });
}

watch(list, (list) => {
  const isComplete = list.length === 4;
  emit('update:isDisabledComplete', !isComplete);
});
onMounted(init)
defineExpose({ showList, education, educationEnd });
</script>

<template>
  <div class="product_list">
    <draggable
      v-model="dropLeft"
      class="product_list_drop items-end relative flex-1 pt-[5%] flex flex-col gap-10 mr-[57px] ml-[81px] z-[4]"
      :tag="'ul'"
    >
      <li v-for="item in dropLeft" :key="item.id" :class="`frame_list drop${item.id}`">
        {{ item.text }}
      </li>
    </draggable>

    <div class="product_list_box list">
      <div class="title bg-primary">
        <h2>產品待辦清單</h2>
        <p class="text-primary-dark text-base font-bold">Product Backlog</p>
      </div>
      <div class="product_list_content content">
        <div class="flex flex-col gap-[6px] mr-4">
          <p class="text-base text-white">高</p>
          <div class="border-l-2 h-[380px] border-white translate-x-[6px]"></div>
          <span class="absolute text-white bottom-[50px] rotate-90 font-bold text-base translate-x-[2px]">〉</span>
          <p class="text-base text-white">低</p>
        </div>
        <draggable
          v-model="list"
          class="flex flex-col gap-[10px] z-[4] h-full w-full"
          :tag="'ul'"
        >
          <li
            v-for="item in list"
            class="product_list_item item border-4 bg-bg-dark/60"
            :key="item.id"
          >{{ item.text }}</li>
        </draggable>

        <ul class="absolute flex flex-col gap-[10px] left-[65px] top-8">
          <li
            v-for="num in 4" :key="num"
            class="product_list_item item border-2 border-dashed"
          ></li>
        </ul>

        <div class="education_drop frame_list">前台職缺列表、應徵</div>
        <div class="education_arrow">
          <span class="absolute text-white -rotate-90 font-bold -top-[18px] -left-2">〉</span>
        </div>
      </div>
    </div>

    <draggable
      v-model="dropRight"
      class="product_list_drop items-start relative flex-1 pt-[5%] flex flex-col gap-10 mr-[57px] ml-[81px] z-[4]"
      :tag="'ul'"
    >
      <li v-for="item in dropRight" :key="item.id" :class="`frame_list drop${item.id}`">
        {{ item.text }}
      </li>
    </draggable>
  </div>
</template>

<style lang="postcss" scoped>
.product_list {
  @apply flex justify-center select-none;
  &_box {
    @apply before:bg-primary/20 after:bg-primary/10;
  }
  &_item {
    @apply border-primary;
  }
  &_content {
    @apply bg-primary/30;
    &:after {
      background: radial-gradient(50% 50% at 50% 50%, #00FFE0 0%, rgba(0, 255, 224, 0) 100%);
    }
  }
  &_drop {
    li {
      @apply odd:ml-[10%] even:mr-[10%] transition-opacity duration-500;
    }
  }
  .education_arrow {
    @apply
    absolute
    border-l-4
    h-[100px] 
    border-white
    -right-[95px]
    top-[50px]
    -rotate-[60deg]
    -translate-x-14
    translate-y-3;
  }
  .education_drop {
    @apply absolute -right-[376px] top-[50px] -translate-x-[58px] translate-y-[90px] z-[4];
  }
}
</style>
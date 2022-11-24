<script setup lang="ts">
import { ref, shallowRef, reactive, computed, onMounted } from 'vue';
import { useFlagStore, useProgressStore } from '@/store';
import ScrumTeam2 from '@/components/ScrumTeam2.vue';
import InventoryGg from '@/components/inventory/InventoryGg.vue';
import Draggable from '@/components/Draggable.vue';
import useRedirect from '@/hooks/useRedirect';
import { gsap, fadeIn, fadeOut } from '@/utils/gsap';
import { sleep } from '@/utils/common';

interface DropItem {
  id: number;
  text: string;
  size: number;
}

const gg = ref<InstanceType<typeof ScrumTeam2> | null>(null);
const isShowContinue = ref(false);
const isShowIllustrate = ref(false);
const illustrate = shallowRef(InventoryGg);
const develop = reactive<DropItem[]>([]);
const product = reactive([
  { id: 1, size: 8, text: '後台職缺管理功能（資訊上架、下架、顯示應徵者資料）' },
  { id: 2, size: 5, text: '應徵者的線上履歷編輯器' },
  { id: 3, size: 13, text: '會員系統（登入、註冊、權限管理）' },
  { id: 4, size: 8, text: '前台職缺列表、應徵' },
]);
// const { goPage } = useRedirect();

const totalSize = computed(() => develop.reduce((total, { size }) => total + size, 0));
const barPercent = computed(() => totalSize.value / 20 * 100);
const isDisableBtn = computed(() => develop.length < 2 || totalSize.value > 20);

async function init() {
  useFlagStore().setLoadingFlag(false);
  useProgressStore().setProgress(50);
  await sleep(1000);
  isShowIllustrate.value = true;
  await gg.value?.continueDialog();
}

function startSprint() {

}

onMounted(init);
</script>

<template>
  <div class="inventory">
    <div class="inventory_product list">
      <div class="title bg-primary">
        <h2>產品待辦清單</h2>
        <p class="text-primary-dark text-base font-bold">Product Backlog</p>
      </div>

      <div class="inventory_product_content content">
        <draggable
          v-model="product"
          class="flex flex-col gap-[10px] z-[4] h-full w-full"
          :tag="'ul'"
        >
          <li
            v-for="item in product"
            class="inventory_item item border-primary"
            :key="item.id"
          >
            <h2 class="inventory_point bg-primary/70">{{ item.size }}</h2>
            {{ item.text }}
          </li>
        </draggable>
      </div>
    </div>

    <div class="inventory_develop list">
      <div class="title bg-role-team1">
        <h2>開發Ａ組的短衝待辦清單</h2>
        <p class="text-role-team-dark text-base font-bold">Sprint Backlog</p>
      </div>

      <div class="inventory_develop_content content">
        <draggable
          v-model="develop"
          class="flex flex-col gap-[10px] z-[4] h-full w-full"
          :tag="'ul'"
        >
          <li
            v-for="item in develop"
            :class="['inventory_item item', totalSize > 20 ? 'border-danger' : 'border-role-team1']"
            :key="item.id"
          >
            <h2 class="inventory_point bg-role-team1">{{ item.size }}</h2>
            {{ item.text }}
          </li>
        </draggable>

        <ul class="absolute flex flex-col gap-[10px] left-[32px] top-8">
          <li
            v-for="num in 3" :key="num"
            class="inventory_item item dashed"
          ></li>
        </ul>

        <div class="inventory_develop_counter relative">
          <div :class="['bar', totalSize > 20 ? 'bg-danger' : 'bg-role-team1']"></div>
          <p class="absolute left-1/2 top-1/2 -translate-x-[calc(50%-10px)] -translate-y-1/2">
            {{ `${totalSize} / 20 (5人)` }}
          </p>
        </div>
      </div>
    </div>

    <button
      class="inventory_start btn"
      @click="startSprint"
      :disabled="isDisableBtn"
    >開始sprint</button>

    <scrum-team2 ref="gg" :isShowContinue="isShowContinue" class="w-full">
      <component :is="illustrate" v-show="isShowIllustrate" />
    </scrum-team2>
  </div>
</template>

<style lang="postcss" scoped>
.inventory {
  @apply
  w-full
  h-screen
  px-14
  pt-[290px]
  flex
  gap-20
  bg-cover
  bg-[url('@/assets/bg/bg_village.png')];
  &_product {
    @apply before:bg-primary/20 after:bg-primary/10;
    &_content {
      @apply bg-primary/30;
      &:after {
        background: radial-gradient(50% 50% at 50% 50%, #00FFE0 0%, rgba(0, 255, 224, 0) 100%);
      }
    }
  }
  &_develop {
    @apply before:bg-[#FF7A00]/30 after:bg-[#FF7A00]/20;
    &_content {
      @apply bg-[#FF7A00]/40;
      &:after {
        background: radial-gradient(50% 50% at 50% 50%, #FFC700 0%, rgba(255, 199, 0, 0) 100%);
      }
    }
    &_counter {
      @apply
      absolute
      bottom-8
      left-1/2
      -translate-x-1/2
      text-base
      w-[416px]
      h-[24px]
      bg-role-team-dark
      rounded-[20px]
      p-1
      text-white
      z-[5];
      .bar {
        @apply 
        w-[calc(v-bind(barPercent)*1%)]
        max-w-full
        h-full 
        transition-all
        duration-500
        rounded-[20px];
      }
    }
  }
  &_point {
    @apply
    text-white
    font-bold
    flex
    justify-center
    items-center
    rounded-full
    shrink-0
    w-[50px]
    h-[50px];
  }
  &_item {
    @apply border-4 bg-bg-dark/60 justify-start gap-[10px] w-full;
    &.dashed {
      @apply border-2 border-dashed border-role-team1 bg-transparent w-[436px];
    }
  }
  &_start {
    @apply absolute right-10 bottom-20;
  }
}
</style>
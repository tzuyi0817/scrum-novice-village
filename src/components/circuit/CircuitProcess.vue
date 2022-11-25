<script setup lang="ts">
import { reactive, watch, computed } from 'vue';
import Draggable from '@/components/Draggable.vue';

interface DragItem {
  id: number;
  title: string;
  text: string;
}

const emit = defineEmits(['update:isDisabledComplete']);
const daily = reactive<DragItem[]>([]);
const review = reactive<DragItem[]>([]);
const retrospective = reactive<DragItem[]>([]);
const isDaily = computed(() => daily[0]?.id === 1 && daily.length === 1);
const isReview = computed(() => review[0]?.id === 2 && review.length === 1);
const isRetrospective = computed(() => retrospective[0]?.id === 3 && retrospective.length === 1);
const isComplete = computed(() => isDaily.value && isReview.value && isRetrospective.value);
const process = reactive([
  { id: 1, title: '每日站立會議', text: 'Daily Scrum' },
  { id: 2, title: '短衝檢視會議', text: 'Sprint Review' },
  { id: 3, title: '短衝自省會議', text: 'Sprint Retrospective' },
]);

watch(isComplete, (isComplete) => emit('update:isDisabledComplete', !isComplete));
</script>

<template>
  <div class="circuit_process relative">
    <img src="@/assets/attached/sprint_process.png" alt="">

    <div class="frame_primary product left_line top-7 left-10">
      <h2>產品待辦清單</h2>
      <p>Product Backlog</p>
    </div>

    <div class="frame_primary planning left_line top-[138px] left-10">
      <h2>短衝規劃會議</h2>
      <p>Sprint Planning</p>
    </div>

    <div class="frame_primary backlog left_line top-[248px] left-10">
      <h2>短衝待辦清單</h2>
      <p>Sprint Backlog</p>
    </div>

    <div class="frame_primary sprint top_line bottom-[130px] left-[195px]">
      <h2>短衝</h2>
      <p>Sprint</p>
    </div>

    <ul class="circuit_process_drop relative">
      <li class="frame_dashed daily left_line">
        <draggable 
          v-model="daily" 
          :tag="'ul'" 
          :disabledArea="daily.length === 1" 
          class="w-full h-full -translate-x-[2px] -translate-y-[2px]"
        >
          <li
            v-for="item in daily"
            :key="item.id" 
            :class="['frame_team1', isDaily ? 'border-role-team1' : 'border-danger']"
          >
            <h2>{{ item.title }}</h2>
            <p>{{ item.text }}</p>
          </li>
        </draggable>
      </li>
      <li class="frame_dashed review bottom_line">
        <draggable
          v-model="review"
          :tag="'ul'"
          :disabledArea="review.length === 1"
          class="w-full h-full -translate-x-[2px] -translate-y-[2px]"
        >
          <li 
            v-for="item in review"
            :key="item.id"
            :class="['frame_team1', isReview ? 'border-role-team1' : 'border-danger']"
          >
            <h2>{{ item.title }}</h2>
            <p>{{ item.text }}</p>
          </li>
        </draggable>
      </li>
      <li class="frame_dashed retrospective bottom_line">
        <draggable
          v-model="retrospective"
          :tag="'ul'"
          :disabledArea="retrospective.length === 1"
          class="w-full h-full -translate-x-[2px] -translate-y-[2px]"
        >
          <li 
            v-for="item in retrospective"
            :key="item.id"
            :class="['frame_team1',  isRetrospective ? 'border-role-team1' : 'border-danger']"
          >
            <h2>{{ item.title }}</h2>
            <p>{{ item.text }}</p>
          </li>
        </draggable>
      </li>
    </ul>

    <draggable
      v-model="process"
      class="fixed flex flex-col gap-6 top-[330px] right-[400px] min-w-[300px] min-h-[312px]"
      :tag="'ul'"
      :disabledArea="process.length === 3"
    >
      <li
        v-for="item in process"
        class="frame_team1"
        :key="item.id"
      >
        <h2>{{ item.title }}</h2>
        <p>{{ item.text }}</p>
      </li>
    </draggable>
  </div>
</template>

<style lang="postcss" scoped>
.circuit_process {
  @apply absolute top-[250px] left-20 h-[660px] select-none;
  img {
    @apply h-full;
  }
  .frame_team1 {
    @apply w-[300px];
    p {
      @apply text-primary text-base;
    }
  }
  .frame_primary {
    @apply absolute flex flex-col justify-center items-center border-4 bg-bg-dark/60;
    p {
      @apply text-primary-dark text-base;
    }
  }
  .left_line {
    @apply
    before:content-['']
    before:absolute
    before:-left-8
    before:top-1/2
    before:border-t-4
    before:w-8
    before:border-primary;
  }
  .top_line {
    @apply
    before:content-['']
    before:absolute
    before:left-1/2
    before:-top-16
    before:border-l-4
    before:h-16
    before:border-primary;
  }
  .bottom_line {
    @apply
    before:content-['']
    before:absolute
    before:left-1/2
    before:-bottom-9
    before:border-l-4
    before:h-9
    before:border-primary;
  }
  &_drop {
    @apply
    absolute
    bottom-7
    -right-10
    h-[400px]
    w-[630px];
    .frame_dashed {
      @apply w-[300px] h-[88px] border-2 border-dashed border-primary rounded-[20px];
    }
    .daily {
      @apply absolute top-[110px] left-14;
    }
    .review {
      @apply absolute bottom-8 left-0;
    }
    .retrospective {
      @apply absolute bottom-8 right-0;
    }
  }
}
</style>
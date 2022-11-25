<script setup lang="ts"></script>

<template>
  <div class="circuit_sprint">
    <div class="circuit_sprint_box daily">
      <img src="@/assets/attached/sprint_daily.png" alt="">
      <div class="frame_team1">
        <h2>每日站立會議</h2>
        <p>Daily Scrum</p>
      </div>
      <section>
        每天都要進行的會議 ， 以15分鐘為限制
        <ol>
          <li>昨天為團隊的短衝目標 (Sprint Goal)做了那些進度</li>
          <li>今天我會如何準備來幫助團隊達到短衝目標</li>
          <li>過程中有遇到什麼問題、難題</li>
        </ol>
        透過團隊分享 ， 追蹤大家的工作狀況。
      </section>
    </div>
    <div class="circuit_sprint_box review">
      <img src="@/assets/attached/sprint_review.png" alt="">
      <div class="frame_team1">
        <h2>短衝檢視會議</h2>
        <p>Sprint Review</p>
      </div>
      <section>
        用來檢視該次短衝增量的成果 ， 以蒐集相關的回饋數據或意見 。
      </section>
    </div>
    <div class="circuit_sprint_box retro">
      <img src="@/assets/attached/sprint_retro.png" alt="">
      <div class="frame_team1">
        <h2>短衝自省會議</h2>
        <p>Sprint Retrospective</p>
      </div>
      <section>
        團隊在自省會議裡 , 會共同回顧該短衝歷程發生的事情
        <ol>
          <li>好的地方</li>
          <li>可以改進的地方</li>
          <li>如何維持我們已有的成功經驗</li>
        </ol>
      </section>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.circuit_sprint {
  @apply flex w-full gap-14 justify-center items-start;
  &_box {
    @apply flex flex-col gap-5 max-w-[400px] justify-start items-center;
    img {
      @apply w-full;
    }
    p {
      @apply text-primary text-base;
    }
    section {
      @apply text-white h-fit overflow-hidden;
    }
    ol {
      @apply list-disc pl-7;
    }
  }
}
</style>
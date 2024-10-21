<script setup lang="ts">
import { ref } from 'vue';

type Period = 'Today' | 'This Week' | 'This Month';

const periods: Period[] = ['Today', 'This Week', 'This Month'];
const selectedPeriod = ref<Period>(periods[0]);

function selectPeriod(period: Period) {
  selectedPeriod.value = period;
}
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === selectedPeriod }"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
  </nav>
</template>

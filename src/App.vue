<script setup lang="ts">
import TimeLine from '@/components/TimeLine.vue'
</script>

<template>
  <div class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <TimeLine />
        </template>

        <template #fallback>
          <progress class="progress is-primary is-small" />
        </template>
      </Suspense>
    </div>
  </div>
</template>

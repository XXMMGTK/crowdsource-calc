<template>
  <div class="card result-card">
    <div class="result-row">
      <span class="result-label">总距离</span>
      <span class="result-num">{{ result.totalDist.toFixed(2) }} km</span>
    </div>
    <div class="result-divider" />
    <div class="result-row">
      <span class="result-label">每公里收益</span>
      <span class="result-num result-value">{{ result.earningPerKm.toFixed(2) }} 元</span>
    </div>
    <div class="rating-row">
      <span class="rating-tag" :style="{ color: RATING_MAP[result.rating].color }">
        {{ RATING_MAP[result.rating].label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalcResult } from '@/types'
import { RATING_MAP } from '@/types'

defineProps<{
  result: CalcResult
}>()
</script>

<style scoped>
.result-card {
  margin-top: 20px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 6px 0;
}

.result-label {
  font-size: 15px;
  color: var(--color-text-secondary);
}

.result-num {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.result-divider {
  height: 1px;
  background: var(--color-separator);
  margin: 12px 0;
}

.rating-row {
  margin-top: 16px;
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--color-separator);
}
</style>

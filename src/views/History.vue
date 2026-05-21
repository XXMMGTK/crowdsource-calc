<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">历史记录</h1>
    </div>

    <div v-if="list.length === 0" class="empty">
      <div class="empty-icon">📋</div>
      <div class="empty-text">暂无记录</div>
      <div class="empty-hint">计算结果后点击保存即可在此查看</div>
    </div>

    <div v-else class="list">
      <div class="card history-item" v-for="item in list" :key="item.id">
        <div class="item-top">
          <div class="item-main">
            <span class="item-price">{{ item.input.price.toFixed(2) }} 元</span>
            <span class="item-dist">总{{ item.result.totalDist.toFixed(2) }}km</span>
          </div>
          <button class="btn-delete" @click="onDelete(item.id)">删除</button>
        </div>
        <div class="item-bottom">
          <span class="item-earning">{{ item.result.earningPerKm.toFixed(2) }} 元/km</span>
          <span class="rating-tag" :style="{ color: RATING_MAP[item.result.rating].color }">
            {{ RATING_MAP[item.result.rating].label }}
          </span>
          <span class="item-time">{{ formatTime(item.createdAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated } from 'vue'
import type { HistoryItem } from '@/types'
import { RATING_MAP } from '@/types'
import { loadHistory, deleteRecord } from '@/utils/storage'

const list = ref<HistoryItem[]>([])

function refresh() {
  list.value = loadHistory()
}

function onDelete(id: string) {
  deleteRecord(id)
  refresh()
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

onActivated(() => {
  refresh()
})

refresh()
</script>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.empty-hint {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-main {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-price {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.item-dist {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.btn-delete {
  font-size: 14px;
  color: var(--color-bad);
  background: none;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
}

.btn-delete:active {
  opacity: 0.6;
}

.item-bottom {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--color-separator);
}

.item-earning {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.item-time {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-left: auto;
}
</style>

<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">众包性价比计算器</h1>
    </div>

    <CalculatorForm v-model="input" />

    <ResultCard v-if="showResult" :result="result!" />

    <div class="page-footer" v-if="showResult">
      <button class="btn btn-primary" style="width:100%" @click="onSave">保存记录</button>
    </div>

    <div v-if="savedTip" class="saved-tip">已保存</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CalcInput, CalcResult } from '@/types'
import { calculate } from '@/utils/calculator'
import { saveRecord, generateId } from '@/utils/storage'
import CalculatorForm from '@/components/CalculatorForm.vue'
import ResultCard from '@/components/ResultCard.vue'

const input = ref<CalcInput>({ price: 0, distToShop: 0, distToCustomer: 0 })
const savedTip = ref(false)

const result = computed<CalcResult | null>(() => {
  const { price, distToShop, distToCustomer } = input.value
  if (!price || !distToShop || !distToCustomer) return null
  return calculate(input.value)
})

const showResult = computed(() => result.value !== null)

function onSave() {
  if (!result.value) return
  saveRecord({
    id: generateId(),
    input: { ...input.value },
    result: result.value,
    createdAt: new Date().toISOString()
  })
  savedTip.value = true
  setTimeout(() => { savedTip.value = false }, 1500)
}
</script>

<style scoped>
.saved-tip {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 15px;
  z-index: 100;
  pointer-events: none;
  animation: fadeOut 1.5s ease forwards;
}

@keyframes fadeOut {
  0%, 50% { opacity: 1; }
  100% { opacity: 0; }
}
</style>

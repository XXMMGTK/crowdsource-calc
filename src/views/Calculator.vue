<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">众包性价比计算器</h1>
    </div>

    <CalculatorForm :input="form" @update:price="form.price = $event" @update:dist-to-shop="form.distToShop = $event" @update:dist-to-customer="form.distToCustomer = $event" />

    <ResultCard v-if="showResult" :result="result!" />

    <div class="page-footer" v-if="showResult">
      <button class="btn btn-primary" style="width:100%" @click="onSave">保存记录</button>
    </div>

    <div v-if="savedTip" class="saved-tip">已保存</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { CalcInput, CalcResult } from '@/types'
import { calculate } from '@/utils/calculator'
import { saveRecord, generateId } from '@/utils/storage'
import CalculatorForm, { type FormInput } from '@/components/CalculatorForm.vue'
import ResultCard from '@/components/ResultCard.vue'

const form = reactive<FormInput>({ price: '', distToShop: '', distToCustomer: '' })
const savedTip = ref(false)

function toCalcInput(f: FormInput): CalcInput {
  return {
    price: parseFloat(f.price) || 0,
    distToShop: parseFloat(f.distToShop) || 0,
    distToCustomer: parseFloat(f.distToCustomer) || 0
  }
}

const result = computed<CalcResult | null>(() => {
  const input = toCalcInput(form)
  if (!input.price || !input.distToShop || !input.distToCustomer) return null
  return calculate(input)
})

const showResult = computed(() => result.value !== null)

function onSave() {
  if (!result.value) return
  saveRecord({
    id: generateId(),
    input: toCalcInput(form),
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

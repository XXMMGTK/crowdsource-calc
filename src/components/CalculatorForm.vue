<template>
  <div class="form">
    <div class="input-group">
      <label class="label">订单总价（元）</label>
      <input
        class="input-field"
        type="text"
        inputmode="decimal"
        placeholder="请输入订单总价"
        :value="modelValue.price === 0 ? '' : modelValue.price"
        @input="onPriceInput"
      />
    </div>
    <div class="input-group">
      <label class="label">骑手到商家距离（km）</label>
      <input
        class="input-field"
        type="text"
        inputmode="decimal"
        placeholder="请输入距离"
        :value="modelValue.distToShop === 0 ? '' : modelValue.distToShop"
        @input="onDistShopInput"
      />
    </div>
    <div class="input-group">
      <label class="label">商家到顾客距离（km）</label>
      <input
        class="input-field"
        type="text"
        inputmode="decimal"
        placeholder="请输入距离"
        :value="modelValue.distToCustomer === 0 ? '' : modelValue.distToCustomer"
        @input="onDistCustomerInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalcInput } from '@/types'

const props = defineProps<{
  modelValue: CalcInput
}>()

const emit = defineEmits<{
  'update:modelValue': [value: CalcInput]
}>()

function parseNum(val: string): number {
  const cleaned = val.replace(/[^0-9.]/g, '')
  const parts = cleaned.split('.')
  if (parts.length > 2) return NaN
  const num = Number(cleaned)
  return isNaN(num) ? NaN : num
}

function onPriceInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  const num = parseNum(val)
  emit('update:modelValue', { ...props.modelValue, price: isNaN(num) ? 0 : num })
}

function onDistShopInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  const num = parseNum(val)
  emit('update:modelValue', { ...props.modelValue, distToShop: isNaN(num) ? 0 : num })
}

function onDistCustomerInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  const num = parseNum(val)
  emit('update:modelValue', { ...props.modelValue, distToCustomer: isNaN(num) ? 0 : num })
}
</script>

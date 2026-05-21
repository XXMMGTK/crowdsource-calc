<template>
  <div class="form">
    <div class="input-group">
      <label class="label">订单总价（元）</label>
      <input
        class="input-field"
        type="text"
        inputmode="decimal"
        placeholder="请输入订单总价"
        :value="input.price"
        @input="emit('update:price', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="input-group">
      <label class="label">骑手到商家距离（km）</label>
      <input
        class="input-field"
        type="text"
        inputmode="decimal"
        placeholder="请输入距离"
        :value="input.distToShop"
        @input="emit('update:distToShop', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="input-group">
      <label class="label">商家到顾客距离（km）</label>
      <input
        class="input-field"
        type="text"
        inputmode="decimal"
        placeholder="请输入距离"
        :value="input.distToCustomer"
        @input="emit('update:distToCustomer', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface FormInput {
  price: string
  distToShop: string
  distToCustomer: string
}

defineProps<{
  input: FormInput
}>()

const emit = defineEmits<{
  'update:price': [value: string]
  'update:distToShop': [value: string]
  'update:distToCustomer': [value: string]
}>()
</script>

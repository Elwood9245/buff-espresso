<script setup lang="ts">
import type { CoffeeInfo } from '../types'

const model = defineModel<CoffeeInfo>({ required: true })
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-stone-800">咖啡豆基本信息</h3>

    <div>
      <label class="block text-sm text-stone-500 mb-1">名称</label>
      <input
        v-model="model.name"
        type="text"
        placeholder="例如：埃塞俄比亚 耶加雪菲"
        class="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    <div>
      <label class="block text-sm text-stone-500 mb-1">处理方法</label>
      <input
        v-model="model.process"
        type="text"
        placeholder="例如：水洗 / 日晒 / 蜜处理"
        class="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    <div class="overflow-hidden">
      <label class="block text-sm text-stone-500 mb-1">烘焙日期</label>
      <input
        v-model="model.roastDate"
        type="date"
        class="w-full min-w-0 max-w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    <div class="overflow-hidden">
      <label class="block text-sm text-stone-500 mb-1">开袋日期</label>
      <input
        v-model="model.openDate"
        type="date"
        class="w-full min-w-0 max-w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>

    <div class="overflow-hidden">
      <label class="block text-sm text-stone-500 mb-1">测试日期</label>
      <input
        v-model="model.testDate"
        type="date"
        class="w-full min-w-0 max-w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>
  </div>
</template>

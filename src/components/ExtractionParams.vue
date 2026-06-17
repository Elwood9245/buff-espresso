<script setup lang="ts">
import type { ExtractionParams } from '../types'

const model = defineModel<ExtractionParams>({ required: true })
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-stone-800">萃取参数</h3>

    <div class="grid grid-cols-2 gap-3">
      <div>
        <label class="block text-sm text-stone-500 mb-1">研磨刻度</label>
        <input
          v-model="model.grindSize"
          type="text"
          placeholder="例如：2.5"
          class="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label class="block text-sm text-stone-500 mb-1">粉重 (g)</label>
        <input
          v-model.number="model.dose"
          type="number"
          step="0.1"
          placeholder="18.0"
          class="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label class="block text-sm text-stone-500 mb-1">液重 (g)</label>
        <input
          v-model.number="model.liquidYield"
          type="number"
          step="0.1"
          placeholder="36.0"
          class="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label class="block text-sm text-stone-500 mb-1">萃取时间 (s)</label>
        <input
          v-model.number="model.time"
          type="number"
          step="0.1"
          placeholder="28"
          class="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label class="block text-sm text-stone-500 mb-1">水温 (°C)</label>
        <input
          v-model.number="model.temperature"
          type="number"
          step="0.1"
          placeholder="93"
          class="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label class="block text-sm text-stone-500 mb-1">其他</label>
        <input
          v-model="model.other"
          type="text"
          placeholder="备注"
          class="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
    </div>
  </div>
</template>

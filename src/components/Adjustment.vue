<script setup lang="ts">
import type { AdjustmentData } from '../types'

const model = defineModel<AdjustmentData>({ required: true })
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-stone-800">调整萃取</h3>

    <div>
      <label class="block text-sm text-stone-500 mb-1">调整原因</label>
      <textarea
        v-model="model.reason"
        rows="3"
        placeholder="描述需要调整的原因..."
        class="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
      />
    </div>

    <div>
      <label class="block text-sm text-stone-500 mb-1">如何调整</label>
      <textarea
        v-model="model.howTo"
        rows="3"
        placeholder="描述具体的调整方案..."
        class="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
      />
    </div>
  </div>
</template>

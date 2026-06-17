<script setup lang="ts">
import type { CuppingRecord } from '../types'
import { computeGrade, computeVerdict } from '../types'
import { computed } from 'vue'

const props = defineProps<{
  record: CuppingRecord
}>()

const emit = defineEmits<{
  export: []
}>()

const totalScore = computed(() => {
  return props.record.balance.score + props.record.mouthfeel.score + props.record.flavor.score
})

const verdictRaw = computed(() => computeVerdict(totalScore.value))
const verdictLabel = computed(() => verdictRaw.value === 'pass' ? '✅ 可出品' : '⚠️ 需调整')
const grade = computed(() => computeGrade(totalScore.value))
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-bold text-stone-800">最终评估与出品决策</h3>

    <div class="grid grid-cols-3 gap-3">
      <div class="bg-stone-50 rounded-xl p-4 text-center">
        <p class="text-xs text-stone-500 mb-1">味觉平衡</p>
        <p class="text-2xl font-bold text-amber-600">{{ record.balance.score }}</p>
      </div>
      <div class="bg-stone-50 rounded-xl p-4 text-center">
        <p class="text-xs text-stone-500 mb-1">口腔触感</p>
        <p class="text-2xl font-bold text-amber-600">{{ record.mouthfeel.score }}</p>
      </div>
      <div class="bg-stone-50 rounded-xl p-4 text-center">
        <p class="text-xs text-stone-500 mb-1">风味描述</p>
        <p class="text-2xl font-bold text-amber-600">{{ record.flavor.score }}</p>
      </div>
    </div>

    <div class="bg-stone-50 rounded-xl p-6 text-center space-y-3">
      <p class="text-sm text-stone-500">总分</p>
      <p class="text-5xl font-bold text-stone-800">{{ totalScore }}</p>
      <p
        :class="[
          'text-xl font-bold',
          verdictRaw === 'pass' ? 'text-emerald-600' : 'text-red-500'
        ]"
      >
        {{ verdictLabel }}
      </p>
      <p class="text-sm text-stone-500">{{ grade }}</p>
    </div>

    <button
      @click="emit('export')"
      class="w-full py-4 rounded-xl bg-amber-500 text-white font-bold text-lg shadow-lg hover:bg-amber-600 active:scale-95 transition-all min-h-[56px]"
    >
      📥 导出 Excel
    </button>
  </div>
</template>

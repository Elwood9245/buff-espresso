<script setup lang="ts">
import type { TasteBalance } from '../types'
import { BALANCE_OPTIONS, SCORE_LABELS } from '../types'

const model = defineModel<TasteBalance>({ required: true })

function select(opt: string) {
  model.value.selected = model.value.selected === opt ? '' : opt
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-stone-800">味觉平衡感</h3>

    <div>
      <p class="text-sm text-stone-500 mb-2">选择平衡类型（单选）</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in BALANCE_OPTIONS"
          :key="opt"
          @click="select(opt)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]',
            model.selected === opt
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          ]"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center mb-1">
        <p class="text-sm text-stone-500">品质评分</p>
        <span class="text-2xl font-bold text-amber-600">{{ model.score }}</span>
      </div>
      <p class="text-xs text-amber-600 mb-2">{{ SCORE_LABELS[model.score] ?? model.score }}</p>
      <input
        v-model.number="model.score"
        type="range"
        min="0"
        max="4"
        step="1"
        class="w-full"
      />
      <div class="flex justify-between text-xs text-stone-400 mt-1">
        <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
      </div>
    </div>
  </div>
</template>

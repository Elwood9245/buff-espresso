<script setup lang="ts">
import type { TasteBitter } from '../types'
import { BITTER_NEGATIVE, BITTER_ACCEPTABLE, BITTER_UNACCEPTABLE_KEYS } from '../types'
import { ref, watch } from 'vue'

const model = defineModel<TasteBitter>({ required: true })

const customInput = ref('')

function toggleNegative(opt: string) {
  const idx = model.value.negativeSelected.indexOf(opt)
  if (idx >= 0) model.value.negativeSelected.splice(idx, 1)
  else model.value.negativeSelected.push(opt)
}

function toggleAcceptable(opt: string) {
  const idx = model.value.acceptableSelected.indexOf(opt)
  if (idx >= 0) model.value.acceptableSelected.splice(idx, 1)
  else model.value.acceptableSelected.push(opt)
}

// 选中不可接受项时自动勾选，全部取消时自动取消
watch(
  () => model.value.negativeSelected,
  (selected) => {
    const hasUnacceptable = BITTER_UNACCEPTABLE_KEYS.some(k => selected.includes(k))
    model.value.unacceptable = hasUnacceptable
  },
  { deep: true }
)

// 只能关闭不能接受（同时清除对应标签），不支持手动开启
function clearUnacceptable() {
  if (model.value.unacceptable) {
    model.value.unacceptable = false
    for (const key of BITTER_UNACCEPTABLE_KEYS) {
      const idx = model.value.negativeSelected.indexOf(key)
      if (idx >= 0) model.value.negativeSelected.splice(idx, 1)
    }
  }
}

function addCustom() {
  const word = customInput.value.trim()
  if (word && !model.value.custom.includes(word)) {
    model.value.custom.push(word)
  }
  customInput.value = ''
}

function removeCustom(word: string) {
  const idx = model.value.custom.indexOf(word)
  if (idx >= 0) model.value.custom.splice(idx, 1)
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-stone-800">苦 · 味觉评估</h3>

    <div>
      <p class="text-sm text-stone-500 mb-2">负面感受（可多选）</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in BITTER_NEGATIVE"
          :key="opt"
          @click="toggleNegative(opt)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]',
            model.negativeSelected.includes(opt)
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          ]"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <div>
      <p class="text-sm text-stone-500 mb-2">可接受感受（可多选）</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in BITTER_ACCEPTABLE"
          :key="opt"
          @click="toggleAcceptable(opt)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]',
            model.acceptableSelected.includes(opt)
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          ]"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <div class="flex items-center gap-3 py-2">
      <button
        @click="clearUnacceptable"
        :class="[
          'relative w-12 h-7 rounded-full transition-colors',
          model.unacceptable ? 'bg-red-500' : 'bg-stone-300'
        ]"
      >
        <span
          :class="[
            'absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform',
            model.unacceptable ? 'translate-x-5' : ''
          ]"
        />
      </button>
      <span class="text-sm text-stone-600">
        不能接受 <span class="text-stone-400">（焦味、伴随粗糙刺激、过度主导的苦）</span>
      </span>
    </div>

    <div>
      <p class="text-sm text-stone-500 mb-2">自定义描述词</p>
      <div class="flex flex-wrap gap-2 mb-2">
        <span
          v-for="word in model.custom"
          :key="word"
          class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm"
        >
          {{ word }}
          <button @click="removeCustom(word)" class="text-orange-400 hover:text-orange-600">&times;</button>
        </span>
      </div>
      <div class="flex gap-2">
        <input
          v-model="customInput"
          type="text"
          placeholder="+ 添加自定义词"
          class="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          @keyup.enter="addCustom"
        />
        <button
          @click="addCustom"
          class="px-4 py-2.5 rounded-xl bg-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-300 min-h-[44px]"
        >
          添加
        </button>
      </div>
    </div>

  </div>
</template>

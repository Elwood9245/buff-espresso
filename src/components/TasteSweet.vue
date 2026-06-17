<script setup lang="ts">
import type { TasteItem } from '../types'
import { SWEET_OPTIONS, SWEET_UNACCEPTABLE_KEYS } from '../types'
import { useChipSelect } from '../composables/useChipSelect'
import { computed, toRef, watch } from 'vue'

const model = defineModel<TasteItem>({ required: true })

const { customInput, toggle, isSelected, addCustom, removeCustom } = useChipSelect(
  toRef(model.value, 'selected')
)

// 自定义词：在 selected 中但不在预设选项中的
const customChips = computed(() =>
  model.value.selected.filter(w => !(SWEET_OPTIONS as readonly string[]).includes(w))
)

watch(
  () => model.value.selected,
  (selected) => {
    const hasUnacceptable = SWEET_UNACCEPTABLE_KEYS.some(k => selected.includes(k))
    model.value.unacceptable = hasUnacceptable
  },
  { deep: true }
)

function clearUnacceptable() {
  if (model.value.unacceptable) {
    model.value.unacceptable = false
    for (const key of SWEET_UNACCEPTABLE_KEYS) {
      const idx = model.value.selected.indexOf(key)
      if (idx >= 0) model.value.selected.splice(idx, 1)
    }
  }
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-stone-800">甜 · 味觉评估</h3>

    <div>
      <p class="text-sm text-stone-500 mb-2">选择描述词（可多选）</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in SWEET_OPTIONS"
          :key="opt"
          @click="toggle(opt)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]',
            isSelected(opt)
              ? (SWEET_UNACCEPTABLE_KEYS as readonly string[]).includes(opt)
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-emerald-500 text-white shadow-md'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          ]"
        >
          {{ opt }}
        </button>
        <span
          v-for="opt in customChips"
          :key="opt"
          class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm"
        >
          {{ opt }}
          <button @click="toggle(opt)" class="text-orange-400 hover:text-orange-600">&times;</button>
        </span>
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
        不能接受 <span class="text-stone-400">（无甜味、极微弱）</span>
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

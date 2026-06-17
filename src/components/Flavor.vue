<script setup lang="ts">
import type { FlavorData } from '../types'
import { FLAVOR_STRUCTURE, FLAVOR_CATEGORY_KEYS, SCORE_LABELS } from '../types'
import { ref, computed } from 'vue'

const model = defineModel<FlavorData>({ required: true })

const customInput = ref('')

function toggle(opt: string) {
  const idx = model.value.selected.indexOf(opt)
  if (idx >= 0) model.value.selected.splice(idx, 1)
  else model.value.selected.push(opt)
}

function isSelected(opt: string): boolean {
  return model.value.selected.includes(opt)
}

// 所有预设词（大类 + 分项）
const allPresetOptions = computed(() => [
  ...FLAVOR_CATEGORY_KEYS,
  ...Object.values(FLAVOR_STRUCTURE).flat(),
])

// 自定义词：在 selected 中但不在预设选项中的
const customChips = computed(() =>
  model.value.selected.filter(w => !allPresetOptions.value.includes(w))
)

function addCustom() {
  const word = customInput.value.trim()
  if (word && !model.value.selected.includes(word)) {
    model.value.selected.push(word)
  }
  customInput.value = ''
}
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-bold text-stone-800">风味描述</h3>

    <div>
      <p class="text-sm text-stone-500 mb-2">选择风味（可多选大类或分项）</p>
      <div class="space-y-3">
        <div v-for="(subs, category) in FLAVOR_STRUCTURE" :key="category">
          <div class="flex flex-wrap gap-2 items-center">
            <button
              @click="toggle(category)"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]',
                isSelected(category)
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              ]"
            >
              {{ category }}
            </button>

            <template v-if="subs.length > 0">
              <span class="text-stone-300 text-xs mx-0.5">·</span>
              <button
                v-for="sub in subs"
                :key="sub"
                @click="toggle(sub)"
                :class="[
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all min-h-[36px]',
                  isSelected(sub)
                    ? 'bg-emerald-400 text-white shadow-sm'
                    : 'bg-stone-50 text-stone-500 hover:bg-stone-100 border border-stone-200'
                ]"
              >
                {{ sub }}
              </button>
            </template>
          </div>
        </div>

        <div v-if="customChips.length > 0" class="flex flex-wrap gap-2">
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
    </div>

    <div>
      <p class="text-sm text-stone-500 mb-2">自定义风味词</p>
      <div class="flex gap-2">
        <input
          v-model="customInput"
          type="text"
          placeholder="+ 添加自定义风味"
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

    <div>
      <div class="flex justify-between items-center mb-1">
        <p class="text-sm text-stone-500">风味品质评分</p>
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
